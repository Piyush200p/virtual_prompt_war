import React from 'react';

const WIDTH = 60;
const HEIGHT = 18;
const PADDING = 2;
const USABLE_WIDTH = WIDTH - PADDING * 2;
const USABLE_HEIGHT = HEIGHT - PADDING * 2;

/**
 * Small inline trend line used in the dispatcher panel.
 * Renders nothing for empty data, and draws a flat line (rather than
 * producing NaN coordinates) when there's only one point or every value
 * is identical.
 */
export const renderDispatcherSparkline = (data, color) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; // avoid divide-by-zero when every value is equal
  const lastIndex = data.length - 1;

  const coords = data.map((val, idx) => ({
    x: lastIndex === 0 ? PADDING : PADDING + (idx / lastIndex) * USABLE_WIDTH,
    y: HEIGHT - PADDING - ((val - min) / range) * USABLE_HEIGHT,
  }));

  const points = coords.map(({ x, y }) => `${x},${y}`).join(' ');
  const { x: lastX, y: lastY } = coords[lastIndex];

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ overflow: 'visible', filter: `drop-shadow(0 0 3px ${color}80)` }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle cx={lastX} cy={lastY} r="2" fill={color} />
    </svg>
  );
};
