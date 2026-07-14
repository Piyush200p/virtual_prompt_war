import React from 'react';

// Venue-specific overlay art layered on top of the shared oval rim + pitch.
// To add a new stadium's signature landmark, add an entry here instead of
// duplicating the whole layout — see WEMBLEY_LAYOUT for an example.
const renderWembleyArch = () => (
  <>
    {/* Iconic Wembley Arch: sweeping neon-blue glow curve across the top */}
    <path
      d="M40 150 A 175 140 0 0 1 360 150"
      fill="none"
      stroke="rgba(59, 130, 246, 0.15)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M40 150 A 175 140 0 0 1 360 150"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="3 4"
    >
      <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
    </path>
  </>
);

const STADIUM_LAYOUTS = {
  wembley: { id: 'wembley-stadium-layout', renderOverlay: renderWembleyArch },
};

// Same fallback used by the original switch's `default` branch, for
// 'metlife' and any unrecognized stadiumId alike.
const DEFAULT_LAYOUT = { id: 'metlife-stadium-layout', renderOverlay: null };

// Dynamic Stadium Outline and Playing Field visual elements based on sport & venue
export const renderStadiumMapElements = (stadiumId, isFanView = false) => {
  const pitchColor = isFanView ? 'rgba(10, 61, 46, 0.85)' : 'rgba(4, 120, 87, 0.85)';
  const strokeColor = isFanView ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)';
  const strokeWidth = isFanView ? 1.5 : 2;
  const rimFill = isFanView ? 'rgba(11, 15, 25, 0.75)' : 'rgba(22, 29, 48, 0.55)';
  const rimStroke = isFanView ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)';

  const layout = STADIUM_LAYOUTS[stadiumId] || DEFAULT_LAYOUT;

  return (
    <g id={layout.id}>
      {/* Outer Stadium Rim: Oval (shared across all venues) */}
      <path
        d="M200 15 C320 15, 385 65, 385 150 C385 235, 320 285, 200 285 C80 285, 15 235, 15 150 C15 65, 80 15, 200 15 Z"
        fill={rimFill}
        stroke={rimStroke}
        strokeWidth="4"
      />

      {/* Soccer Pitch (shared across all venues) */}
      <rect x="140" y="110" width="120" height="80" rx="4" fill={pitchColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <line x1="200" y1="110" x2="200" y2="190" stroke={strokeColor} strokeWidth={strokeWidth} />
      <circle cx="200" cy="150" r="20" stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />

      {layout.renderOverlay && layout.renderOverlay()}
    </g>
  );
};
