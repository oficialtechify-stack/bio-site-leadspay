import React, { useState } from 'react';
import {
  X,
  Zap,
  Shield,
  Layers,
  Users,
  Coins,
  ArrowRight,
  ChevronDown,
  Check,
  Building,
  TrendingUp,
  Cpu,
  HelpCircle,
} from 'lucide-react';
import { LeadsPayIcon, LeadsPayLogo } from './LeadsPayLogo';

interface PlatformDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFunnel: () => void;
}

export const PlatformDetailsModal: React.FC<PlatformDetailsModalProps> = ({
  isOpen,
  onClose,
  onOpenFunnel,
}) => {
  const [activeTab, setActiveTab] = useState<'sobre' | 'empresa' | 'afiliado' | 'diferenciais' | 'faq'>('sobre');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'O que é a LeadsPay?',
      a: 'A LeadsPay conecta empresas de tecnologia e SaaS a uma rede de afiliados e reúne a gestão de ofertas, comissões e pagamentos em uma única plataforma simples, rápida e segura.',
    },
    {
      q: 'Como funciona para uma empresa (produtor)?',
      a: 'Você cadastra seus produtos ou softwares, define as regras e percentuais de comissão dos parceiros, e disponibiliza para a rede de afiliados. As vendas são processadas no checkout integrado e o split é feito automaticamente.',
    },
    {
      q: 'Como funciona para quem quer vender (afiliado)?',
      a: 'Você acessa a vitrine de produtos de tecnologia selecionados, gera seus links exclusivos de divulgação com atribuição precisa em tempo real e recebe suas comissões direto na conta via PIX.',
    },
    {
      q: 'Quais são as vantagens da plataforma?',
      a: 'Sem mensalidades fixas e sem complicações! Split automático em tempo real no fluxo de pagamento e saques ágeis via PIX para manter sua operação sempre em movimento.',
    },
    {
      q: 'Quais integrações estão disponíveis?',
      a: 'A LeadsPay conta com API REST moderna, Webhooks em tempo real e protocolo MCP para automação e conexões diretas com seu ecossistema.',
    },
    {
      q: 'Quando as comissões são repassadas?',
      a: 'O split ocorre em tempo real no fluxo de pagamento aprovado. Assim que o saldo estiver liberado, você pode solicitar o saque instantâneo via PIX.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#0c1017] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0e1420]/80">
          <div className="flex items-center gap-2">
            <LeadsPayIcon size={24} />
            <span className="text-sm font-bold text-white tracking-tight">Sobre a LeadsPay</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#090d14] border-b border-white/5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'sobre', label: 'Visão Geral' },
            { id: 'empresa', label: 'Para Empresas' },
            { id: 'afiliado', label: 'Para Afiliados' },
            { id: 'diferenciais', label: 'Diferenciais' },
            { id: 'faq', label: 'Dúvidas / FAQ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#a6ff00] text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200 space-y-6">
          {/* TAB: VISÃO GERAL */}
          {activeTab === 'sobre' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-[#a6ff00]">
                  Payments · Afiliação · Escala
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Venda mais. <br />
                  <span className="text-[#a6ff00]">Receba melhor.</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Pagamentos, afiliados e comissões em uma única plataforma — simples, rápida e segura.
                </p>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#a6ff00]/10 flex items-center justify-center text-[#a6ff00]">
                    <Zap size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-white">Split Automático</h4>
                  <p className="text-xs text-slate-400">
                    Conecte vendas e repasses em um fluxo com divisão instantânea.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#a6ff00]/10 flex items-center justify-center text-[#a6ff00]">
                    <Coins size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-white">Saques via PIX</h4>
                  <p className="text-xs text-slate-400">
                    Recebimento ágil na sua conta bancária sem burocracia.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-[#a6ff00]/10 flex items-center justify-center text-[#a6ff00]">
                    <TrendingUp size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-white">Gestão Real-Time</h4>
                  <p className="text-xs text-slate-400">
                    Acompanhe cada conversão, clique e repasse em tempo real.
                  </p>
                </div>
              </div>

              {/* Ecosystem Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#141d2b] to-[#0f1624] border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers size={16} className="text-[#a6ff00]" />
                  <span>Seu produto merece uma rede de vendas.</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uma infraestrutura comercial completa para conectar quem cria tecnologia a quem sabe vender.
                </p>
              </div>
            </div>
          )}

          {/* TAB: PARA EMPRESAS */}
          {activeTab === 'empresa' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-bold tracking-wider text-[#a6ff00]">
                  Para Produtores & SaaS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Você cria. Sua oferta alcança mais.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Cadastre suas soluções e planos, defina as regras de comissão e acompanhe a operação em um só lugar.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    step: '01',
                    title: 'Cadastre seu produto',
                    desc: 'Crie o perfil da empresa e apresente seus planos na plataforma de forma simples.',
                  },
                  {
                    step: '02',
                    title: 'Defina as regras de split',
                    desc: 'Configure as comissões e prazos de repasse para seus coprodutores e afiliados.',
                  },
                  {
                    step: '03',
                    title: 'Conecte afiliados qualificados',
                    desc: 'Disponibilize a oferta na vitrine para divulgação imediata por parceiros.',
                  },
                  {
                    step: '04',
                    title: 'Acompanhe repasses automáticos',
                    desc: 'Visualize cada transação com split automatizado na ponta.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3"
                  >
                    <span className="text-xs font-mono font-bold text-[#a6ff00] bg-[#a6ff00]/10 px-2 py-1 rounded">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PARA AFILIADOS */}
          {activeTab === 'afiliado' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-bold tracking-wider text-[#a6ff00]">
                  Para Afiliados & Vendedores
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Você indica. Acompanhe cada venda.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Descubra soluções para divulgar, acesse ofertas de tecnologia e acompanhe os resultados de sua divulgação com split automático.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Check size={16} className="text-[#a6ff00]" />
                  <span>Explore ofertas de produtos validados na vitrine</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Check size={16} className="text-[#a6ff00]" />
                  <span>Divulgue com seu link exclusivo e rastreamento à prova de falhas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Check size={16} className="text-[#a6ff00]" />
                  <span>Acompanhe comissões atribuídas em tempo real</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <Check size={16} className="text-[#a6ff00]" />
                  <span>Solicite saques via PIX com liberação rápida e transparente</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DIFERENCIAIS */}
          {activeTab === 'diferenciais' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#a6ff00]">
                  Vantagens Exclusivas
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Sem mensalidade. Sem burocracia.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Uma infraestrutura comercial completa para você acelerar suas conversões com tecnologia moderna.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#16202e] to-[#0e1522] border border-[#a6ff00]/30 text-center space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Checkout</span>
                  <div className="text-xl font-black text-[#a6ff00] font-sans">Alta Conversão</div>
                  <p className="text-[11px] text-slate-400">fluido, rápido e sem atrito</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-b from-[#16202e] to-[#0e1522] border border-white/10 text-center space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Repasses</span>
                  <div className="text-xl font-black text-white font-sans">Split via PIX</div>
                  <p className="text-[11px] text-slate-400">divisão automática em tempo real</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-b from-[#16202e] to-[#0e1522] border border-white/10 text-center space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400">Adesão</span>
                  <div className="text-xl font-black text-white font-sans">Zero Mensalidade</div>
                  <p className="text-[11px] text-slate-400">pague apenas quando vender</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#a6ff00]">
                  Perguntas Frequentes
                </span>
                <h3 className="text-xl font-bold text-white">Ficou com alguma dúvida?</h3>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpenItem = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpenItem ? null : idx)}
                        className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-[#a6ff00] cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 shrink-0 transition-transform ${
                            isOpenItem ? 'rotate-180 text-[#a6ff00]' : ''
                          }`}
                        />
                      </button>
                      {isOpenItem && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-white/[0.01]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action: Trigger Funnel */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0e1420] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <div className="text-xs font-bold text-white">Pronto para começar?</div>
            <div className="text-[11px] text-slate-400">Resgate seu voucher VIP de lançamento agora</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenFunnel();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(166,255,0,0.3)] cursor-pointer"
          >
            <span>Reivindicar Presente</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
