"use client";

import React from 'react';
import { WindowManagerProvider, useDesktopContext } from './WindowManager';
import DesktopIcon from './DesktopIcon';
import Window from './Window';

const DesktopInner: React.FC = () => {
  const { icons, windows, selectIcon } = useDesktopContext();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f7] text-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-[66.666%] -translate-x-1/2 w-[328px] text-slate-900">
          <div className="text-[1.25rem] font-medium tracking-[-0.01em] text-slate-950">Hi I’m Arslan.</div>
          <p className="mt-16 text-base leading-[1.6] text-slate-600">I’m a Product Designer based in Sarajevo. I’ve been obsessed with pixel perfection for the past 4 years.</p>
          <p className="mt-7 text-base leading-[1.6] text-slate-600">
            You can keep up with me on <span className="font-medium text-slate-950">Instagram</span> or <span className="font-medium text-slate-950">LinkedIn</span>. Get in touch with me by <span className="font-medium text-slate-950">Email</span>.
          </p>

          <div className="mt-16 text-slate-500">
            <div className="text-[0.75rem] font-normal uppercase tracking-[0.08em] text-slate-500">Experience</div>
            <div className="mt-7 grid gap-y-7 text-slate-950">
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Well BP</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">UX UI Designer Intern</div>
                  <div className="text-[0.75rem] font-normal text-slate-600">2025 - 2026</div>
                </div>
              </div>
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Appo</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">CDO &amp; Co Founder</div>
                  <div className="text-[0.75rem] font-normal text-slate-600">2023 - Present</div>
                </div>
              </div>
              <div className="flex w-full items-start justify-between gap-x-8">
                <span className="min-w-0 text-base font-medium">Freelance</span>
                <div className="space-y-1 w-[168px]">
                  <div className="text-base font-normal text-slate-600">Product Designer</div>
                  <div className="text-[0.75rem] font-normal text-slate-600">2023 - Present</div>
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
          <DesktopIcon key={icon.id} data={icon} />
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
