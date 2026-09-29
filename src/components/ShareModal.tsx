import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://instagram.com/leadspay';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `Conheça a @leadspay e resgate seu presente de lançamento no link da bio: ${currentUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-[#0d121c] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Share2 size={18} className="text-[#a6ff00]" />
            <span>Compartilhar Bio LeadsPay</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Envie o link para amigos, parceiros ou criadores para que também possam reivindicar o presente de lançamento!
        </p>

        {/* Copy Box */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-black/50 border border-white/10">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none px-2 font-mono truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#a6ff00] hover:bg-[#b8ff24] text-black text-xs font-bold shrink-0 flex items-center gap-1 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleWhatsApp}
          className="w-full h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <MessageCircle size={17} className="text-[#25D366]" />
          <span>Enviar pelo WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
