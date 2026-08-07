"use client";

import React from "react";

type Props = {
  children?: React.ReactNode;
  gap?: string | number;
  className?: string;
};

export const WindowGrid: React.FC<Props> = ({
  children,
  gap = 20,
  className = "",
}) => {
  const items = React.Children.toArray(children);
  const gapValue = typeof gap === "number" ? `${gap}px` : gap;

  const rows = Array.from(
    { length: Math.ceil(items.length / 2) },
    (_, rowIndex) => {
      const largeItem = items[rowIndex * 2];
      const smallItem = items[rowIndex * 2 + 1];

      const isFlipped = rowIndex % 2 === 1;

      return {
        rowIndex,
        isFlipped,
        items: isFlipped
          ? [smallItem, largeItem] // Row 2, 4, 6: small then large
          : [largeItem, smallItem], // Row 1, 3, 5: large then small
      };
    },
  );

  return (
    <div
      className={className}
      style={{
        display: "grid",
        rowGap: gapValue,
        alignItems: "start",
      }}
    >
      {rows.map(({ rowIndex, isFlipped, items: rowItems }) => (
        <div
          key={rowIndex}
          className={
            isFlipped
              ? "grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.513fr)]"
              : "grid grid-cols-1 sm:grid-cols-[minmax(0,1.513fr)_minmax(0,1fr)]"
          }
          style={{
            columnGap: gapValue,
            rowGap: gapValue,
            alignItems: "start",
          }}
        >
          {rowItems.map(
            (item, itemIndex) =>
              item && <div key={itemIndex}>{item}</div>,
          )}
        </div>
      ))}
    </div>
  );
};

export default WindowGrid;
