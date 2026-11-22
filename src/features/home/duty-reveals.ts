import { dutyRevealProgress, type DutyFrame } from './duty-playback.ts';

export function createDutyRevealRenderer(panels: HTMLElement[]) {
  const reveals = panels.map(panel => [...panel.querySelectorAll<HTMLElement>('[data-duty-reveal]')].map(element => {
    const [start, end] = element.dataset.dutyReveal!.split(':').map(Number);
    return { element, start, end, progress: -1 };
  }));

  return (frame: DutyFrame) => {
    reveals[frame.scene].forEach(content => {
      const progress = dutyRevealProgress(frame.progress, content.start, content.end);
      if (progress === content.progress) return;
      content.progress = progress;
      content.element.style.setProperty('--duty-reveal-progress', String(progress));
      content.element.dataset.dutyVisible = String(progress > 0);
    });
  };
}
