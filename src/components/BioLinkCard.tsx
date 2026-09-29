import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface BioLinkCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'lime' | 'amber' | 'blue';
  highlight?: boolean;
  onClick?: () => void;
  href?: string;
  isExternal?: boolean;
}

export const BioLinkCard: React.FC<BioLinkCardProps> = ({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = 'lime',
  highlight = false,
  onClick,
  href,
  isExternal = false,
}) => {
  const badgeClasses = {
    lime: 'bg-[#a6ff00]/15 text-[#a6ff00] border-[#a6ff00]/30',
    amber: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    blue: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
  };

  const content = (
    <div
      className={`relative w-full p-4 rounded-2xl transition-all duration-200 text-left flex items-center justify-between gap-3.5 group cursor-pointer ${
        highlight
          ? 'bg-gradient-to-r from-[#111925] via-[#101722] to-[#0c121b] border-2 border-[#a6ff00]/60 shadow-[0_0_25px_rgba(166,255,0,0.18)] hover:shadow-[0_0_35px_rgba(166,255,0,0.3)] hover:border-[#a6ff00] active:scale-[0.98]'
          : 'bg-[#0e131d]/90 hover:bg-[#121a28] active:bg-[#152033] border border-white/10 hover:border-white/20 active:scale-[0.99]'
      }`}
    >
      {/* Glow pulse on highlight */}
      {highlight && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a6ff00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a6ff00]"></span>
        </span>
      )}

      {/* Left Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
          highlight
            ? 'bg-[#a6ff00] text-black shadow-[0_0_15px_rgba(166,255,0,0.4)]'
            : 'bg-white/5 text-white border border-white/10 group-hover:text-[#a6ff00] group-hover:border-[#a6ff00]/30'
        }`}
      >
        {icon}
      </div>

      {/* Center Details */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm sm:text-base font-bold tracking-tight truncate ${
              highlight ? 'text-white' : 'text-slate-100 group-hover:text-white'
            }`}
          >
            {title}
          </span>
          {badge && (
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClasses[badgeColor]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Indicator */}
      <div className="shrink-0 flex items-center">
        {isExternal ? (
          <ExternalLink
            size={16}
            className={`transition-colors ${
              highlight ? 'text-[#a6ff00]' : 'text-slate-400 group-hover:text-white'
            }`}
          />
        ) : (
          <ChevronRight
            size={18}
            className={`transition-transform group-hover:translate-x-0.5 ${
              highlight ? 'text-[#a6ff00]' : 'text-slate-500 group-hover:text-white'
            }`}
          />
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a6ff00] rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a6ff00] rounded-2xl text-left"
    >
      {content}
    </button>
  );
};
