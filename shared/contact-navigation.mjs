export const CONTACT_RETURN_KEY = 'tego-contact-return';

const isContact = pathname => /^\/(?:zh|en|zh-Hant)\/contact(?:\/|$)/.test(pathname);
const homePath = url => `/${['zh', 'en', 'zh-Hant'].includes(url.pathname.split('/')[1]) ? url.pathname.split('/')[1] : 'zh'}/`;

function safeReturnPath(value, current) {
  try {
    const target = new URL(value, current.origin);
    if (typeof value === 'string' && target.origin === current.origin && !isContact(target.pathname)) return target.pathname + target.search + target.hash;
  } catch { /* An unavailable source falls back to the current language's home page. */ }
  return homePath(current);
}

export function resolveContactReturn(currentUrl, referrer, historyLength, previous = null) {
  const current = new URL(currentUrl);
  try {
    const source = new URL(referrer);
    if (!['http:', 'https:'].includes(source.protocol)) return { path: homePath(current), back: false };
    if (source.origin === current.origin && isContact(source.pathname)) {
      return { path: safeReturnPath(previous?.path, current), back: false };
    }
    return { path: safeReturnPath(source.href, current), back: historyLength > 1 };
  } catch {
    return { path: homePath(current), back: false };
  }
}

export function resolveContactConfirmation(currentUrl, returnTarget, historyLength) {
  const current = new URL(currentUrl);
  return {
    path: safeReturnPath(returnTarget?.path, current),
    back: Boolean(returnTarget?.back === true && historyLength > 1),
  };
}
