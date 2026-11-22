import { resolveContactConfirmation } from '../../../shared/contact-navigation.mjs';
import { navigate } from 'astro:transitions/client';

export function initContactConfirmation(returnTarget: { path: string; back: boolean }, signal?: AbortSignal) {
  const dialog = document.querySelector<HTMLDialogElement>('#contact-confirmation')!;
  const confirm = dialog.querySelector<HTMLButtonElement>('#contact-confirm')!;
  const destination = resolveContactConfirmation(location.href, returnTarget, history.length);
  confirm.addEventListener('click', () => {
    dialog.close();
    if (destination.back) history.back();
    else void navigate(destination.path, { history: 'replace' });
  }, { signal });
  dialog.addEventListener('close', () => document.querySelector<HTMLButtonElement>('#enquiry-form [type="submit"]')?.focus({ preventScroll: true }), { signal });
  signal?.addEventListener('abort', () => { if (dialog.open) dialog.close(); }, { once: true });
  return { show() { if (!signal?.aborted && !dialog.open) dialog.showModal(); } };
}
