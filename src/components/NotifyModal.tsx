import React, { useState } from 'react';
import { X, Bell, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { LeadsPayIcon } from './LeadsPayLogo';

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFunnel: () => void;
}

export const NotifyModal: React.FC<NotifyModalProps> = ({
  isOpen,
  onClose,
  onOpenFunnel,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const existing = JSON.parse(localStorage.getItem('leadspay_waitlist') || '[]');
    existing.push({ name, emailOrPhone, date: new Date().toISOString() });
    localStorage.setItem('leadspay_waitlist', JSON.stringify(existing));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#0c1017] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <LeadsPayIcon size={22} />
            <span className="text-sm font-bold text-white">Lista de Espera VIP</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#a6ff00]/10 border border-[#a6ff00]/30 flex items-center justify-center text-[#a6ff00]">
              <CheckCircle2 size={30} />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Você está na Lista VIP!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto">
                Assim que a LeadsPay liberar os primeiros acessos, você será avisado imediatamente com prioridade.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
              Não se esqueça de reivindicar seu presente de lançamento no funil!
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenFunnel();
              }}
              className="w-full h-11 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Reivindicar Presente Agora</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#a6ff00] uppercase tracking-wider">
                <Bell size={12} />
                <span>Aviso de Abertura</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">
                Seja o primeiro a saber do lançamento oficial
              </h3>
              <p className="text-xs text-slate-300">
                Cadastre seus dados para receber o link de abertura antes de todo mundo e garantir suas taxas especiais.
              </p>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Seu Nome ou Empresa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#a6ff00]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  WhatsApp ou E-mail
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: (11) 98888-7777 ou email@exemplo.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#a6ff00]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(166,255,0,0.3)] transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>Garantir Meu Acesso VIP no Lançamento</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
