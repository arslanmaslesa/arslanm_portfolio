"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useState } from "react";
import {
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import type { WindowData } from "../../lib/desktopTypes";
import { useDesktopContext } from "./WindowManager";
import { windowVariants } from "../../lib/animations";
import { WindowToolbar } from "./WindowToolbar";

type Props = {
  win: WindowData;
  children?: ReactNode;
};

export function Window({ win, children }: Props) {
  const { focusWindow, closeWindow, moveWindow, focusedWindowId, returnToWorkFolder, goForwardToWorkProject } =
    useDesktopContext();

  const { setWindowView } = useDesktopContext();

  const dragControls = useDragControls();
  const reducedMotion = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedWindowId === win.id) {
      // focus the window element but avoid scrolling the viewport
      try {
        (windowRef.current as HTMLElement | null)?.focus({ preventScroll: true } as FocusOptions);
      } catch (e) {
        // fallback for older browsers
        windowRef.current?.focus();
      }
    }
  }, [focusedWindowId, win.id]);

  const setTextSelection = (value: "none" | "") => {
    document.body.style.userSelect = value;
    document.body.style.setProperty("-webkit-user-select", value);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    moveWindow(win.id, {
      x: win.position.x + info.offset.x,
      y: win.position.y + info.offset.y,
    });

    setTextSelection("");
  };

  return (
    <motion.div
      ref={windowRef}
      role="dialog"
      aria-label={win.title}
      tabIndex={-1}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={reducedMotion}
      variants={windowVariants}
      drag
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setTextSelection("none")}
      onDragEnd={handleDragEnd}
      onMouseDown={(event) => {
        event.stopPropagation();
        focusWindow(win.id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") closeWindow(win.id);
      }}
      style={
        {
          x: win.position.x,
          y: win.position.y,
          zIndex: win.zIndex,
          position: "absolute",
        } as any
      }
      className="relative h-[min(92vh,540px)] w-[min(92vw,800px)] overflow-hidden rounded-[28px] bg-white/80 shadow-[0_4px_64px_rgba(0,0,0,0.16)] backdrop-blur-[44px]"
    >
      <main
        data-window-scroll
        className="absolute inset-0 z-0 overflow-y-auto px-3 pb-3 pt-[60px] text-slate-700 scrollbar-thin scrollbar-thumb-slate-200 flex"
      >
        <div className="flex-1 min-h-0">{children}</div>
      </main>



      {/* Softer white-to-transparent fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_10%,rgba(255,255,255,0.9)_40%,rgba(255,255,255,0.7)_60%,rgba(255,255,255,0)_100%)]" />

      <div className="absolute inset-x-3 top-3 z-20">
        <WindowToolbar
          title={win.title}
          onClose={() => closeWindow(win.id)}
          onPointerDown={(event) => dragControls.start(event as any)}
          viewMode={win.viewMode ?? 'grid'}
          onViewChange={(m) => setWindowView(win.id, m)}
          onBack={win.id === 'work' && win.activeProjectId ? returnToWorkFolder : undefined}
          onForward={win.id === 'work' && win.forwardProjectId ? goForwardToWorkProject : undefined}
          showViewOptions={!win.activeProjectId}
        />
      </div>
    </motion.div>
  );
}

export default Window;
