"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from 'framer-motion';
import WindowGrid from "./WindowGrid";
import Folder from "./Folder";
import WORK_ITEMS, { WorkItem } from "../../content/work";
import { useDesktopContext } from './WindowManager';

type TileProps = {
  thumbnail: string;
  title?: string;
};

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
      className="relative h-80 w-full overflow-hidden rounded-2xl bg-slate-100"
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

const WindowContentGrid: React.FC<{ mode?: 'grid' | 'icons'; items?: WorkItem[]; source?: 'work' | 'about' | 'playground' }> = ({ mode = 'grid', items, source = 'work' }) => {
  const { openWindow, openWorkProject } = useDesktopContext();
  const list = items ?? WORK_ITEMS;
  // Hooks must be called unconditionally to satisfy Rules of Hooks
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef(false);

  if (mode === 'icons') {
    return (
      <div ref={containerRef} className="w-full flex flex-wrap gap-6 h-full items-start content-start">
        {list.map((item) => (
          <motion.div
            key={item.id}
            className="w-28 text-center cursor-grab select-none"
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
            whileTap={{ scale: reduced ? 1 : 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              if (draggingRef.current) return;
              if (source === 'work') {
                openWorkProject(item.id, item.title ?? item.id);
                return;
              }
              openWindow(item.id, item.title ?? item.id, source);
            }}
          >
            <div className="mx-auto h-16 w-16">
              <Folder className="w-full h-full" color="blue" />
            </div>
            <div className="mt-2 text-sm text-slate-700">{item.title}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full pb-3">
      <WindowGrid gap={12} className="w-full">
        {list.map((item) => (
          <button
            key={item.id}
            type="button"
            className="block w-full cursor-pointer rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
            aria-label={`Open ${item.title ?? item.id}`}
            onClick={() => {
              if (source === 'work') {
                openWorkProject(item.id, item.title ?? item.id);
                return;
              }
              openWindow(item.id, item.title ?? item.id, source);
            }}
          >
            <Tile thumbnail={item.thumbnail} title={item.title} />
          </button>
        ))}
      </WindowGrid>
    </div>
  );
};
export default WindowContentGrid;
