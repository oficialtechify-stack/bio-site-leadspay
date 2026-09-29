import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Instagram,
  Copy,
  Check,
  Gift,
  Zap,
  Building2,
  TrendingUp,
  Crown,
  Users,
  Share2,
  Send,
  ChevronRight,
  MessageCircle,
  Award,
  Smartphone,
  Flame,
} from 'lucide-react';
import { LeadsPayIcon } from './LeadsPayLogo';

interface FunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFollowInstagram: () => void;
}

export type ProfileType = 'empresa' | 'afiliado' | 'embaixador' | 'iniciante';

type QuestionStep = 'intro' | 'q1' | 'q2' | 'q3' | 'calculating' | 'reward';

interface UserAnswers {
  roleKey: ProfileType;
  roleTitle: string;
  q2Answer: string;
  q3Answer: string;
  instagramHandle: string;
  whatsapp: string;
}

export const FunnelModal: React.FC<FunnelModalProps> = ({
  isOpen,
  onClose,
  onFollowInstagram,
}) => {
  const [step, setStep] = useState<QuestionStep>('intro');
  const [answers, setAnswers] = useState<UserAnswers>({
    roleKey: 'afiliado',
    roleTitle: '',
    q2Answer: '',
    q3Answer: '',
    instagramHandle: '',
    whatsapp: '',
  });

  const [hasFollowed, setHasFollowed] = useState(false);
  const [claimedCode, setClaimedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Generate unique VIP ticket code once
  useEffect(() => {
    const existing = localStorage.getItem('leadspay_vip_code');
    if (existing) {
      setClaimedCode(existing);
    } else {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newCode = `LEADSPAY-VIP-${randomNum}`;
      localStorage.setItem('leadspay_vip_code', newCode);
      setClaimedCode(newCode);
    }
  }, []);

  // Check if previously followed
  useEffect(() => {
    const followed = localStorage.getItem('leadspay_has_followed') === 'true';
    if (followed) setHasFollowed(true);
  }, []);

  // When step changes to calculating, simulate fast intelligent preparation
  useEffect(() => {
    if (step === 'calculating') {
      const timer = setTimeout(() => {
        setStep('reward');
        triggerConfetti();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#a6ff00', '#70e000', '#ffffff', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }
  };

  if (!isOpen) return null;

  // Q1 Selection handler
  const handleSelectRole = (key: ProfileType, title: string) => {
    setAnswers((prev) => ({ ...prev, roleKey: key, roleTitle: title }));
    setStep('q2');
  };

  // Q2 Selection handler
  const handleSelectQ2 = (val: string) => {
    setAnswers((prev) => ({ ...prev, q2Answer: val }));
    setStep('q3');
  };

  // Q3 Selection handler
  const handleSelectQ3 = (val: string) => {
    setAnswers((prev) => ({ ...prev, q3Answer: val }));
    setStep('calculating');
  };

  const handleFollowClick = () => {
    setHasFollowed(true);
    localStorage.setItem('leadspay_has_followed', 'true');
    onFollowInstagram();
  };

  const handleCopyCode = () => {
    if (!claimedCode) return;
    navigator.clipboard.writeText(claimedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      triggerConfetti();
      localStorage.setItem(
        'leadspay_lead_info',
        JSON.stringify({
          ...answers,
          claimedCode,
          claimedAt: new Date().toISOString(),
        })
      );
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    const roleLabels: Record<ProfileType, string> = {
      empresa: 'Empresa / Produtor',
      afiliado: 'Afiliado',
      embaixador: 'Embaixador',
      iniciante: 'Renda Extra / Novo Membro',
    };

    const text = `Olá time LeadsPay! Acabei de responder o funil na bio como *${roleLabels[answers.roleKey]}*. Já segui o perfil @leadspay no Instagram e meu voucher é *${claimedCode}*. Gostaria de confirmar meu acesso de lançamento!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSharePresent = () => {
    const text = `A LeadsPay está liberando presentes de lançamento para empresas, afiliados, criadores e quem quer renda extra! Resgate o seu aqui: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Presente Oficial LeadsPay',
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  // Configuration for Q2 based on chosen profile
  const getQ2Config = () => {
    switch (answers.roleKey) {
      case 'empresa':
        return {
          title: 'Qual é o maior desafio ou objetivo da sua empresa hoje?',
          subtitle: 'Personalizaremos as ferramentas de escala e split para o seu negócio.',
          options: [
            {
              id: 'e1',
              title: 'Escalar vendas através de uma rede ativa de afiliados',
              desc: 'Quero mais pessoas qualificadas vendendo meu software ou produto digital.',
            },
            {
              id: 'e2',
              title: 'Automatizar split de pagamentos e repasses com parceiros',
              desc: 'Chega de divisões manuais e planilhas complexas a cada venda aprovada.',
            },
            {
              id: 'e3',
              title: 'Checkout de alta conversão sem mensalidades abusivas',
              desc: 'Quero pagar apenas quando vender e ter saques rápidos via PIX.',
            },
            {
              id: 'e4',
              title: 'Integrar via API, Webhooks ou MCP ao nosso ecossistema',
              desc: 'Operação robusta de tecnologia para rodar com estabilidade máxima.',
            },
          ],
        };

      case 'afiliado':
        return {
          title: 'Como você prefere atuar e faturar como afiliado?',
          subtitle: 'Liberaremos as melhores ofertas e materiais específicos para o seu formato.',
          options: [
            {
              id: 'a1',
              title: 'Tráfego Pago (Meta Ads, Google, TikTok Ads)',
              desc: 'Foco em escala rápida com produtos validados e comissões altas no PIX.',
            },
            {
              id: 'a2',
              title: 'Vendas no 1 a 1 (WhatsApp, Direct do Instagram, Networking)',
              desc: 'Abordagem consultiva oferecendo soluções de tecnologia que as pessoas precisam.',
            },
            {
              id: 'a3',
              title: 'Criador de Conteúdo / Canal no YouTube / Comunidade',
              desc: 'Indico para meu público e recebo comissões com rastreamento seguro.',
            },
            {
              id: 'a4',
              title: 'Iniciando agora no mercado de afiliados',
              desc: 'Quero aprender o passo a passo com suporte para fazer minhas primeiras vendas.',
            },
          ],
        };

      case 'embaixador':
        return {
          title: 'Como é o seu perfil de influência ou comunidade?',
          subtitle: 'Os embaixadores LeadsPay recebem vantagens e participações exclusivas.',
          options: [
            {
              id: 'emb1',
              title: 'Influenciador ou Criador de Conteúdo Digital',
              desc: 'Produzo conteúdo sobre marketing, negócios, tecnologia ou finanças.',
            },
            {
              id: 'emb2',
              title: 'Líder de Comunidade, Grupo VIP ou Mentoria',
              desc: 'Tenho grupos engajados de empreendedores, alunos ou profissionais de vendas.',
            },
            {
              id: 'emb3',
              title: 'Networker / Conector de Empresas e Produtores',
              desc: 'Conheço donos de SaaS e produtos digitais prontos para migrar de plataforma.',
            },
            {
              id: 'emb4',
              title: 'Entusiasta com alta presença social no Instagram',
              desc: 'Quero representar a marca LeadsPay desde o início e crescer junto.',
            },
          ],
        };

      case 'iniciante':
      default:
        return {
          title: 'Qual é o seu principal objetivo hoje com a internet?',
          subtitle: 'Qualquer pessoa pode lucrar indicando na LeadsPay, mesmo sem criar produtos.',
          options: [
            {
              id: 'i1',
              title: 'Ter uma Renda Extra de R$ 500 a R$ 2.000 / mês',
              desc: 'Usar apenas o celular nas horas vagas para pagar contas e ter mais folga.',
            },
            {
              id: 'i2',
              title: 'Aprender do zero como funciona o mercado digital',
              desc: 'Quero um método confiável e produtos validados para começar sem risco.',
            },
            {
              id: 'i3',
              title: 'Ganhar dinheiro indicando para amigos e contatos',
              desc: 'Divulgar links prontos e receber comissões automáticas no PIX.',
            },
            {
              id: 'i4',
              title: 'Garantir meu presente exclusivo de lançamento',
              desc: 'Quero aproveitar o voucher gratuito e acompanhar as novidades no Instagram.',
            },
          ],
        };
    }
  };

  // Configuration for Q3 based on chosen profile
  const getQ3Config = () => {
    switch (answers.roleKey) {
      case 'empresa':
        return {
          title: 'O que a LeadsPay deve priorizar para o lançamento da sua empresa?',
          subtitle: 'Sua resposta moldará o seu passe fundador personalizado.',
          options: [
            {
              id: 'e3_1',
              title: 'Acesso VIP antecipado para cadastrar minhas ofertas',
              desc: 'Estar no ar no Dia 1 de lançamento antes da concorrência.',
            },
            {
              id: 'e3_2',
              title: 'Taxa Zero nos primeiros R$ 5.000 em vendas',
              desc: 'Economia real de checkout logo no início da operação.',
            },
            {
              id: 'e3_3',
              title: 'Conexão direta com os top afiliados da plataforma',
              desc: 'Colocar os melhores vendedores digitais para divulgar minha solução.',
            },
            {
              id: 'e3_4',
              title: 'Onboarding VIP dedicado com o time técnico',
              desc: 'Suporte rápido e personalizado para configurar split e integrações.',
            },
          ],
        };

      case 'afiliado':
        return {
          title: 'O que te fará focar com força total nos produtos da LeadsPay?',
          subtitle: 'Queremos criar o melhor ambiente do Brasil para afiliados de tecnologia.',
          options: [
            {
              id: 'a3_1',
              title: 'Split Automático e Saque PIX Rápido sem enrolação',
              desc: 'Vendeu, caiu na conta sem burocracia.',
            },
            {
              id: 'a3_2',
              title: 'Produtos de Tecnologia com alta taxa de conversão',
              desc: 'Soluções SaaS e digitais que as pessoas realmente usam e compram.',
            },
            {
              id: 'a3_3',
              title: 'Materiais de vendas validados prontos para disparar',
              desc: 'Copies, criativos e scripts para vender com poucos cliques.',
            },
            {
              id: 'a3_4',
              title: 'Comissões justas e transparência total nas métricas',
              desc: 'Rastreamento confiável de cada clique e conversão.',
            },
          ],
        };

      case 'embaixador':
        return {
          title: 'Qual benefício você quer no seu Pacote de Embaixador?',
          subtitle: 'Reconhecemos quem ajuda a construir o ecossistema LeadsPay.',
          options: [
            {
              id: 'emb3_1',
              title: 'Comissão recorrente sobre o volume dos meus indicados',
              desc: 'Ganhar sobre cada transação das empresas e afiliados que eu trouxer.',
            },
            {
              id: 'emb3_2',
              title: 'Selo oficial de Embaixador e destaque no perfil @leadspay',
              desc: 'Posicionamento de autoridade no mercado digital.',
            },
            {
              id: 'emb3_3',
              title: 'Canal exclusivo direto com a diretoria e fundadores',
              desc: 'Voz ativa nas novas funcionalidades e atualizações da plataforma.',
            },
            {
              id: 'emb3_4',
              title: 'Kit de Boas-Vindas Oficial LeadsPay + Convite para Eventos VIP',
              desc: 'Acesso às reuniões e lançamentos fechados da marca.',
            },
          ],
        };

      case 'iniciante':
      default:
        return {
          title: 'Se a LeadsPay te der um caminho passo a passo simples, você topa?',
          subtitle: 'Todos começam do primeiro passo. O seu presente de lançamento já está garantido!',
          options: [
            {
              id: 'i3_1',
              title: 'Sim, com certeza! Quero lucrar no digital o quanto antes',
              desc: 'Basta me mostrarem como indicar e receber meu dinheiro no PIX.',
            },
            {
              id: 'i3_2',
              title: 'Sim, nas minhas horas vagas usando apenas meu celular',
              desc: 'Uma renda extra sem largar o que faço atualmente.',
            },
            {
              id: 'i3_3',
              title: 'Quero primeiro ver as novidades e acompanhar no Instagram',
              desc: 'Vou seguir @leadspay para não perder nada.',
            },
            {
              id: 'i3_4',
              title: 'Só quero garantir meu voucher VIP e fazer parte do lançamento',
              desc: 'Quero meu presente e acesso prioritário.',
            },
          ],
        };
    }
  };

  // Custom data for the Reward Ticket based on profile
  const getRewardData = () => {
    switch (answers.roleKey) {
      case 'empresa':
        return {
          badge: 'PARCEIRO EMPRESARIAL VIP',
          title: 'Passe Produtor / SaaS LeadsPay',
          subtitle: 'Infraestrutura completa de split e checkout de alta conversão.',
          benefits: [
            'Taxa Zero no Checkout: Isenção nos seus primeiros R$ 5.000 faturados',
            'Vitrine Prioritária no Lançamento para atrair afiliados ativos',
            'Onboarding VIP & Suporte Direto com time técnico LeadsPay',
          ],
          ctaWhatsapp: 'Garantir Parceria Empresarial no WhatsApp',
        };

      case 'afiliado':
        return {
          badge: 'AFILIADO PRO OFICIAL',
          title: 'Passe Afiliado VIP LeadsPay',
          subtitle: 'Comissões instantâneas via PIX e produtos de tecnologia validados.',
          benefits: [
            'Acesso Antecipado à Vitrine Secreta de Softwares & SaaS',
            'Split Automático Instantâneo a cada venda realizada',
            'Materiais de Vendas Prontos e canal de suporte exclusivo',
          ],
          ctaWhatsapp: 'Acessar Vitrine & Vagas de Afiliado no WhatsApp',
        };

      case 'embaixador':
        return {
          badge: 'EMBAIXADOR OFICIAL LEADSPAY',
          title: 'Credencial Embaixador Fundador',
          subtitle: 'Posicionamento de liderança, participações e canal direto com fundadores.',
          benefits: [
            'Prioridade para Comissão Recorrente sobre volume indicado',
            'Reconhecimento & Destaque nas redes oficiais da @leadspay',
            'Canal Direto com os Fundadores & Acesso a eventos fechados',
          ],
          ctaWhatsapp: 'Confirmar Minha Vaga de Embaixador no WhatsApp',
        };

      case 'iniciante':
      default:
        return {
          badge: 'MEMBRO FUNDADOR · RENDA EXTRA',
          title: 'Passe de Boas-Vindas LeadsPay',
          subtitle: 'Acesso garantido ao lançamento e oportunidade de lucrar no celular.',
          benefits: [
            'Voucher Oficial de Lançamento 100% Gratuito',
            'Guia Rápido: Como lucrar indicando produtos pelo seu celular',
            'Vaga Garantida na Comunidade VIP de Fundadores',
          ],
          ctaWhatsapp: 'Receber Guia & Benefícios no WhatsApp',
        };
    }
  };

  const q2Config = getQ2Config();
  const q3Config = getQ3Config();
  const rewardData = getRewardData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0c1017] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0e1420]/80">
          <div className="flex items-center gap-2.5">
            <LeadsPayIcon size={24} />
            <div className="flex items-baseline">
              <span className="text-sm font-bold text-white tracking-tight">Leads</span>
              <span className="text-sm font-black text-[#a6ff00] tracking-tight">Pay</span>
            </div>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-300">Funil VIP de Lançamento</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200">
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center space-y-3 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a6ff00]/10 border border-[#a6ff00]/30 text-[#a6ff00] text-xs font-bold tracking-wide">
                  <Sparkles size={13} />
                  <span>PRESENTE ESPECIAL DE LANÇAMENTO</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Reivindique seu <span className="text-[#a6ff00]">Passe VIP</span> na LeadsPay
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  Aberto para <strong>empresas</strong>, <strong>afiliados</strong>, <strong>embaixadores</strong> e <strong>qualquer pessoa</strong> que queira uma renda extra na internet.
                </p>
              </div>

              {/* Public categories preview */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <Building2 size={16} className="text-[#a6ff00] shrink-0" />
                  <div>
                    <strong className="text-white block">Empresas</strong>
                    <span className="text-[11px] text-slate-400">Checkout & Afiliados</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#a6ff00] shrink-0" />
                  <div>
                    <strong className="text-white block">Afiliados</strong>
                    <span className="text-[11px] text-slate-400">Comissões no PIX</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <Crown size={16} className="text-[#a6ff00] shrink-0" />
                  <div>
                    <strong className="text-white block">Embaixadores</strong>
                    <span className="text-[11px] text-slate-400">Participação VIP</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2">
                  <Smartphone size={16} className="text-[#a6ff00] shrink-0" />
                  <div>
                    <strong className="text-white block">Renda Extra</strong>
                    <span className="text-[11px] text-slate-400">Qualquer pessoa</span>
                  </div>
                </div>
              </div>

              {/* Requirement Reassurance */}
              <div className="p-3.5 rounded-xl bg-[#a6ff00]/5 border border-[#a6ff00]/25 flex items-center gap-3">
                <Gift className="text-[#a6ff00] shrink-0" size={22} />
                <p className="text-xs text-slate-200">
                  <strong className="text-[#a6ff00]">Qualquer pessoa pode reivindicar!</strong> Não é necessário pagar nada. Basta responder as perguntas sobre seu perfil e seguir <strong>@leadspay</strong> no Instagram.
                </p>
              </div>

              {/* CTA Start */}
              <button
                onClick={() => setStep('q1')}
                className="w-full h-13 rounded-xl bg-[#a6ff00] hover:bg-[#b8ff24] active:scale-[0.98] text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(166,255,0,0.35)] transition-all cursor-pointer"
              >
                <span>Iniciar e Escolher Meu Perfil</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP: QUESTION 1 (PROFILES) */}
          {step === 'q1' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Passo 1 de 3: Identificação de Perfil</span>
                  <span className="text-[#a6ff00]">33%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a6ff00] w-1/3 rounded-full transition-all duration-300" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Qual é o seu perfil hoje?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Selecione a opção que melhor te descreve para personalizarmos seu presente.
                </p>
              </div>

              <div className="space-y-2.5">
                {/* 1. Empresa */}
                <button
                  onClick={() =>
                    handleSelectRole('empresa', 'Empresa / Produtor / SaaS')
                  }
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#a6ff00]/10 border border-[#a6ff00]/20 flex items-center justify-center text-[#a6ff00] shrink-0 mt-0.5">
                      <Building2 size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#a6ff00] transition-colors">
                          Sou Empresa, Produtor ou Dono de Software
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300">
                          B2B
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Quero usar a LeadsPay para escalar meu negócio, automatizar o split com parceiros e conectar uma rede ativa de afiliados.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* 2. Afiliado */}
                <button
                  onClick={() =>
                    handleSelectRole('afiliado', 'Afiliado / Vendedor Digital')
                  }
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#a6ff00]/10 border border-[#a6ff00]/20 flex items-center justify-center text-[#a6ff00] shrink-0 mt-0.5">
                      <TrendingUp size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#a6ff00] transition-colors">
                          Quero ser Afiliado da LeadsPay
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-[#a6ff00]/20 text-[#a6ff00]">
                          Afiliado Pro
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Quero divulgar produtos e soluções de tecnologia com alta demanda e receber comissões automáticas no PIX.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* 3. Embaixador */}
                <button
                  onClick={() =>
                    handleSelectRole('embaixador', 'Embaixador / Creator / Influenciador')
                  }
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                      <Crown size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#a6ff00] transition-colors">
                          Quero ser Embaixador Oficial da LeadsPay
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                          Exclusivo
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Tenho audiência, autoridade ou rede de contatos e quero representar a marca com participações e canal direto com os fundadores.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* 4. Pessoa Comum / Renda Extra */}
                <button
                  onClick={() =>
                    handleSelectRole('iniciante', 'Pessoa Comum / Renda Extra')
                  }
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/50 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                      <Smartphone size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-[#a6ff00] transition-colors">
                          Sou pessoa comum / Buscando Renda Extra
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-400/20 text-purple-300">
                          Todos
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Não tenho experiência com vendas digitais, mas quero meu presente VIP e aprender a ganhar dinheiro no celular indicando com facilidade.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <button
                onClick={() => setStep('intro')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors pt-1"
              >
                <ArrowLeft size={14} />
                <span>Voltar</span>
              </button>
            </div>
          )}

          {/* STEP: QUESTION 2 (DYNAMICALLY BRANCHED) */}
          {step === 'q2' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Passo 2 de 3: Alinhamento de Interesses</span>
                  <span className="text-[#a6ff00]">66%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a6ff00] w-2/3 rounded-full transition-all duration-300" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a6ff00]">
                  {answers.roleTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  {q2Config.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {q2Config.subtitle}
                </p>
              </div>

              <div className="space-y-2.5">
                {q2Config.options.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectQ2(item.title)}
                    className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/40 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-semibold text-white group-hover:text-[#a6ff00] transition-colors">
                        {item.title}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep('q1')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors pt-1"
              >
                <ArrowLeft size={14} />
                <span>Voltar ao Perfil</span>
              </button>
            </div>
          )}

          {/* STEP: QUESTION 3 (DYNAMICALLY BRANCHED) */}
          {step === 'q3' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Passo 3 de 3: Personalização do Presente</span>
                  <span className="text-[#a6ff00]">100%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a6ff00] w-full rounded-full transition-all duration-300" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a6ff00]">
                  Etapa Final
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  {q3Config.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {q3Config.subtitle}
                </p>
              </div>

              <div className="space-y-2.5">
                {q3Config.options.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectQ3(item.title)}
                    className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-[#a6ff00]/40 transition-all flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-semibold text-white group-hover:text-[#a6ff00] transition-colors">
                        {item.title}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-slate-500 group-hover:text-[#a6ff00] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep('q2')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors pt-1"
              >
                <ArrowLeft size={14} />
                <span>Voltar à pergunta anterior</span>
              </button>
            </div>
          )}

          {/* STEP: CALCULATING / SIMULATION */}
          {step === 'calculating' && (
            <div className="py-12 px-4 text-center space-y-6 animate-in fade-in duration-300">
              <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-0 rounded-full border-2 border-[#a6ff00] border-t-transparent animate-spin" />
                <LeadsPayIcon size={34} />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Personalizando seu Passe LeadsPay...
                </h3>
                <p className="text-xs text-slate-400">
                  Adaptando as condições de lançamento para {answers.roleTitle}.
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2 text-left text-xs text-slate-300 bg-white/[0.02] p-3 rounded-lg border border-white/5 font-mono">
                <div className="flex items-center gap-2 text-[#a6ff00]">
                  <Check size={13} />
                  <span>Perfil registrado com sucesso</span>
                </div>
                <div className="flex items-center gap-2 text-[#a6ff00]">
                  <Check size={13} />
                  <span>Voucher de Lançamento emitido</span>
                </div>
                <div className="flex items-center gap-2 text-white animate-pulse">
                  <Zap size={13} className="text-[#a6ff00]" />
                  <span>Vinculando ao perfil @leadspay no Instagram...</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP: REWARD CLAIM */}
          {step === 'reward' && (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              {/* Header congratulations */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#a6ff00]/15 text-[#a6ff00] text-xs font-bold border border-[#a6ff00]/30">
                  <Sparkles size={12} />
                  <span>PRESENTE LIBERADO COM SUCESSO!</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Seu <span className="text-[#a6ff00]">{rewardData.title}</span> está pronto!
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Como prometido, qualquer pessoa pode reivindicar. Basta seguir nosso perfil oficial no Instagram para validar seu benefício!
                </p>
              </div>

              {/* Digital VIP Ticket Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#121926] via-[#0d141e] to-[#080d14] border border-[#a6ff00]/40 p-4 sm:p-5 shadow-[0_0_30px_rgba(166,255,0,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a6ff00]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#a6ff00]">
                      {rewardData.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {rewardData.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {rewardData.subtitle}
                    </p>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#a6ff00]/20 border border-[#a6ff00]/40 text-[#a6ff00] font-mono text-xs font-bold shrink-0">
                    VALIDADO
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-2 mb-4 text-xs text-slate-200">
                  {rewardData.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#a6ff00] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Ticket Code Box */}
                <div className="bg-black/60 rounded-xl p-3 border border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Seu Código de Resgate:
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white tracking-widest">
                      {claimedCode}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-[#a6ff00]" />
                        <span className="text-[#a6ff00]">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* MANDATORY / EASY STEP: FOLLOW INSTAGRAM */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-[#a6ff00] text-black font-bold flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Passo Obrigatório: Seguir nosso perfil oficial</span>
                </div>

                <a
                  href="https://instagram.com/leadspay"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleFollowClick}
                  className={`w-full h-13 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    hasFollowed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                      : 'bg-[#a6ff00] hover:bg-[#b8ff24] text-black shadow-[0_0_20px_rgba(166,255,0,0.35)]'
                  }`}
                >
                  <Instagram size={20} />
                  <span>
                    {hasFollowed
                      ? '✓ Você já seguiu @leadspay (Clique para rever)'
                      : 'Seguir @leadspay no Instagram Agora'}
                  </span>
                </a>
                <p className="text-[11px] text-center text-slate-400">
                  Qualquer pessoa pode revindicar: basta seguir <strong>@leadspay</strong> para confirmar a posse do presente!
                </p>
              </div>

              {/* DIRECT WHATSAPP ACTION BUTTON */}
              <div className="pt-1">
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle size={17} className="text-[#25D366]" />
                  <span>{rewardData.ctaWhatsapp}</span>
                </button>
              </div>

              {/* STEP 2: Optional Contact Registration */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Receber avisos do lançamento no seu WhatsApp</span>
                </div>

                {contactSubmitted ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
                    <CheckCircle2 size={20} className="shrink-0 text-[#a6ff00]" />
                    <div>
                      <strong className="block text-white">Presente Confirmado!</strong>
                      Você receberá os avisos prioritários do lançamento. Acompanhe os stories da @leadspay!
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Seu @ no Instagram (ex: @joao)"
                        value={answers.instagramHandle}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, instagramHandle: e.target.value }))
                        }
                        className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#a6ff00] transition-colors"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp com DDD (ex: 11 99999-9999)"
                        value={answers.whatsapp}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, whatsapp: e.target.value }))
                        }
                        className="w-full h-11 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#a6ff00] transition-colors"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingContact ? (
                        <span>Validando seu presente...</span>
                      ) : (
                        <>
                          <Send size={15} className="text-[#a6ff00]" />
                          <span>Salvar Meus Dados & Confirmar Vaga</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Share with Friends */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={handleSharePresent}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <Share2 size={14} className="text-[#a6ff00]" />
                  <span>Indicar presente para um amigo</span>
                </button>

                <button
                  onClick={onClose}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Concluir e voltar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
