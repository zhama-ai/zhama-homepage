export const IMMEDIATE_REPLY_TIME = '即时（越快越好）';
export const DEFAULT_REPLY_TIME = '越快越好';

export function isContactEmail(value) {
  return value.length <= 254 && /^[^\s@<>(),;:"\\]+@[a-z\d](?:[a-z\d.-]*[a-z\d])?\.[a-z]{2,}$/i.test(value);
}

export function leadContact(lead) {
  return lead.contact || [lead.email, lead.phone].filter(Boolean).join(' / ');
}
