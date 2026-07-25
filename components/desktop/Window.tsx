"use client";

import { useEffect, useRef, type ReactNode } from "react";
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
  const { focusWindow, closeWindow, moveWindow, focusedWindowId } =
    useDesktopContext();

  const dragControls = useDragControls();
  const reducedMotion = useReducedMotion();
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedWindowId === win.id) {
      windowRef.current?.focus();
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
      className="group w-[min(92vw,800px)] h-[520px] flex flex-col overflow-hidden rounded-[28px] bg-white/80 p-3 shadow-[0_4px_64px_rgba(0,0,0,0.16)] backdrop-blur-[44px]"
    >
      <WindowToolbar
        title={win.title}
        onClose={() => closeWindow(win.id)}
        onPointerDown={(event) => dragControls.start(event as any)}
      />

      <main className="mt-3 flex-1 overflow-hidden group-hover:overflow-auto text-slate-700 scrollbar-thin scrollbar-thumb-slate-200">
        {children}
      </main>
    </motion.div>
  );
}

export default Window;