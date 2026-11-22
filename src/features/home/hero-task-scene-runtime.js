(() => {
  const timeline = window.__timelines?.['task-session'];
  if (!timeline) return;

  const loopDuration = 18;
  let time = 0;
  let previousTimestamp = null;
  let frame = 0;
  let running = false;
  let ready = false;

  const draw = () => timeline.pause().seek(Math.min(time, timeline.duration()), false);
  const pause = () => {
    running = false;
    previousTimestamp = null;
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const tick = timestamp => {
    if (!running) return;
    if (previousTimestamp !== null) {
      time = (time + (timestamp - previousTimestamp) / 1000) % loopDuration;
      draw();
    }
    previousTimestamp = timestamp;
    frame = requestAnimationFrame(tick);
  };

  window.TegoTaskScene = {
    ready: () => ready,
    play: () => {
      if (!ready || running) return;
      running = true;
      previousTimestamp = null;
      frame = requestAnimationFrame(tick);
    },
    pause,
    showResult: () => {
      pause();
      time = 15;
      draw();
    },
    getTime: () => time,
  };

  draw();
  document.fonts.ready.then(() => {
    draw();
    ready = true;
    window.parent.postMessage({ type: 'tego-task-scene-ready' }, window.parent.location.origin);
  });
  window.addEventListener('pagehide', pause);
  window.addEventListener('beforeunload', pause);
})();
