"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from 'framer-motion';
import WindowGrid from "./WindowGrid";
import Folder from "./Folder";
import WORK_ITEMS from "../../content/work";
import { useDesktopContext } from './WindowManager';
import type { GridItem } from '../../lib/gridItemTypes';

type TileProps = {
  thumbnail: string;
  title?: string;
};

type GridItemState = GridItem['interaction'];

const getGridThumbnail = (item: GridItem) => item.gridThumbnail;
const getIconThumbnail = (item: GridItem) => item.iconThumbnail;

function LockIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 11V8.5C8 6.01472 10.0147 4 12.5 4C14.9853 4 17 6.01472 17 8.5V11M6.5 11H18.5C19.3284 11 20 11.6716 20 12.5V19.5C20 20.3284 19.3284 21 18.5 21H6.5C5.67157 21 5 20.3284 5 19.5V12.5C5 11.6716 5.67157 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const isVideo = (source: string) => /\.(mp4|webm|ogg)(?:$|\?)/i.test(source);

const Tile: React.FC<TileProps> = ({ thumbnail, title }) => {
  const video = isVideo(thumbnail);
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!video || !mediaRef.current) return;

    const media = mediaRef.current;
    const scrollRoot = media.closest<HTMLElement>("[data-window-scroll]");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;

        if (isVisible) {
          setShouldLoadVideo(true);
          setIsVisible(true);
        } else {
          setIsVisible(false);
          media.pause();
        }
      },
      { root: scrollRoot, threshold: [0, 0.25] },
    );

    observer.observe(media);
    return () => {
      observer.disconnect();
      media.pause();
    };
  }, [video]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!video || !media || !isVisible || !shouldLoadVideo) return;

    void media.play().catch(() => {
      // Some browsers can reject play until the source has buffered.
    });
  }, [isVisible, shouldLoadVideo, video]);

  return (
    <div
      className="relative aspect-square h-auto w-full overflow-hidden rounded-2xl bg-slate-100 sm:aspect-auto sm:h-80"
      aria-label={title ?? "work thumbnail"}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f1f5f9_8%,#e2e8f0_18%,#f1f5f9_33%)] bg-[length:200%_100%]"
          aria-hidden="true"
        />
      )}

      {video ? (
        <video
          ref={mediaRef}
          className="h-full w-full object-cover"
          src={shouldLoadVideo ? thumbnail : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={(event) => {
            if (isVisible) void event.currentTarget.play().catch(() => {});
          }}
          aria-label={title ?? "work video"}
        />
      ) : (
        <Image
          src={thumbnail}
          alt={title ?? "work thumbnail"}
          fill
          sizes="(max-width: 800px) 60vw, 460px"
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          draggable={false}
        />
      )}
    </div>
  );
};

const GridItemLabel: React.FC<{ title?: string; interaction?: GridItemState }> = ({ title, interaction }) => {
  if (!title) return null;
  const isLocked = interaction === 'locked';

  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-[8px] bg-white px-3 py-2 font-normal tracking-[-0.01em] text-black opacity-0 translate-y-1 shadow-[0_8px_20px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-y-0">
      {isLocked && <LockIcon />}
      {title}
    </div>
  );
};

const WindowContentGrid: React.FC<{ mode?: 'grid' | 'icons'; items?: GridItem[]; source?: 'work' | 'about' | 'playground' }> = ({ mode = 'grid', items, source = 'work' }) => {
  const { openWindowItem, openWorkProject } = useDesktopContext();
  const list = items ?? WORK_ITEMS;
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef(false);

  if (mode === 'icons') {
    return (
      <div ref={containerRef} className="grid h-full w-full grid-cols-3 content-start items-start gap-x-2 gap-y-5 sm:flex sm:flex-wrap sm:gap-6">
        {list.map((item) => {
          const interaction: GridItemState = item.interaction ?? 'clickable';
          const isClickable = interaction === 'clickable';

          return (
            <motion.div
              key={item.id}
              className="w-full cursor-grab select-none text-center sm:w-28"
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              onDragStart={() => {
                draggingRef.current = true;
                try {
                  document.body.style.userSelect = 'none';
                  (document.body as any).style.webkitUserSelect = 'none';
                } catch (e) {
                  /* ignore */
                }
              }}
              onDragEnd={() => {
                try {
                  document.body.style.userSelect = '';
                  (document.body as any).style.webkitUserSelect = '';
                } catch (e) {
                  /* ignore */
                }
                window.setTimeout(() => {
                  draggingRef.current = false;
                }, 50);
              }}
              whileTap={{ scale: isClickable && !reduced ? 0.98 : 1 }}
              onClick={(e) => {
                e.stopPropagation();
                if (draggingRef.current || !isClickable) return;
                if (source === 'work') {
                  openWorkProject(item.id, item.title ?? item.id);
                  return;
                }
                openWindowItem(source, item.id, item.title ?? item.id);
              }}
            >
              <div className="mx-auto h-16 w-16">
                {getIconThumbnail(item) ? (
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-100 ring-1 ring-black/5">
                    {isVideo(getIconThumbnail(item) as string) ? (
                      <video
                        className="h-full w-full object-cover"
                        src={getIconThumbnail(item)}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image
                        src={getIconThumbnail(item) as string}
                        alt={item.title ?? item.id}
                        fill
                        sizes="64px"
                        className="object-cover"
                        draggable={false}
                      />
                    )}
                  </div>
                ) : (
                  <Folder className="w-full h-full" color="blue" />
                )}
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 text-sm text-slate-700">
                {interaction === 'locked' && <LockIcon />}
                <span>{item.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  const renderGridItem = (item: GridItem) => {
    const interaction: GridItemState = item.interaction ?? 'clickable';
    const isClickable = interaction === 'clickable';
    const itemClassName = `group relative block w-full rounded-2xl text-left focus-visible:outline-none ${isClickable ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500/70' : 'cursor-default'}`;

    const content = (
      <>
        <GridItemLabel title={item.title} interaction={interaction} />
        <Tile thumbnail={getGridThumbnail(item)} title={item.title} />
      </>
    );

    if (isClickable) {
      return (
        <motion.button
          key={item.id}
          className={itemClassName}
          type="button"
          aria-label={`Open ${item.title ?? item.id}`}
          data-item-state={interaction}
          whileHover={{ scale: reduced ? 1 : 0.985 }}
          whileTap={{ scale: reduced ? 1 : 0.98 }}
          transition={reduced ? { duration: 0 } : { type: 'tween', duration: 0.16, ease: 'easeOut' }}
          onClick={() => {
            if (source === 'work') {
              openWorkProject(item.id, item.title ?? item.id);
              return;
            }
            openWindowItem(source, item.id, item.title ?? item.id);
          }}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <div
        key={item.id}
        className={itemClassName}
        aria-label={item.title ?? item.id}
        aria-disabled="true"
        data-item-state={interaction}
      >
        {content}
      </div>
    );
  };

  return (
    <div className="w-full pb-3">
      <WindowGrid gap={12} className="w-full">
        {list.map((item) => renderGridItem(item))}
      </WindowGrid>
    </div>
  );
};

export default WindowContentGrid;
