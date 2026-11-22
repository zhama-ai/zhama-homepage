import { contactContent } from './content';

const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const fromKey = (value: string) => { const [year, month, day] = value.split('-').map(Number); return new Date(year, month - 1, day); };
const shiftMonth = (date: Date, offset: number) => {
  const first = new Date(date.getFullYear(), date.getMonth() + offset, 1);
  return new Date(first.getFullYear(), first.getMonth(), Math.min(date.getDate(), new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()));
};

export function initReplyPicker(form: HTMLFormElement, locale: 'zh' | 'en', onChange: () => void, signal?: AbortSignal) {
  const copy = contactContent[locale].form.expectedReplyTime;
  const input = form.elements.namedItem('expectedReplyTime') as HTMLInputElement;
  const trigger = form.querySelector<HTMLButtonElement>('#enquiry-reply-trigger')!;
  const value = form.querySelector<HTMLElement>('.reply-time-value')!;
  const clear = form.querySelector<HTMLButtonElement>('.reply-time-clear')!;
  const calendar = form.querySelector<HTMLElement>('#enquiry-calendar')!;
  const month = calendar.querySelector<HTMLElement>('#enquiry-calendar-month')!;
  const days = calendar.querySelector<HTMLTableSectionElement>('.reply-days')!;
  const morning = calendar.querySelector<HTMLInputElement>('[value="morning"]')!;
  const afternoon = calendar.querySelector<HTMLInputElement>('[value="afternoon"]')!;
  const language = document.documentElement.lang || locale;
  const monthFormat = new Intl.DateTimeFormat(language, { year: 'numeric', month: 'long' });
  const dayFormat = new Intl.DateTimeFormat(language, { dateStyle: 'full' });
  const weekdayFormat = new Intl.DateTimeFormat(language, { weekday: 'short' });
  const weekdays = calendar.querySelector('.reply-weekdays')!;
  weekdays.replaceChildren();
  for (let index = 0; index < 7; index++) {
    const heading = document.createElement('th');
    heading.scope = 'col'; heading.textContent = weekdayFormat.format(new Date(2026, 10, 1 + index));
    weekdays.append(heading);
  }
  let selected = '';
  let focused = new Date();
  let open = false;
  const position = () => {
    if (!open) return;
    const rect = trigger.getBoundingClientRect();
    const width = calendar.offsetWidth, height = calendar.offsetHeight;
    const below = innerHeight - rect.bottom - 8;
    calendar.style.left = `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`;
    const top = below >= height || below >= rect.top - 8 ? rect.bottom + 8 : rect.top - height - 8;
    calendar.style.top = `${Math.max(12, Math.min(top, innerHeight - height - 12))}px`;
  };
  const close = (returnFocus = false) => {
    if (typeof calendar.hidePopover === 'function' && calendar.matches(':popover-open')) calendar.hidePopover();
    calendar.hidden = true; open = false; trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger.focus({ preventScroll: true });
  };
  const commit = () => {
    input.value = selected ? `${selected} ${afternoon.checked ? '下午' : '上午'}` : '';
    value.textContent = selected ? `${selected.replaceAll('-', '/')} ${afternoon.checked ? copy.afternoon : copy.morning}` : copy.defaultValue;
    clear.hidden = !selected;
    onChange();
  };
  const render = (focus = false) => {
    month.textContent = monthFormat.format(focused);
    const start = new Date(focused.getFullYear(), focused.getMonth(), 1);
    start.setDate(start.getDate() - start.getDay());
    days.replaceChildren();
    for (let week = 0; week < 6; week++) {
      const row = document.createElement('tr');
      for (let day = 0; day < 7; day++) {
        const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + week * 7 + day);
        const key = dateKey(date), cell = document.createElement('td'), button = document.createElement('button');
        cell.setAttribute('aria-selected', String(key === selected));
        button.type = 'button'; button.className = `reply-day${key === selected ? ' is-selected' : ''}`;
        button.dataset.date = key; button.textContent = String(date.getDate());
        button.setAttribute('aria-label', dayFormat.format(date));
        button.tabIndex = key === dateKey(focused) ? 0 : -1;
        if (date.getMonth() !== focused.getMonth()) button.dataset.outside = '';
        if (key === dateKey(new Date())) button.setAttribute('aria-current', 'date');
        cell.append(button); row.append(cell);
      }
      days.append(row);
    }
    if (focus) days.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus({ preventScroll: true });
    position();
  };
  trigger.addEventListener('click', () => {
    if (open) { close(); return; }
    focused = selected ? fromKey(selected) : new Date();
    calendar.hidden = false; open = true; render();
    if (typeof calendar.showPopover === 'function') calendar.showPopover();
    trigger.setAttribute('aria-expanded', 'true'); position();
    days.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus({ preventScroll: true });
  }, { signal });
  calendar.addEventListener('toggle', event => {
    if ((event as ToggleEvent).newState === 'closed') { open = false; calendar.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
  }, { signal });
  days.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-date]');
    if (!button) return;
    selected = button.dataset.date!; focused = fromKey(selected); commit(); render(true);
  }, { signal });
  days.addEventListener('keydown', event => {
    const button = (event.target as Element).closest<HTMLButtonElement>('[data-date]');
    if (!button) return;
    focused = fromKey(button.dataset.date!);
    const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -focused.getDay(), End: 6 - focused.getDay() };
    if (Object.hasOwn(offsets, event.key)) focused.setDate(focused.getDate() + offsets[event.key]);
    else if (event.key === 'PageUp' || event.key === 'PageDown') focused = shiftMonth(focused, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
    else return;
    event.preventDefault(); render(true);
  }, { signal });
  for (const [selector, offset] of [['.reply-month-previous', -1], ['.reply-month-next', 1]] as const) {
    calendar.querySelector(selector)!.addEventListener('click', () => { focused = shiftMonth(focused, offset); render(); }, { signal });
  }
  calendar.addEventListener('change', commit, { signal });
  const reset = () => { selected = ''; morning.checked = true; commit(); close(); };
  clear.addEventListener('click', () => { reset(); trigger.focus(); }, { signal });
  calendar.querySelector('.reply-calendar-reset')!.addEventListener('click', () => { reset(); trigger.focus(); }, { signal });
  calendar.querySelector('.reply-calendar-done')!.addEventListener('click', () => close(true), { signal });
  document.addEventListener('pointerdown', event => {
    if (open && !calendar.contains(event.target as Node) && !trigger.contains(event.target as Node)) close();
  }, { signal });
  document.addEventListener('keydown', event => { if (open && event.key === 'Escape') { event.preventDefault(); close(true); } }, { signal });
  document.addEventListener('focusin', event => { if (open && !calendar.contains(event.target as Node) && event.target !== trigger) close(); }, { signal });
  window.addEventListener('resize', position, { signal });
  window.addEventListener('scroll', position, { capture: true, signal });
  signal?.addEventListener('abort', () => close(), { once: true });
  return { reset };
}
