import { contactContent } from './content';
import { DEFAULT_REPLY_TIME } from '../../../shared/contact-fields.mjs';
import { initReplyPicker } from './reply-picker';
import { CONTACT_RETURN_KEY, resolveContactReturn } from '../../../shared/contact-navigation.mjs';
import { initContactConfirmation } from './confirmation';
import { getContactAttribution } from '../attribution/tracker';

type ContactStatus = 'validation_error' | 'submit' | 'success' | 'error';
type ContactReason = 'required' | 'too_long' | 'timeout' | 'network' | 'http' | 'invalid_response';

export function initContactForm(signal?: AbortSignal) {
  if (signal?.aborted) return;
  const form = document.querySelector<HTMLFormElement>('#enquiry-form');
  const status = document.querySelector<HTMLElement>('#enquiry-status');
  if (!form || !status) return;
  const notify = (status: ContactStatus, reason?: ContactReason) => {
    try {
      form.dispatchEvent(new CustomEvent('tego:contact-status', { bubbles: true, detail: reason ? { status, reason } : { status } }));
    } catch { /* Optional event delivery must not interrupt the enquiry. */ return; }
  };
  const locale = form.dataset.locale === 'en' ? 'en' : 'zh';
  const copy = contactContent[locale];
  const attribution = getContactAttribution();
  let previous;
  try { previous = JSON.parse(sessionStorage.getItem(CONTACT_RETURN_KEY) || 'null'); }
  catch { /* The browser's referrer remains available when storage is restricted. */ }
  const returnTarget = history.state?.contactReturn || resolveContactReturn(location.href, attribution.referrer || document.referrer, history.length, previous);
  try {
    history.replaceState({ ...history.state, contactReturn: returnTarget }, '');
    sessionStorage.setItem(CONTACT_RETURN_KEY, JSON.stringify(returnTarget));
  } catch { /* Submission remains available without persistent navigation state. */ }
  const confirmation = initContactConfirmation(returnTarget, signal);
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const title = form.elements.namedItem('title') as HTMLInputElement;
  const content = form.elements.namedItem('content') as HTMLTextAreaElement;
  const contact = form.elements.namedItem('contact') as HTMLInputElement;
  const nickname = form.elements.namedItem('nickname') as HTMLInputElement;
  const replyTime = form.elements.namedItem('expectedReplyTime') as HTMLInputElement;
  const fields = [title, content, contact, nickname];
  const setFieldError = (field: HTMLInputElement | HTMLTextAreaElement, message = '') => {
    const error = form.querySelector<HTMLElement>(`#${field.id}-error`)!;
    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  };
  form.noValidate = true;
  const replyPicker = initReplyPicker(form, locale, () => { status.hidden = true; }, signal);
  const selectedPlan = new URLSearchParams(location.search).get('plan') || '';
  const plan = Object.hasOwn(copy.plans, selectedPlan) ? selectedPlan as keyof typeof copy.plans : '';
  if (plan && !title.value) title.value = copy.plans[plan];
  let requestId: string | undefined;
  let lastPayload = '';
  let submitting = false;
  form.addEventListener('input', event => {
    const field = fields.find(field => field === event.target);
    if (field) setFieldError(field);
    status.hidden = true;
  }, { signal });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || signal?.aborted) return;
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | undefined;
    let validationReason: 'required' | 'too_long' | undefined;
    for (const field of fields) {
      const missing = !field.disabled && field.required && !field.value.trim();
      const tooLong = !field.disabled && field.maxLength >= 0 && field.value.length > field.maxLength;
      const message = missing ? copy.validation[field.name as keyof typeof copy.validation] : tooLong ? copy.validation.tooLong : '';
      setFieldError(field, message);
      if (message && !firstInvalid) { firstInvalid = field; validationReason = missing ? 'required' : 'too_long'; }
    }
    if (firstInvalid) { notify('validation_error', validationReason); status.hidden = true; firstInvalid.focus(); return; }
    const data = new FormData(form);
    const payload = JSON.stringify({
      title: String(data.get('title') || '').trim(), contact: String(data.get('contact') || '').trim(),
      content: String(data.get('content') || '').trim(),
      nickname: String(data.get('nickname') || '').trim(),
      expectedReplyTime: replyTime.value || DEFAULT_REPLY_TIME,
      website: data.get('website') || '', plan: plan || '', ...attribution,
    });
    if (!requestId || payload !== lastPayload) requestId = crypto.randomUUID();
    lastPayload = payload;
    submitting = true; submit.disabled = true; form.setAttribute('aria-busy', 'true');
    submit.textContent = copy.form.submitting; status.hidden = true; delete status.dataset.state;
    let failureReason: ContactReason = 'network';
    notify('submit');
    try {
      const response = await fetch(form.dataset.contactApi || '/api/contact/', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept-Language': document.documentElement.lang || locale, 'Idempotency-Key': requestId },
        body: payload, signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(20000)]) : AbortSignal.timeout(20000),
      });
      failureReason = response.ok ? 'invalid_response' : 'http';
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error(copy.failure);
      const result = await response.json();
      if (signal?.aborted) return;
      if (!response.ok || result.success !== true) throw new Error(typeof result.message === 'string' ? result.message : copy.failure);
      form.reset(); replyPicker.reset(); fields.forEach(field => setFieldError(field)); requestId = undefined; lastPayload = '';
      confirmation.show();
      notify('success');
    } catch (error) {
      if (signal?.aborted) return;
      const timedOut = error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name);
      notify('error', timedOut ? 'timeout' : failureReason);
      status.textContent = timedOut ? copy.timeout : error instanceof TypeError ? copy.failure : error instanceof Error ? error.message : copy.failure;
      status.dataset.state = 'error';
    } finally {
      submitting = false; submit.disabled = false; form.removeAttribute('aria-busy');
      submit.textContent = copy.form.submit;
      if (!signal?.aborted && status.dataset.state === 'error') { status.hidden = false; status.focus({ preventScroll: true }); }
    }
  }, { signal });
}
