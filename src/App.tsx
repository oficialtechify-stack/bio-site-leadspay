import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Gift,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Zap,
  ShieldCheck,
  HelpCircle,
  Share2,
  Bell,
  MessageCircle,
  Copy,
  Check,
  TrendingUp,
  Layers,
  ChevronDown,
  Info,
  Clock,
  Flame,
  Building2,
  Crown,
  Smartphone,
} from 'lucide-react';
import { LeadsPayLogo, LeadsPayIcon } from './components/LeadsPayLogo';
import { FunnelModal } from './components/FunnelModal';
import { PlatformDetailsModal } from './components/PlatformDetailsModal';
import { BioLinkCard } from './components/BioLinkCard';
import { ShareModal } from './components/ShareModal';
import { NotifyModal } from './components/NotifyModal';

export default function App() {
  const [funnelOpen, setFunnelOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const instagramUrl = 'https://instagram.com/leadspay';
  const whatsappUrl = 'https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1!%20Vim%20pelo%20Instagram%20da%20LeadsPay%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20lan%C3%A7amento.';

  useEffect(() => {
    const followed = localStorage.getItem('leadspay_has_followed') === 'true';
    if (followed) setHasFollowed(true);
  }, []);

  const handleCopyHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('@leadspay');
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  const handleFollowAction = () => {
    setHasFollowed(true);
    localStorage.setItem('leadspay_has_followed', 'true');
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#a6ff00] selection:text-black">
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#a6ff00]/12 via-[#10b981]/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-[#a6ff00]/5 blur-[140px] pointer-events-none -z-10" />

      {/* Main Container - Optimized for mobile width while looking stellar on desktop */}
      <main className="w-full max-w-md sm:max-w-lg px-4 sm:px-5 py-6 sm:py-8 flex flex-col gap-6 pb-28">
        {/* Top Utility Bar */}
        <header className="flex items-center justify-between w-full pt-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#a6ff00] animate-pulse" />
              Lançamento Oficial em Breve
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShareOpen(true)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Compartilhar"
              aria-label="Compartilhar Bio"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={() => setNotifyOpen(true)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Avise-me"
              aria-label="Notificações"
            >
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* Profile Lockup (Bio Header) */}
        <section className="flex flex-col items-center text-center space-y-4 pt-1">
          {/* Avatar with dynamic glow ring */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#a6ff00] via-[#70e000] to-emerald-400 opacity-80 blur-[6px] group-hover:opacity-100 transition-opacity animate-pulse" />
            <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-[#080d14] border-2 border-black p-1 flex items-center justify-center shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0a111a] flex items-center justify-center overflow-hidden">
                <LeadsPayIcon size={56} className="drop-shadow-[0_0_12px_rgba(166,255,0,0.5)]" />
              </div>
            </div>
            {/* Verified badge */}
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#a6ff00] text-black flex items-center justify-center shadow-md">
              <Check size={14} className="stroke-[3.5]" />
            </div>
          </div>

          {/* Profile Name & Handle */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Leads<span className="text-[#a6ff00]">Pay</span>
              </h1>
            </div>

            <button
              onClick={handleCopyHandle}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Clique para copiar @leadspay"
            >
              <Instagram size={12} className="text-[#a6ff00]" />
              <span>@leadspay</span>
              {copiedHandle ? (
                <span className="text-[10px] text-[#a6ff00] font-sans font-semibold">Copiado!</span>
              ) : (
                <Copy size={11} className="text-slate-400" />
              )}
            </button>
          </div>

          {/* Bio Description */}
          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            <strong className="text-white font-semibold">Venda mais. Receba melhor.</strong> Pagamentos, rede de afiliados e split automático. Conectando empresas, afiliados, embaixadores e membros fundadores.
          </p>

          {/* Quick Pillars Chips */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap text-[11px] font-medium text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-1">
              <Building2 size={12} className="text-[#a6ff00]" />
              Empresas & SaaS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-1">
              <TrendingUp size={12} className="text-[#a6ff00]" />
              Afiliados Pro
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-1">
              <Crown size={12} className="text-[#a6ff00]" />
              Embaixadores
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-1">
              <Smartphone size={12} className="text-[#a6ff00]" />
              Renda Extra
            </span>
          </div>
        </section>

        {/* HERO CTA: THE GIFT FUNNEL BANNER (Key Requirement!) */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 bg-gradient-to-br from-[#121b29] via-[#0d1421] to-[#070b12] border-2 border-[#a6ff00]/60 shadow-[0_0_35px_rgba(166,255,0,0.22)] space-y-4">
          {/* Decorative neon element */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#a6ff00]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a6ff00]/15 text-[#a6ff00] text-xs font-black tracking-wide border border-[#a6ff00]/30">
              <Gift size={13} />
              <span>PRESENTE DE LANÇAMENTO</span>
            </div>
            <span className="text-[11px] text-[#a6ff00] font-mono font-bold uppercase tracking-wider animate-pulse">
              100% Gratuito
            </span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Reivindique seu Presente de Boas-Vindas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Para <strong>empresas</strong>, <strong>afiliados</strong>, <strong>embaixadores</strong> ou quem busca <strong>renda extra</strong>: responda as perguntas do seu perfil para desbloquear seu Passe VIP de Lançamento.
            </p>
          </div>

          {/* Simple rule highlight as requested */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5 text-xs text-slate-300">
            <CheckCircle2 size={16} className="text-[#a6ff00] shrink-0" />
            <span>
              <strong>Qualquer pessoa pode reivindicar</strong> — basta seguir @leadspay no Instagram!
            </span>
          </div>

          {/* Trigger button */}
          <button
            onClick={() => setFunnelOpen(true)}
            className="w-full h-13 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] active:scale-[0.98] text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(166,255,0,0.4)] transition-all cursor-pointer"
          >
            <Sparkles size={18} />
            <span>Responder Perguntas & Resgatar Presente</span>
            <ArrowRight size={18} />
          </button>
        </section>

        {/* PRIMARY LINK CARDS SECTION */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Acesso Rápido Oficial
            </span>
            <span className="text-xs text-slate-500">Links Verificados</span>
          </div>

          {/* 1. Direct Instagram Follow Button */}
          <BioLinkCard
            highlight={true}
            icon={<Instagram size={22} />}
            title="Seguir @leadspay no Instagram"
            subtitle={
              hasFollowed
                ? 'Perfil oficial conectado! Acompanhe o lançamento'
                : 'Acompanhe as novidades e valide seu presente especial'
            }
            badge={hasFollowed ? 'SEGUIDO ✓' : 'OFICIAL'}
            badgeColor="lime"
            onClick={handleFollowAction}
            isExternal={true}
          />

          {/* 2. Interactive Funnel Direct Link */}
          <BioLinkCard
            icon={<Gift size={22} />}
            title="Funil do Presente VIP LeadsPay"
            subtitle="Para empresas, afiliados, embaixadores e quem busca renda extra"
            badge="BENEFÍCIO"
            badgeColor="amber"
            onClick={() => setFunnelOpen(true)}
          />

          {/* 3. What is LeadsPay (Platform Features) */}
          <BioLinkCard
            icon={<Layers size={22} />}
            title="O Que é a LeadsPay?"
            subtitle="Conheça o split automático, saques via PIX e o ecossistema LeadsPay"
            badge="NOVO"
            badgeColor="blue"
            onClick={() => setDetailsOpen(true)}
          />

          {/* 4. WhatsApp VIP Support / Questions */}
          <BioLinkCard
            icon={<MessageCircle size={22} />}
            title="Falar no WhatsApp / Suporte Oficial"
            subtitle="Tire dúvidas sobre cadastros, parcerias e antecipação"
            href={whatsappUrl}
            isExternal={true}
          />

          {/* 5. Waitlist / Priority Notice */}
          <BioLinkCard
            icon={<Bell size={22} />}
            title="Avise-me no Lançamento"
            subtitle="Receba aviso prioritário no e-mail ou WhatsApp no Dia 1"
            onClick={() => setNotifyOpen(true)}
          />
        </section>

        {/* TEASER NOTIFICATION CARD (MATCHING USER IMAGE 1) */}
        <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0f1522] to-[#0a0e16] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <LeadsPayIcon size={16} />
              <span className="font-bold text-white">LeadsPay</span>
            </div>
            <span className="text-[11px] text-slate-400">agora</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-white">
              O começo de algo <span className="text-[#a6ff00]">novo</span>.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Você vai querer estar aqui quando chegar. Uma infraestrutura completa para conectar tecnologia a quem sabe vender.
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between border-t border-white/5">
            <button
              onClick={handleFollowAction}
              className="text-xs font-bold text-[#a6ff00] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Acompanhar no Instagram</span>
              <ArrowRight size={13} />
            </button>
            <span className="text-[11px] text-slate-500">Sem mensalidade</span>
          </div>
        </section>

        {/* QUICK ACCORDION FAQ */}
        <section className="space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Perguntas Frequentes
          </div>

          <div className="space-y-2">
            {[
              {
                q: 'Quem pode participar e resgatar o presente?',
                a: 'Qualquer pessoa! O funil e o presente atendem desde empresas de software/SaaS, afiliados e influenciadores até pessoas comuns que buscam uma renda extra no celular. Basta seguir o perfil @leadspay no Instagram.',
              },
              {
                q: 'Como reivindico o presente de lançamento?',
                a: 'Basta clicar no botão "Responder Perguntas & Resgatar", escolher seu perfil (empresa, afiliado, embaixador ou renda extra), responder as perguntas rápidas e seguir a página oficial @leadspay no Instagram!',
              },
              {
                q: 'O presente tem algum custo?',
                a: 'Não! É 100% gratuito para qualquer pessoa que seguir @leadspay durante o período de pré-lançamento.',
              },
              {
                q: 'O que é o split automático da LeadsPay?',
                a: 'É a divisão instantânea das receitas de cada venda aprovada entre produtor, coprodutor e afiliado diretamente no fluxo de pagamento com saques via PIX.',
              },
            ].map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-white hover:text-[#a6ff00] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={15}
                      className={`text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#a6ff00]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-4 pb-8 text-center space-y-3 border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <LeadsPayLogo size="sm" />
          </div>

          <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram Oficial
            </a>
            <span>·</span>
            <button
              onClick={() => setDetailsOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sobre a Plataforma
            </button>
            <span>·</span>
            <button
              onClick={() => setNotifyOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Lista VIP
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} LeadsPay Pagamentos · Todos os direitos reservados.
          </p>
        </footer>
      </main>

      {/* FLOATING BOTTOM MOBILE BAR (HIGH CONVERSION ERGONOMICS) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#06090e]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-center">
        <div className="w-full max-w-md flex items-center gap-2">
          {/* Main Action: Funnel Claim */}
          <button
            onClick={() => setFunnelOpen(true)}
            className="flex-1 h-12 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(166,255,0,0.3)] transition-all cursor-pointer"
          >
            <Gift size={16} />
            <span>Resgatar Presente VIP</span>
          </button>

          {/* Quick Instagram Follow Button */}
          <button
            onClick={handleFollowAction}
            className={`h-12 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              hasFollowed
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/5 hover:bg-white/10 border-[#a6ff00]/40 text-[#a6ff00]'
            }`}
            title="Seguir @leadspay no Instagram"
          >
            <Instagram size={17} />
            <span className="hidden sm:inline">Seguir @leadspay</span>
            <span className="sm:hidden">Seguir</span>
          </button>
        </div>
      </div>

      {/* MODALS */}
      <FunnelModal
        isOpen={funnelOpen}
        onClose={() => setFunnelOpen(false)}
        onFollowInstagram={handleFollowAction}
      />

      <PlatformDetailsModal
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onOpenFunnel={() => setFunnelOpen(true)}
      />

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      <NotifyModal
        isOpen={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        onOpenFunnel={() => setFunnelOpen(true)}
      />
    </div>
  );
}
