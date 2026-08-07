"use client";

import React from 'react';
import Image from 'next/image';
import { WindowManagerProvider, useDesktopContext } from './WindowManager';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import WindowContentGrid from './WindowContentGrid';
import ABOUT_ITEMS, { ABOUT_TOOLS_ITEMS } from '../../content/about';
import PLAYGROUND_ITEMS from '../../content/playground';
import WORK_ITEMS from '../../content/work';
import { CaseStudyView } from './CaseStudy';

const isVideo = (source: string) => /\.(mp4|webm|ogg)(?:$|\?)/i.test(source);
const getGridThumbnail = (item: { gridThumbnail: string }) => item.gridThumbnail;

const FolderItemView: React.FC<{ title: string; thumbnail: string }> = ({ title, thumbnail }) => {
  const video = isVideo(thumbnail);

  return (
    <div className="mx-auto flex min-h-[calc(100%-24px)] w-full max-w-4xl flex-col justify-center px-2 py-6">
      <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-black/5">
        <div className="relative aspect-[16/10] w-full bg-slate-100">
          {video ? (
            <video className="h-full w-full object-cover" src={thumbnail} autoPlay muted loop playsInline />
          ) : (
            <Image src={thumbnail} alt={title} fill className="object-cover" sizes="(max-width: 768px) 92vw, 720px" />
          )}
        </div>
      </div>
      <div className="mt-5 text-lg font-medium tracking-[-0.02em] text-slate-950">{title}</div>
    </div>
  );
};

const WorkCaseStudy: React.FC<{ projectId: string }> = ({ projectId }) => {
  const project = WORK_ITEMS.find((item) => item.id === projectId);

  if (!project?.caseStudy) {
    return <p className="m-auto text-sm text-slate-500">This case study is coming soon.</p>;
  }

  return <CaseStudyView caseStudy={project.caseStudy} />;
};

const DesktopInner: React.FC = () => {
  const { icons, windows, selectIcon } = useDesktopContext();
  // static layout — no dynamic z-index switching

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f7f7f7] text-slate-950 max-md:pt-6">
        <div className="pointer-events-none absolute inset-0 z-10 max-md:relative max-md:inset-auto max-md:px-6">
          <div className="pointer-events-auto absolute top-20 left-[66.666%] z-30 w-[328px] -translate-x-1/2 text-slate-900 max-md:static max-md:w-full max-md:translate-x-0 max-md:pt-8">
          <div className="text-[1.25rem] font-medium tracking-[-0.01em] text-slate-950">Hi I’m Arslan.</div>
          <p className="mt-16 text-base leading-[1.6] text-slate-600 max-md:mt-6">I’m a Product Designer based in Sarajevo. I’ve been obsessed with pixel perfection for the past 4 years.</p>
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

          <div className="mt-16 text-slate-500 max-md:mt-10">
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
        className="relative h-screen max-md:mx-6 max-md:mt-12 max-md:h-28"
        onClick={() => selectIcon(null)}
        role="application"
        aria-label="Desktop"
      >
        {icons.map((icon) => (
          <DesktopIcon key={icon.id} data={icon} zIndex={40} />
        ))}

        {windows.map((w) => (
          <Window key={w.id} win={w}>
            {w.id === 'work' && w.activeProjectId ? (
              <WorkCaseStudy projectId={w.activeProjectId} />
            ) : w.id === 'about' && w.activeProjectId === 'about-4' ? (
              <WindowContentGrid
                mode={w.viewMode ?? 'grid'}
                items={ABOUT_TOOLS_ITEMS}
                source="about"
              />
            ) : w.id === 'about' && w.activeProjectId ? (
              (() => {
                const item = ABOUT_ITEMS.find((entry) => entry.id === w.activeProjectId);
                return item ? <FolderItemView title={item.title ?? item.id} thumbnail={getGridThumbnail(item)} /> : <p className="m-auto text-sm text-slate-500">This item is coming soon.</p>;
              })()
            ) : w.id === 'playground' && w.activeProjectId ? (
              (() => {
                const item = PLAYGROUND_ITEMS.find((entry) => entry.id === w.activeProjectId);
                return item ? <FolderItemView title={item.title ?? item.id} thumbnail={getGridThumbnail(item)} /> : <p className="m-auto text-sm text-slate-500">This item is coming soon.</p>;
              })()
            ) : w.id === 'work' || w.id === 'about' || w.id === 'playground' ? (
              <WindowContentGrid
                mode={w.viewMode ?? 'grid'}
                items={w.id === 'work' ? undefined : w.id === 'about' ? ABOUT_ITEMS : PLAYGROUND_ITEMS}
                source={w.id === 'work' ? 'work' : w.id === 'about' ? 'about' : 'playground'}
              />
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-600">Placeholder content for {w.contentType}.</p>
              </div>
            )}
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
