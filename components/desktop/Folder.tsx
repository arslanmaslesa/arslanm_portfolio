"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type FolderComponentProps = React.ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
  openOnClick?: boolean;
  color?: 'blue' | 'red' | 'black' | string;
};

const Folder: React.FC<FolderComponentProps> = ({
  className = "",
  interactive = true,
  openOnClick = false,
  color = 'blue',
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isRaised = interactive && (isHovered || isOpen);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (openOnClick) setIsOpen((open) => !open);
    onClick?.(event);
  }

  const colorKey = color || 'blue';
  const backSrc = `/folders/folder-back-${colorKey}.png`;
  const frontSrc = `/folders/folder-front-${colorKey}.png`;

  return (
    <div
      data-slot="folder"
      className={`relative aspect-[940/790] w-full ${className}`}
      {...props}
    >
      <div
        className="relative h-full w-full"
        style={{
          perspective: 240,
          perspectiveOrigin: "center bottom",
        }}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
        onFocus={() => interactive && setIsHovered(true)}
        onBlur={() => interactive && setIsHovered(false)}
        onClick={handleClick}
        role={openOnClick ? "button" : undefined}
        tabIndex={openOnClick ? 0 : undefined}
        onKeyDown={(event) => {
          if (
            openOnClick &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            setIsOpen((open) => !open);
          }
        }}
      >
        {/* Back of the folder */}
        <img
          src={backSrc}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
        />

        {/* Front of the folder — hinges from its bottom edge */}
        <motion.img
          src={frontSrc}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          style={{
            transformOrigin: "50% 90%",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          animate={{
            rotateX: isRaised ? -48 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 20,
            mass: 0.8,
          }}
        />
      </div>
    </div>
  );
};

export default Folder;
export { Folder };
export type { FolderComponentProps };