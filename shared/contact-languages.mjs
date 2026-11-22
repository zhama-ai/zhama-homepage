export function contactLanguageFor(acceptLanguage = '') {
  const candidates = String(acceptLanguage).split(',').map((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(';');
    const preference = parameters.find(value => value.trim().startsWith('q='));
    const quality = preference === undefined ? 1 : Number(preference.trim().slice(2));
    return { tag, index, quality: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0 };
  }).filter(candidate => candidate.quality > 0).sort((left, right) => right.quality - left.quality || left.index - right.index);
  for (const { tag } of candidates) {
    if (/^en(?:-|$)/.test(tag)) return 'en';
    if (/^zh-hans(?:-|$)/.test(tag)) return 'zh';
    if (/^zh-hant(?:-|$)/.test(tag) || /^zh-(?:tw|hk|mo)(?:-|$)/.test(tag)) return 'zh-Hant';
    if (/^zh(?:-|$)/.test(tag)) return 'zh';
  }
  return 'zh';
}
