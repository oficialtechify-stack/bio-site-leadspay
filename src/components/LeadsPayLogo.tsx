import React from 'react';

interface LeadsPayLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export const LeadsPayIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="leadspay-lime-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccff00" />
          <stop offset="60%" stopColor="#9ef01a" />
          <stop offset="100%" stopColor="#70e000" />
        </linearGradient>
        <filter id="lime-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Top-left dot */}
      <circle cx="36" cy="40" r="11" fill="url(#leadspay-lime-grad)" />

      {/* Upper curved arm / slash (smooth swoosh) */}
      <path
        d="M 33 66 C 38 66, 68 62, 78 28 C 81 22, 88 23, 87 31 C 82 56, 58 84, 40 85 C 33 85, 30 78, 33 66 Z"
        fill="url(#leadspay-lime-grad)"
      />

      {/* Lower curved arm / slash (interlocking mirror swoosh) */}
      <path
        d="M 87 54 C 82 54, 52 58, 42 92 C 39 98, 32 97, 33 89 C 38 64, 62 36, 80 35 C 87 35, 90 42, 87 54 Z"
        fill="url(#leadspay-lime-grad)"
      />

      {/* Bottom-right dot */}
      <circle cx="84" cy="80" r="11" fill="url(#leadspay-lime-grad)" />
    </svg>
  );
};

export const LeadsPayLogo: React.FC<LeadsPayLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  withGlow = false,
}) => {
  const iconSizes = {
    sm: 26,
    md: 36,
    lg: 48,
    xl: 60,
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <div className={`relative flex items-center justify-center shrink-0 ${withGlow ? 'drop-shadow-[0_0_12px_rgba(158,240,26,0.65)]' : ''}`}>
        <LeadsPayIcon size={iconSizes[size]} />
      </div>

      {!iconOnly && (
        <div className="flex items-baseline">
          <span className={`${textSizes[size]} text-white font-extrabold tracking-tight`}>
            Leads
          </span>
          <span className={`${textSizes[size]} text-[#a6ff00] font-black tracking-tight drop-shadow-[0_0_8px_rgba(166,255,0,0.4)]`}>
            Pay
          </span>
        </div>
      )}
    </div>
  );
};
