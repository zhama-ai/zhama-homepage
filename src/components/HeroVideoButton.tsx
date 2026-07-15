'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';

interface HeroVideoButtonProps {
  label: string;
  ariaLabel: string;
  title: string;
  src?: string;
  poster?: string;
}

export default function HeroVideoButton({
  label,
  ariaLabel,
  title,
  src = '/video/demo.mp4',
  poster = '/video/demo-poster.jpg',
}: HeroVideoButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel}
        className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-base font-semibold text-zinc-700 transition-colors duration-300 hover:text-primary-700 active:scale-95 dark:text-zinc-200 dark:hover:text-primary-200"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-primary-700 shadow-sm transition-all duration-300 group-hover:border-primary-400 group-hover:bg-primary-50 dark:border-zinc-600 dark:bg-white/10 dark:text-primary-200 dark:group-hover:border-primary-300 dark:group-hover:bg-white/20">
          <Play className="h-4 w-4 translate-x-[1px] fill-current" />
        </span>
        {label}
      </button>

      {mounted && open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            >
              <div
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-fade-in"
                onClick={close}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-4xl animate-scale-in">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 className="text-sm font-semibold text-white sm:text-base">{title}</h2>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label={ariaLabel}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-white/10 bg-black shadow-2xl shadow-zinc-950/40">
                  <video
                    ref={videoRef}
                    className="aspect-video h-auto w-full bg-black"
                    src={src}
                    poster={poster}
                    controls
                    autoPlay
                    playsInline
                    preload="none"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
