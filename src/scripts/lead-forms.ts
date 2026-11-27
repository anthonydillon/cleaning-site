// Progressive enhancement for lead forms. Without JS, forms POST directly to Web3Forms,
// which redirects to /thank-you/. With JS, we submit via fetch and show inline errors.

const ENDPOINT = 'https://api.web3forms.com/submit';

export function initLeadForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector<HTMLElement>('[data-form-status]');
      const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = Object.fromEntries(
        Array.from(new FormData(form).entries()).reduce((map, [k, v]) => {
          // join multi-value fields like extras[]
          const prev = map.get(k);
          map.set(k, prev ? `${prev}, ${v}` : String(v));
          return map;
        }, new Map<string, string>()),
      );

      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent ?? ''; btn.textContent = 'Sending…'; }
      if (status) { status.hidden = true; status.textContent = ''; }

      try {
        if (import.meta.env.PUBLIC_DEMO === '1') {
          // Prototype build: nothing is sent, just show the thank-you page
          await new Promise((r) => setTimeout(r, 400));
        } else {
          const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
          });
          const json = await res.json().catch(() => ({}));
          if (!res.ok || json.success === false) throw new Error(json.message || 'Submission failed');
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'generate_lead', form_type: form.dataset.leadForm });
        try { sessionStorage.setItem('leadType', form.dataset.leadForm ?? 'enquiry'); } catch {}
        window.location.href = form.dataset.thanks ?? '/thank-you/';
      } catch {
        if (status) {
          status.hidden = false;
          status.textContent = 'Sorry, something went wrong sending your request. Please try again, or call or WhatsApp us using the buttons on this page.';
        }
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label ?? 'Send'; }
      }
    });
  });
}
