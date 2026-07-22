"use client";

import React from 'react';
import { WindowManagerProvider, useDesktopContext } from './WindowManager';
import DesktopIcon from './DesktopIcon';
import Window from './Window';

const DesktopInner: React.FC = () => {
  const { icons, windows, selectIcon } = useDesktopContext();
  // static layout — no dynamic z-index switching

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f7] text-slate-950">
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-16 left-[66.666%] -translate-x-1/2 w-[328px] text-slate-900 pointer-events-auto z-30">
          <div className="text-[1.25rem] font-medium tracking-[-0.01em] text-slate-950">Hi I’m Arslan.</div>
          <p className="mt-16 text-base leading-[1.6] text-slate-600">I’m a Product Designer based in Sarajevo. I’ve been obsessed with pixel perfection for the past 4 years.</p>
          <p className="mt-7 text-base leading-[1.6] text-slate-600">
            You can keep up with me on{' '}
            <a
              href="https://www.instagram.com/arslanm.design/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (opens in new tab)"
              className="font-medium text-slate-950 group"
            >
              <span className="relative inline-block">
                Instagram
                   <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-slate-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>{' '}
            or{' '}
            <a
              href="https://www.linkedin.com/in/arslanmaslesa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="font-medium text-slate-950 group"
            >
              <span className="relative inline-block">
                LinkedIn
                   <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-slate-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>. Get in touch with me by{' '}
            <a
              href="mailto:arslanm.design@gmail.com"
              aria-label="Send email to Arslan"
              className="font-medium text-slate-950 group"
            >
              <span className="relative inline-block">
                Email
                   <span className="absolute left-0 bottom-0 h-[1.5px] w-0 bg-slate-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>.
          </p>

          <div className="mt-16 text-slate-500">
            <div className="text-[0.75rem] font-normal uppercase tracking-[0.08em] text-slate-400">Experience</div>
            <div className="mt-7 grid gap-y-7 text-slate-950">
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Well BP</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">UX UI Designer Intern</div>
                  <div className="text-[0.75rem] font-normal text-slate-400">2025 - 2026</div>
                </div>
              </div>
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Appo</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">CDO &amp; Co Founder</div>
                  <div className="text-[0.75rem] font-normal text-slate-400">2023 - Present</div>
                </div>
              </div>
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Freelance</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">Product Designer</div>
                  <div className="text-[0.75rem] font-normal text-slate-400">2023 - Present</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative h-screen"
        onClick={() => selectIcon(null)}
        role="application"
        aria-label="Desktop"
      >
        {icons.map((icon) => (
          <DesktopIcon key={icon.id} data={icon} zIndex={40} />
        ))}

        {windows.map((w) => (
          <Window key={w.id} win={w}>
            <div>
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-slate-600">Placeholder content for {w.contentType}.</p>
            </div>
          </Window>
        ))}
      </div>
    </div>
  );
};

export const Desktop: React.FC = () => (
  <WindowManagerProvider>
    <DesktopInner />
  </WindowManagerProvider>
);

export default Desktop;
