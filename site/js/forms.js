/* Pip Floral Studio — enquiry forms
   Progressive enhancement over plain HTML forms that post to Formspree.
   Without this script every form still works: all sections are visible, the
   browser's own validation runs, and Formspree shows its own confirmation.

   With it:
   - sections are revealed progressively and previous sections stay editable
   - conditional required fields follow the approved copy
   - validation messages sit beside each field and are announced
   - focus moves to the first error
   - submission happens in-page (fetch); success and error states are shown
   - answers are kept in sessionStorage ONLY after a failed submission, and
     cleared on success
   - duplicate submission is prevented while a request is in flight

   Endpoints live in each <form action="…">. Replace the FORMSPREE_*_ID
   placeholders — see docs/FORMS.md. */
(function () {
  'use strict';

  var MSG = {
    required: 'Please complete this field.',
    email: 'Please enter a valid email address.',
    unavailable: 'The form is temporarily unavailable. Your answers have been kept so you can try again.'
  };
  var TYPE_LABEL = {
    'private-party': 'Private party',
    'corporate': 'Corporate event',
    'workshop': 'Workshop',
    'funeral': 'Funeral flowers',
    'something-else': 'Something else'
  };

  /* ---- helpers ---------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function byId(id) { return document.getElementById(id); }
  function isVisible(el) { return !!(el && el.offsetParent !== null) || (el && el.getClientRects().length > 0); }
  function fieldWrap(ctrl) { return ctrl.closest('.field'); }
  function errorEl(ctrl) {
    var wrap = fieldWrap(ctrl);
    return wrap ? wrap.querySelector('.error') : null;
  }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function setError(ctrl, msg) {
    var err = errorEl(ctrl);
    if (err) err.textContent = msg;
    var wrap = fieldWrap(ctrl);
    if (ctrl.tagName === 'FIELDSET') { ctrl.setAttribute('aria-invalid', 'true'); }
    else { ctrl.setAttribute('aria-invalid', 'true'); }
    if (wrap) wrap.setAttribute('aria-invalid', 'true');
  }
  function clearError(ctrl) {
    var err = errorEl(ctrl);
    if (err) err.textContent = '';
    ctrl.removeAttribute('aria-invalid');
    var wrap = fieldWrap(ctrl);
    if (wrap) wrap.removeAttribute('aria-invalid');
  }

  /* Is this control currently required, taking conditions into account? */
  function isRequired(ctrl) {
    if (!isVisible(ctrl)) return false;
    var unlessChecked = ctrl.getAttribute('data-required-unless-checked');
    if (unlessChecked && byId(unlessChecked) && byId(unlessChecked).checked) return false;
    var whenChecked = ctrl.getAttribute('data-required-when-checked');
    if (whenChecked) return !!(byId(whenChecked) && byId(whenChecked).checked);
    var unless = ctrl.getAttribute('data-required-unless');
    if (unless) {
      var other = byId(unless);
      if (other && isVisible(other) && other.value.trim() !== '') return false;
      return true;
    }
    return ctrl.required;
  }

  /* Radio group: fieldset with radios inside */
  function groupChecked(fs) { return !!fs.querySelector('input[type="radio"]:checked'); }
  function groupRequired(fs) {
    if (!isVisible(fs)) return false;
    if (fs.getAttribute('data-required') === 'true') return true;
    return !!fs.querySelector('input[type="radio"][required]');
  }

  /* Validate a single control; returns true when valid. quiet = don't show. */
  function validateControl(ctrl, quiet) {
    if (ctrl.tagName === 'FIELDSET') {
      if (groupRequired(ctrl) && !groupChecked(ctrl)) { if (!quiet) setError(ctrl, MSG.required); return false; }
      clearError(ctrl); return true;
    }
    var v = ctrl.value.trim();
    if (isRequired(ctrl) && v === '') { if (!quiet) setError(ctrl, MSG.required); return false; }
    if (ctrl.type === 'email' && v !== '' && !emailOk(v)) { if (!quiet) setError(ctrl, MSG.email); return false; }
    clearError(ctrl); return true;
  }

  function controlsIn(root) {
    // Text-like controls plus radio fieldsets. Checkboxes are never required here.
    var list = $$('input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]), textarea, select', root)
      .filter(function (c) { return c.name !== '_gotcha'; });
    $$('fieldset.field', root).forEach(function (fs) { if (fs.querySelector('input[type="radio"]')) list.push(fs); });
    return list;
  }

  function stepComplete(step) {
    return controlsIn(step).every(function (c) { return validateControl(c, true); });
  }

  /* ---- toggles / reveals ------------------------------------------------- */
  function bindToggles(form) {
    $$('[data-toggles]', form).forEach(function (box) {
      var target = byId(box.getAttribute('data-toggles'));
      if (!target) return;
      var sync = function () {
        target.hidden = !box.checked;
        // Re-check the paired field's required state and clear stale errors
        var paired = box.closest('.field') && box.closest('.field').querySelector('.control');
        if (paired) validateControl(paired, true);
      };
      box.addEventListener('change', sync);
      sync();
    });
    $$('[data-show-when]', form).forEach(function (el) {
      var radio = byId(el.getAttribute('data-show-when'));
      if (!radio) return;
      var group = $$('input[name="' + radio.name + '"]', form);
      var sync = function () { el.hidden = !radio.checked; };
      group.forEach(function (r) { r.addEventListener('change', sync); });
      sync();
    });
  }

  /* Progressive steps: a step with data-reveal-after is hidden until the
     named step is complete. Once shown it stays shown. */
  function setupSteps(form) {
    var steps = $$('.step[data-reveal-after]', form);
    steps.forEach(function (s) { s.hidden = true; });
    function cascade() {
      steps.forEach(function (s) {
        if (s.getAttribute('data-skip') === 'true') { s.hidden = true; return; }
        if (s.hidden) {
          var prev = byId(s.getAttribute('data-reveal-after'));
          if (prev && !prev.hidden && stepComplete(prev)) {
            s.hidden = false;
            s.classList.add('reveal');
          }
        }
      });
      updateProgress(form);
    }
    form.addEventListener('input', cascade);
    form.addEventListener('change', cascade);
    cascade();
    return cascade;
  }

  function updateProgress(form) {
    var prog = $('[data-progress]', form);
    if (!prog) return;
    var activeSet = false;
    $$('li', prog).forEach(function (li) {
      var step = byId(li.getAttribute('data-for'));
      var status = li.querySelector('[data-status]');
      if (!step) return;
      var done = !step.hidden && stepComplete(step) && controlsIn(step).some(function (c) { return c.tagName === 'FIELDSET' ? groupChecked(c) : c.value.trim() !== ''; }) ;
      // Inspiration (all optional) counts as done once it is visible.
      if (!step.hidden && controlsIn(step).every(function (c) { return c.tagName !== 'FIELDSET' && !isRequired(c); })) done = true;
      li.setAttribute('data-done', done ? 'true' : 'false');
      if (status) status.textContent = done ? ' (completed)' : (step.hidden ? ' (not yet available)' : '');
      li.removeAttribute('aria-current');
      if (!activeSet && !step.hidden && !done) { li.setAttribute('aria-current', 'step'); activeSet = true; }
    });
    if (!activeSet) {
      var lis = $$('li', prog);
      var lastVisible = lis.filter(function (li) { var s = byId(li.getAttribute('data-for')); return s && !s.hidden; }).pop();
      if (lastVisible) lastVisible.setAttribute('aria-current', 'step');
    }
  }

  /* ---- Other enquiry: type-driven fields ------------------------------- */
  function setupOtherForm(form) {
    var type = byId('o-type');
    var general = byId('o-general');
    var funeral = byId('o-funeral');
    var contact = byId('o-funeral-contact');
    var more = byId('o-step-more');
    var email = byId('o-email');
    var emailHint = null;
    var plansHint = byId('o-plans-hint');
    var dateReq = byId('o-date-req');
    var contactGroup = byId('o-contact');

    function apply() {
      var v = type.value;
      var isFuneral = v === 'funeral';
      var chosen = v !== '';

      general.hidden = !chosen || isFuneral;
      funeral.hidden = !isFuneral;
      contact.hidden = !isFuneral;
      if (more) { more.setAttribute('data-skip', isFuneral ? 'true' : 'false'); if (isFuneral) more.hidden = true; }

      // Email: required, unless funeral and a telephone number is supplied
      if (isFuneral) {
        email.setAttribute('data-required-unless', 'o-phone');
        if (!emailHint) {
          emailHint = document.createElement('p');
          emailHint.className = 'hint'; emailHint.id = 'o-email-hint';
          emailHint.textContent = email.getAttribute('data-funeral-hint') || '';
          email.parentNode.insertBefore(emailHint, email);
          email.setAttribute('aria-describedby', 'o-email-hint o-email-error');
        }
        emailHint.hidden = false;
        contactGroup.setAttribute('data-required', 'true');
      } else {
        email.removeAttribute('data-required-unless');
        if (emailHint) emailHint.hidden = true;
        email.setAttribute('aria-describedby', 'o-email-error');
        contactGroup.removeAttribute('data-required');
      }

      // General fields
      var where = byId('o-where'), plans = byId('o-plans'), date = byId('o-date');
      var generalOn = chosen && !isFuneral;
      where.required = generalOn; plans.required = generalOn;
      var dateRequired = (v === 'private-party' || v === 'corporate');
      date.required = dateRequired;
      if (dateReq) dateReq.hidden = !dateRequired;
      if (plansHint) plansHint.textContent = chosen && !isFuneral ? (plansHint.getAttribute('data-hint-' + v) || '') : '';

      // Funeral fields
      byId('o-f-venue').required = isFuneral;
      byId('o-f-help').required = isFuneral;

      // Clear errors on anything that just became hidden/optional
      controlsIn(form).forEach(function (c) { if (!isVisible(c)) clearError(c); });
    }
    type.addEventListener('change', apply);
    apply();
    return apply;
  }

  /* ---- Enquire page route toggle ---------------------------------------- */
  function setupRoutes() {
    var radios = $$('input[name="enquiry_route"]');
    if (!radios.length) return;
    var wedding = byId('route-wedding'), other = byId('route-other');
    var asideW = byId('aside-wedding'), asideO = byId('aside-other');
    function apply() {
      var isOther = byId('type-other').checked;
      wedding.hidden = isOther; other.hidden = !isOther;
      if (asideW) asideW.hidden = isOther;
      if (asideO) asideO.hidden = !isOther;
      document.title = (isOther ? 'What are you planning? | Enquire' : 'Enquire') + ' | Pip Floral Studio';
    }
    radios.forEach(function (r) { r.addEventListener('change', apply); });

    // Preselect from ?type= (approved values only)
    var params = new URLSearchParams(location.search);
    var t = params.get('type');
    var map = { 'private-party': 'private-party', 'corporate': 'corporate', 'workshop': 'workshop', 'other': '' };
    if (t !== null && Object.prototype.hasOwnProperty.call(map, t)) {
      byId('type-other').checked = true;
      var sel = byId('o-type');
      if (sel && map[t]) { sel.value = map[t]; sel.dispatchEvent(new Event('change', { bubbles: true })); }
    }
    apply();
  }

  /* ---- Session storage (recovery after a failed submission only) ------- */
  function storageKey(form) { return 'pip-form-' + form.getAttribute('data-form'); }
  function saveAnswers(form) {
    try {
      var data = {};
      $$('input, textarea, select', form).forEach(function (c) {
        if (!c.name || c.name === '_gotcha' || c.type === 'hidden' || c.type === 'submit') return;
        if (c.type === 'checkbox' || c.type === 'radio') { if (c.checked) data[c.id] = true; }
        else if (c.value !== '') data[c.id] = c.value;
      });
      sessionStorage.setItem(storageKey(form), JSON.stringify(data));
    } catch (e) { /* storage unavailable: nothing to do */ }
  }
  function restoreAnswers(form) {
    try {
      var raw = sessionStorage.getItem(storageKey(form));
      if (!raw) return false;
      var data = JSON.parse(raw);
      Object.keys(data).forEach(function (id) {
        var c = byId(id);
        if (!c) return;
        if (c.type === 'checkbox' || c.type === 'radio') { c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); }
        else { c.value = data[id]; c.dispatchEvent(new Event('input', { bubbles: true })); if (c.tagName === 'SELECT') c.dispatchEvent(new Event('change', { bubbles: true })); }
      });
      return true;
    } catch (e) { return false; }
  }
  function clearAnswers(form) { try { sessionStorage.removeItem(storageKey(form)); } catch (e) { /* ignore */ } }

  /* ---- Subject lines ---------------------------------------------------- */
  function val(id) { var c = byId(id); return c && isVisible(c) ? c.value.trim() : ''; }
  function niceDate(iso) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function buildSubject(form) {
    var kind = form.getAttribute('data-form');
    if (kind === 'wedding') {
      var names = [val('w-name'), val('w-partner')].filter(Boolean).join(' & ');
      var when = byId('w-date-tbc').checked ? val('w-date-alt') : niceDate(val('w-date'));
      return 'Wedding enquiry: ' + [names, when].filter(Boolean).join(', ');
    }
    if (kind === 'other') {
      var t = byId('o-type').value;
      if (t === 'funeral') {
        return 'Funeral flowers enquiry: ' + [val('o-name'), niceDate(val('o-f-date'))].filter(Boolean).join(', ');
      }
      var date = byId('o-date-tbc').checked ? '' : niceDate(val('o-date'));
      return 'Other enquiry: ' + [TYPE_LABEL[t] || '', val('o-name'), date].filter(Boolean).join(', ');
    }
    if (kind === 'funeral') {
      return 'Funeral flowers enquiry: ' + [val('f-name'), niceDate(val('f-date'))].filter(Boolean).join(', ');
    }
    return 'Website enquiry';
  }

  /* ---- Submission ------------------------------------------------------- */
  function validateForm(form) {
    var first = null;
    controlsIn(form).forEach(function (c) {
      if (!isVisible(c)) return;
      if (!validateControl(c, false) && !first) first = c;
    });
    if (first) {
      var target = first.tagName === 'FIELDSET' ? (first.querySelector('input') || first) : first;
      target.focus({ preventScroll: false });
      if (target.scrollIntoView) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    return !first;
  }

  function showPanel(panel) { panel.hidden = false; panel.focus(); panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }

  function setupSubmit(form, cascade) {
    var kind = form.getAttribute('data-form');
    var submitBtn = $('button[type="submit"]', form);
    var errorPanel = byId(kind + '-error-panel');
    var busy = false;

    // Live region for the "unavailable" message
    var live = document.createElement('p');
    live.className = 'error'; live.setAttribute('role', 'status');
    submitBtn.parentNode.insertBefore(live, submitBtn.nextSibling);

    if (errorPanel) {
      var retry = $('[data-retry]', errorPanel);
      if (retry) retry.addEventListener('click', function () { errorPanel.hidden = true; submitBtn.focus(); });
    }

    // Clear a field's error as soon as it becomes valid
    form.addEventListener('input', function (e) {
      var c = e.target;
      if (c.matches && c.matches('.control') && c.getAttribute('aria-invalid') === 'true') validateControl(c, false);
    });
    form.addEventListener('change', function (e) {
      var c = e.target;
      if (c.type === 'radio') { var fs = c.closest('fieldset.field'); if (fs) validateControl(fs, false); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      if (cascade) cascade();
      live.textContent = '';
      if (errorPanel) errorPanel.hidden = true;
      if (!validateForm(form)) return;

      var action = form.getAttribute('action') || '';
      if (/FORMSPREE_[A-Z]+_ID/.test(action)) {
        // Endpoint not configured yet
        saveAnswers(form);
        live.textContent = MSG.unavailable;
        return;
      }

      // Populate metadata
      var subj = $('input[name="_subject"]', form); if (subj) subj.value = buildSubject(form);
      var ts = $('input[name="submitted_at"]', form); if (ts) ts.value = new Date().toISOString();
      var src = $('input[name="source_page"]', form); if (src) src.value = location.pathname;

      var fd = new FormData(form);
      // Drop values from hidden (not applicable) controls so Anna only receives what was asked
      $$('input, textarea, select', form).forEach(function (c) {
        if (c.type === 'hidden' || c.name === '_gotcha') return;
        if (!isVisible(c)) fd.delete(c.name);
      });
      // Human-readable label for the enquiry type
      if (kind === 'other') fd.set('enquiry_type', TYPE_LABEL[byId('o-type').value] || byId('o-type').value);

      busy = true;
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.setAttribute('aria-busy', 'true');
      var label = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';

      fetch(action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          clearAnswers(form);
          var successId = kind + '-form-success';
          if (kind === 'other' && byId('o-type').value === 'funeral') successId += '-funeral';
          var success = byId(successId);
          form.hidden = true;
          if (success) showPanel(success);
        })
        .catch(function () {
          saveAnswers(form);
          if (errorPanel) showPanel(errorPanel); else live.textContent = MSG.unavailable;
        })
        .then(function () {
          busy = false;
          submitBtn.removeAttribute('aria-disabled');
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = label;
        });
    });
  }

  /* ---- init ------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    setupRoutes();
    $$('form[data-form]').forEach(function (form) {
      form.noValidate = true;
      var otherApply = form.getAttribute('data-form') === 'other' ? setupOtherForm(form) : null;
      bindToggles(form);
      var cascade = setupSteps(form);
      if (restoreAnswers(form)) { if (otherApply) otherApply(); cascade(); }
      setupSubmit(form, cascade);
    });
  });
})();
