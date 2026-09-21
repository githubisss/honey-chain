import React from 'react';

interface CuteBeeProps {
  size?: number;
  isFlying?: boolean;
  hasHoneyBucket?: boolean;
  className?: string;
  facing?: 'left' | 'right';
}

export const CuteBee: React.FC<CuteBeeProps> = ({
  size = 64,
  isFlying = true,
  hasHoneyBucket = false,
  className = '',
  facing = 'right'
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className} ${isFlying ? 'animate-float' : ''}`}
      style={{
        width: size,
        height: size,
        transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
    >
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Antennas */}
        <path
          d="M 68 28 C 72 16 80 14 84 18"
          stroke="#451a03"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="85" cy="18" r="4.5" fill="#f59e0b" stroke="#451a03" strokeWidth="2.5" />

        <path
          d="M 60 26 C 60 12 66 10 70 12"
          stroke="#451a03"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="71" cy="12" r="4.5" fill="#f59e0b" stroke="#451a03" strokeWidth="2.5" />

        {/* Back Wing */}
        <g className="animate-wing-l">
          <ellipse
            cx="48"
            cy="26"
            rx="18"
            ry="26"
            transform="rotate(-20 48 26)"
            fill="#e0f2fe"
            fillOpacity="0.85"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />
          <path
            d="M 44 20 C 48 24 52 30 50 36"
            stroke="#bae6fd"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* Stinger */}
        <path
          d="M 12 55 L 2 52 L 12 49 Z"
          fill="#451a03"
          stroke="#291002"
          strokeWidth="1.5"
        />

        {/* Bee Body Base */}
        <ellipse
          cx="48"
          cy="56"
          rx="36"
          ry="28"
          fill="#facc15"
          stroke="#78350f"
          strokeWidth="4"
        />

        {/* Stripes */}
        <path
          d="M 32 32 C 34 46 34 66 32 80"
          stroke="#451a03"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 46 29 C 48 46 48 66 46 83"
          stroke="#451a03"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Bee Head */}
        <circle
          cx="78"
          cy="52"
          r="24"
          fill="#fde047"
          stroke="#78350f"
          strokeWidth="4"
        />

        {/* Big Cartoon Eye */}
        <ellipse cx="85" cy="46" rx="9" ry="11" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
        <ellipse cx="87" cy="46" rx="5.5" ry="7" fill="#1e1b4b" />
        <circle cx="89" cy="43" r="2.8" fill="#ffffff" />
        <circle cx="85" cy="49" r="1.4" fill="#ffffff" />

        {/* Cute Blushing Cheek */}
        <ellipse cx="76" cy="61" rx="6" ry="3.5" fill="#f472b6" fillOpacity="0.75" />

        {/* Cheerful Smile */}
        <path
          d="M 83 58 Q 88 66 95 60"
          stroke="#78350f"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Front Wing */}
        <g className="animate-wing-r">
          <ellipse
            cx="58"
            cy="24"
            rx="16"
            ry="24"
            transform="rotate(15 58 24)"
            fill="#f0f9ff"
            fillOpacity="0.9"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          <path
            d="M 56 18 C 60 22 62 28 60 32"
            stroke="#bae6fd"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Honey Pot Bucket (Optional) */}
        {hasHoneyBucket && (
          <g transform="translate(42, 66)">
            <path
              d="M 6 0 L 2 16 C 2 22 18 22 18 16 L 14 0"
              fill="#9a3412"
              stroke="#431407"
              strokeWidth="2"
            />
            {/* Overflowing Golden Honey */}
            <path
              d="M 1 4 Q 10 12 19 4"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="2"
            />
            {/* Rope handle */}
            <path
              d="M 4 2 C 4 -6 16 -6 16 2"
              fill="none"
              stroke="#78350f"
              strokeWidth="2"
              strokeDasharray="2 1"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
