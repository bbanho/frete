import React, { forwardRef } from 'react';
import { FlyerData } from '../types';
import { SafeHtml } from './SafeHtml';
import { Phone, Truck, MapPin, CreditCard, ShieldCheck, ChevronRight, Check } from 'lucide-react';

interface FlyerViewProps {
  data: FlyerData;
  qrCodeUrl?: string;
  isGrayscalePreview?: boolean;
}

/**
 * Componente que renderiza cada entrada de texto da lista em exatamente UMA LINHA,
 * ajustando tamanho e espaçamento para não quebrar linha.
 */
function CardListItems({ content }: { content: string }) {
  if (!content) return null;

  // Quebra por <br>, <br/> ou nova linha
  const items = content
    .split(/<br\s*\/?>|\n/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 w-full py-0.5">
      {items.map((item, idx) => {
        // Remove marcadores repetidos se o usuário digitou
        let cleaned = item;
        if (cleaned.startsWith('•') || cleaned.startsWith('-') || cleaned.startsWith('✔') || cleaned.startsWith('*')) {
          cleaned = cleaned.substring(1).trim();
        }

        return (
          <div
            key={idx}
            className="flex items-center gap-1.5 w-full min-w-0 text-[11px] sm:text-[12px] md:text-[12.5px] leading-tight font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 flex-shrink-0" />
            <div className="truncate whitespace-nowrap overflow-hidden flex-1">
              <SafeHtml content={cleaned} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const FlyerView = forwardRef<HTMLDivElement, FlyerViewProps>(({ data, qrCodeUrl, isGrayscalePreview = false }, ref) => {
  // Configurações de temas com múltiplos modelos de fundo branco e alta legibilidade
  const themeStyles = {
    // === MODELOS COM FUNDO BRANCO ===
    'clean-white': {
      bg: 'bg-white',
      text: 'text-zinc-950',
      topBannerBg: 'bg-zinc-950 text-white border-b-4 border-zinc-950',
      topBannerSub: 'text-zinc-300 font-bold',
      driverBadge: 'bg-zinc-100 text-zinc-950 border-2 border-zinc-950 font-black',
      card1Bg: 'bg-zinc-950 text-white border-4 border-zinc-950 shadow-xl',
      card1TitleColor: 'text-amber-400',
      card1Badge: 'bg-amber-400 text-zinc-950 border-2 border-amber-300 font-black',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-zinc-900 border-2 border-amber-400/40 text-amber-200',
      card2Bg: 'bg-zinc-50 text-zinc-950 border-3 border-zinc-950 shadow-md',
      card3Bg: 'bg-zinc-50 text-zinc-950 border-3 border-zinc-950 shadow-md',
      cardHeaderBg: 'bg-zinc-950 text-white border-b-2 border-zinc-950',
      cardTitleColor: 'text-white font-black',
      cardIconBg: 'bg-white text-zinc-950',
      borderAccent: 'border-zinc-950',
      footerBg: 'bg-zinc-950 text-white border-t-4 border-zinc-950',
      photoBorder: 'border-4 border-zinc-950 shadow-md'
    },
    'white-blue': {
      bg: 'bg-slate-50',
      text: 'text-slate-950',
      topBannerBg: 'bg-blue-950 text-white border-b-4 border-blue-900',
      topBannerSub: 'text-amber-300 font-bold',
      driverBadge: 'bg-white text-blue-950 border-2 border-blue-900 font-black',
      card1Bg: 'bg-blue-950 text-white border-4 border-blue-900 shadow-xl',
      card1TitleColor: 'text-amber-300',
      card1Badge: 'bg-amber-400 text-blue-950 border-2 border-amber-300 font-black',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-blue-900 border-2 border-amber-400/50 text-amber-200',
      card2Bg: 'bg-white text-slate-900 border-3 border-blue-950 shadow-md',
      card3Bg: 'bg-white text-slate-900 border-3 border-blue-950 shadow-md',
      cardHeaderBg: 'bg-blue-950 text-white border-b-2 border-blue-900',
      cardTitleColor: 'text-amber-300 font-black',
      cardIconBg: 'bg-amber-400 text-blue-950',
      borderAccent: 'border-blue-950',
      footerBg: 'bg-blue-950 text-amber-300 border-t-4 border-blue-900',
      photoBorder: 'border-4 border-blue-950 shadow-md'
    },
    'white-red': {
      bg: 'bg-zinc-50',
      text: 'text-zinc-950',
      topBannerBg: 'bg-red-800 text-white border-b-4 border-red-950',
      topBannerSub: 'text-yellow-300 font-bold',
      driverBadge: 'bg-white text-red-900 border-2 border-red-900 font-black',
      card1Bg: 'bg-zinc-950 text-white border-4 border-red-700 shadow-xl',
      card1TitleColor: 'text-yellow-300',
      card1Badge: 'bg-yellow-400 text-zinc-950 border-2 border-yellow-300 font-black',
      card1PhoneColor: 'text-yellow-300',
      card1HighlightBg: 'bg-red-950 border-2 border-yellow-400/50 text-yellow-200',
      card2Bg: 'bg-white text-zinc-950 border-3 border-red-900 shadow-md',
      card3Bg: 'bg-white text-zinc-950 border-3 border-red-900 shadow-md',
      cardHeaderBg: 'bg-red-800 text-white border-b-2 border-red-950',
      cardTitleColor: 'text-yellow-300 font-black',
      cardIconBg: 'bg-yellow-400 text-red-950',
      borderAccent: 'border-red-800',
      footerBg: 'bg-red-800 text-white border-t-4 border-red-950',
      photoBorder: 'border-4 border-red-800 shadow-md'
    },
    'white-emerald': {
      bg: 'bg-neutral-50',
      text: 'text-neutral-950',
      topBannerBg: 'bg-emerald-950 text-white border-b-4 border-emerald-900',
      topBannerSub: 'text-emerald-300 font-bold',
      driverBadge: 'bg-white text-emerald-950 border-2 border-emerald-900 font-black',
      card1Bg: 'bg-emerald-950 text-white border-4 border-emerald-900 shadow-xl',
      card1TitleColor: 'text-emerald-300',
      card1Badge: 'bg-emerald-400 text-emerald-950 border-2 border-emerald-300 font-black',
      card1PhoneColor: 'text-emerald-300',
      card1HighlightBg: 'bg-emerald-900 border-2 border-emerald-400/50 text-emerald-100',
      card2Bg: 'bg-white text-neutral-950 border-3 border-emerald-950 shadow-md',
      card3Bg: 'bg-white text-neutral-950 border-3 border-emerald-950 shadow-md',
      cardHeaderBg: 'bg-emerald-950 text-white border-b-2 border-emerald-900',
      cardTitleColor: 'text-emerald-300 font-black',
      cardIconBg: 'bg-emerald-400 text-emerald-950',
      borderAccent: 'border-emerald-950',
      footerBg: 'bg-emerald-950 text-white border-t-4 border-emerald-900',
      photoBorder: 'border-4 border-emerald-950 shadow-md'
    },
    'white-amber': {
      bg: 'bg-white',
      text: 'text-zinc-950',
      topBannerBg: 'bg-zinc-950 text-amber-300 border-b-4 border-zinc-900',
      topBannerSub: 'text-zinc-300 font-bold',
      driverBadge: 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 font-black',
      card1Bg: 'bg-zinc-950 text-white border-4 border-amber-400 shadow-xl',
      card1TitleColor: 'text-amber-400',
      card1Badge: 'bg-amber-400 text-zinc-950 border-2 border-amber-300 font-black',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-zinc-900 border-2 border-amber-400/40 text-amber-200',
      card2Bg: 'bg-white text-zinc-950 border-3 border-zinc-950 shadow-md',
      card3Bg: 'bg-white text-zinc-950 border-3 border-zinc-950 shadow-md',
      cardHeaderBg: 'bg-zinc-950 text-amber-300 border-b-2 border-zinc-900',
      cardTitleColor: 'text-amber-300 font-black',
      cardIconBg: 'bg-amber-400 text-zinc-950',
      borderAccent: 'border-zinc-950',
      footerBg: 'bg-zinc-950 text-amber-300 border-t-4 border-zinc-900',
      photoBorder: 'border-4 border-zinc-950 shadow-md'
    },
    'white-minimal': {
      bg: 'bg-white',
      text: 'text-black',
      topBannerBg: 'bg-white text-black border-b-4 border-black',
      topBannerSub: 'text-zinc-700 font-bold',
      driverBadge: 'bg-black text-white border-2 border-black font-black',
      card1Bg: 'bg-white text-black border-4 border-black shadow-none',
      card1TitleColor: 'text-black',
      card1Badge: 'bg-black text-white border-2 border-black font-black',
      card1PhoneColor: 'text-black',
      card1HighlightBg: 'bg-zinc-100 border-2 border-black text-black',
      card2Bg: 'bg-white text-black border-3 border-black shadow-none',
      card3Bg: 'bg-white text-black border-3 border-black shadow-none',
      cardHeaderBg: 'bg-black text-white border-b-3 border-black',
      cardTitleColor: 'text-white font-black',
      cardIconBg: 'bg-white text-black',
      borderAccent: 'border-black',
      footerBg: 'bg-black text-white border-t-4 border-black',
      photoBorder: 'border-4 border-black shadow-none'
    },

    // === MODELOS COLORIDOS CLÁSSICOS ===
    'yellow-black': {
      bg: 'bg-amber-400',
      text: 'text-zinc-950',
      topBannerBg: 'bg-zinc-950 text-amber-300 border-b-4 border-zinc-950',
      topBannerSub: 'text-amber-200/90',
      driverBadge: 'bg-amber-400 text-zinc-950 border-2 border-zinc-950',
      card1Bg: 'bg-zinc-950 text-white border-4 border-zinc-900 shadow-2xl',
      card1TitleColor: 'text-amber-400',
      card1Badge: 'bg-amber-400 text-zinc-950 border-2 border-amber-300',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-zinc-900 border-2 border-amber-400/40 text-amber-200',
      card2Bg: 'bg-zinc-950 text-zinc-100 border-3 border-zinc-900 shadow-lg',
      card3Bg: 'bg-zinc-950 text-zinc-100 border-3 border-zinc-900 shadow-lg',
      cardHeaderBg: 'bg-zinc-900/90 text-amber-300 border-b-2 border-zinc-800',
      cardTitleColor: 'text-amber-300 font-black',
      cardIconBg: 'bg-amber-400 text-zinc-950',
      borderAccent: 'border-zinc-950',
      footerBg: 'bg-zinc-950 text-amber-300 border-t-4 border-zinc-950',
      photoBorder: 'border-4 border-zinc-950 shadow-xl'
    },
    'black-gold': {
      bg: 'bg-zinc-950',
      text: 'text-zinc-100',
      topBannerBg: 'bg-amber-400 text-zinc-950 border-b-4 border-amber-500',
      topBannerSub: 'text-zinc-900 font-bold',
      driverBadge: 'bg-zinc-950 text-amber-300 border-2 border-amber-400',
      card1Bg: 'bg-zinc-900 text-white border-4 border-amber-400 shadow-2xl',
      card1TitleColor: 'text-amber-400',
      card1Badge: 'bg-amber-400 text-zinc-950 border-2 border-amber-300',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-black/60 border-2 border-amber-400/50 text-amber-200',
      card2Bg: 'bg-zinc-900 text-zinc-100 border-3 border-amber-400/40 shadow-lg',
      card3Bg: 'bg-zinc-900 text-zinc-100 border-3 border-amber-400/40 shadow-lg',
      cardHeaderBg: 'bg-zinc-950 text-amber-300 border-b-2 border-amber-400/30',
      cardTitleColor: 'text-amber-300 font-black',
      cardIconBg: 'bg-amber-400 text-zinc-950',
      borderAccent: 'border-amber-400',
      footerBg: 'bg-amber-400 text-zinc-950 border-t-4 border-amber-500',
      photoBorder: 'border-4 border-amber-400 shadow-xl'
    },
    'blue-yellow': {
      bg: 'bg-blue-950',
      text: 'text-white',
      topBannerBg: 'bg-amber-400 text-blue-950 border-b-4 border-amber-500',
      topBannerSub: 'text-blue-900 font-bold',
      driverBadge: 'bg-blue-950 text-amber-300 border-2 border-amber-400',
      card1Bg: 'bg-blue-900 text-white border-4 border-amber-400 shadow-2xl',
      card1TitleColor: 'text-amber-300',
      card1Badge: 'bg-amber-400 text-blue-950 border-2 border-amber-300',
      card1PhoneColor: 'text-amber-300',
      card1HighlightBg: 'bg-blue-950 border-2 border-amber-400/40 text-amber-200',
      card2Bg: 'bg-blue-900 text-white border-3 border-amber-400/50 shadow-lg',
      card3Bg: 'bg-blue-900 text-white border-3 border-amber-400/50 shadow-lg',
      cardHeaderBg: 'bg-blue-950 text-amber-300 border-b-2 border-amber-400/30',
      cardTitleColor: 'text-amber-300 font-black',
      cardIconBg: 'bg-amber-400 text-blue-950',
      borderAccent: 'border-amber-400',
      footerBg: 'bg-amber-400 text-blue-950 border-t-4 border-amber-500',
      photoBorder: 'border-4 border-amber-400 shadow-xl'
    },
    'red-black': {
      bg: 'bg-red-700',
      text: 'text-zinc-100',
      topBannerBg: 'bg-zinc-950 text-yellow-300 border-b-4 border-zinc-950',
      topBannerSub: 'text-yellow-200/90',
      driverBadge: 'bg-yellow-400 text-zinc-950 border-2 border-zinc-950',
      card1Bg: 'bg-zinc-950 text-white border-4 border-yellow-400 shadow-2xl',
      card1TitleColor: 'text-yellow-300',
      card1Badge: 'bg-yellow-400 text-zinc-950 border-2 border-yellow-300',
      card1PhoneColor: 'text-yellow-300',
      card1HighlightBg: 'bg-zinc-900 border-2 border-yellow-400/40 text-yellow-200',
      card2Bg: 'bg-zinc-950 text-white border-3 border-yellow-400/40 shadow-lg',
      card3Bg: 'bg-zinc-950 text-white border-3 border-yellow-400/40 shadow-lg',
      cardHeaderBg: 'bg-zinc-900 text-yellow-300 border-b-2 border-yellow-400/30',
      cardTitleColor: 'text-yellow-300 font-black',
      cardIconBg: 'bg-yellow-400 text-zinc-950',
      borderAccent: 'border-yellow-400',
      footerBg: 'bg-zinc-950 text-yellow-300 border-t-4 border-zinc-950',
      photoBorder: 'border-4 border-zinc-950 shadow-xl'
    },
    'print-grayscale': {
      bg: 'bg-white',
      text: 'text-black',
      topBannerBg: 'bg-black text-white border-b-4 border-black',
      topBannerSub: 'text-zinc-200 font-bold',
      driverBadge: 'bg-white text-black border-2 border-black font-black',
      card1Bg: 'bg-black text-white border-4 border-black shadow-none',
      card1TitleColor: 'text-white',
      card1Badge: 'bg-white text-black border-2 border-black font-black',
      card1PhoneColor: 'text-white',
      card1HighlightBg: 'bg-zinc-900 border-2 border-white/80 text-white',
      card2Bg: 'bg-white text-black border-3 border-black shadow-none',
      card3Bg: 'bg-white text-black border-3 border-black shadow-none',
      cardHeaderBg: 'bg-black text-white border-b-3 border-black',
      cardTitleColor: 'text-white font-black',
      cardIconBg: 'bg-white text-black',
      borderAccent: 'border-black',
      footerBg: 'bg-black text-white border-t-4 border-black',
      photoBorder: 'border-4 border-black shadow-none'
    }
  }[data.theme] || {
    bg: 'bg-white',
    text: 'text-zinc-950',
    topBannerBg: 'bg-zinc-950 text-white border-b-4 border-zinc-950',
    topBannerSub: 'text-zinc-300 font-bold',
    driverBadge: 'bg-zinc-100 text-zinc-950 border-2 border-zinc-950 font-black',
    card1Bg: 'bg-zinc-950 text-white border-4 border-zinc-950 shadow-xl',
    card1TitleColor: 'text-amber-400',
    card1Badge: 'bg-amber-400 text-zinc-950 border-2 border-amber-300 font-black',
    card1PhoneColor: 'text-amber-300',
    card1HighlightBg: 'bg-zinc-900 border-2 border-amber-400/40 text-amber-200',
    card2Bg: 'bg-zinc-50 text-zinc-950 border-3 border-zinc-950 shadow-md',
    card3Bg: 'bg-zinc-50 text-zinc-950 border-3 border-zinc-950 shadow-md',
    cardHeaderBg: 'bg-zinc-950 text-white border-b-2 border-zinc-950',
    cardTitleColor: 'text-white font-black',
    cardIconBg: 'bg-white text-zinc-950',
    borderAccent: 'border-zinc-950',
    footerBg: 'bg-zinc-950 text-white border-t-4 border-zinc-950',
    photoBorder: 'border-4 border-zinc-950 shadow-md'
  };

  // Font family mapping for imposing typography
  const fontClass = {
    anton: 'font-anton',
    bebas: 'font-bebas tracking-wider',
    archivo: 'font-archivo tracking-tight',
    oswald: 'font-oswald tracking-wide',
    montserrat: 'font-montserrat tracking-tight',
    rubik: 'font-rubik tracking-tight'
  }[data.fontFamily] || 'font-anton';

  // Format classes (ampliado para ocupar mais espaço na tela)
  const formatClasses = {
    vertical: 'w-full max-w-[600px] min-h-[860px]',
    square: 'w-full max-w-[600px] aspect-square',
    card: 'w-full max-w-[600px] min-h-[400px]'
  }[data.format];

  return (
    <div
      ref={ref}
      id="panfleto-caminhao-fretes"
      className={`${formatClasses} ${themeStyles.bg} ${themeStyles.text} rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between select-none relative transition-all duration-200 border-4 ${themeStyles.borderAccent} ${isGrayscalePreview ? 'grayscale contrast-125' : ''}`}
      style={{
        boxSizing: 'border-box'
      }}
    >
      {/* 1. TOPO: TÍTULO SUPER IMPONENTE COM SUPORTE A HTML */}
      <div className={`${themeStyles.topBannerBg} px-4 py-3.5 text-center`}>
        <div className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight ${fontClass}`}>
          <SafeHtml content={data.title || 'FRETES EM GERAL'} />
        </div>
        
        {data.subtitle && (
          <div className={`text-xs sm:text-sm font-black uppercase tracking-wider mt-1 ${themeStyles.topBannerSub}`}>
            <SafeHtml content={data.subtitle} />
          </div>
        )}
        
        {data.driverName && (
          <div className="mt-2 inline-flex items-center justify-center">
            <div className={`text-xs sm:text-sm font-black px-3.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 ${themeStyles.driverBadge}`}>
              <Truck className="w-3.5 h-3.5" />
              <SafeHtml content={data.driverName} />
            </div>
          </div>
        )}
      </div>

      {/* 2. CORPO PRINCIPAL COM FOTO DO CAMINHÃO E OS 3 CARDS MODERNIZADOS */}
      <div className="flex-1 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between gap-3.5">
        
        {/* FOTO ORIGINAL DO CAMINHÃO COM ALTO CONTRASTE */}
        <div className={`relative w-full rounded-xl overflow-hidden bg-black/30 ${themeStyles.photoBorder} min-h-[175px] max-h-[265px] flex items-center justify-center`}>
          {data.truckPhotoUrl ? (
            <img
              src={data.truckPhotoUrl}
              alt="Foto do Caminhão de Fretes"
              className="w-full h-full object-cover object-center"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="p-6 text-center font-black text-base opacity-70">
              [ FOTO DO CAMINHÃO ]
            </div>
          )}

          {data.vehicleType && (
            <div className="absolute bottom-2.5 left-2.5 bg-black text-white text-xs sm:text-sm font-black px-3 py-1 rounded-lg border-2 border-white shadow-xl flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-300" />
              <SafeHtml content={data.vehicleType} />
            </div>
          )}
        </div>

        {/* 🌟 CARD 1: MEGA BLOCO DE CONTATO & WHATSAPP (MODERNIZADO & ALTO CONTRASTE P/ P&B) */}
        <div className={`${themeStyles.card1Bg} rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all`}>
          
          {/* Header do Card 1: Badge Moderno com Ícone */}
          <div className="flex items-center justify-between mb-3 border-b-2 border-white/15 pb-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm ${themeStyles.card1Badge}`}>
              <Phone className="w-3.5 h-3.5" />
              <SafeHtml content={data.card1Title || 'LIGUE OU CHAME NO WHATSAPP'} />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-black uppercase tracking-tight opacity-90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Atendimento Rápido</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:gap-5">
            {/* Números de Telefone Grandes e Ultra Legíveis em P&B */}
            <div className="flex-1 text-center sm:text-left">
              <div className={`text-3xl sm:text-4xl md:text-5xl font-black leading-none ${fontClass} tracking-wide ${themeStyles.card1PhoneColor} drop-shadow`}>
                <SafeHtml content={data.phone || '(00) 00000-0000'} />
              </div>

              {data.phoneSecondary && (
                <div className="text-sm sm:text-base font-black mt-2 flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="bg-white/20 text-white text-[10px] uppercase font-black px-1.5 py-0.5 rounded">
                    2º Tel
                  </span>
                  <span className="opacity-95 font-bold">
                    <SafeHtml content={data.phoneSecondary} />
                  </span>
                </div>
              )}

              {data.card1Highlight && (
                <div className={`text-xs sm:text-xs font-black mt-2.5 px-2.5 py-1.5 rounded-lg text-center sm:text-left ${themeStyles.card1HighlightBg}`}>
                  <SafeHtml content={data.card1Highlight} />
                </div>
              )}
            </div>

            {/* QR Code de Alto Contraste (Fundo branco puro + borda preta sólida p/ leitura a laser) */}
            {data.showQrCode && qrCodeUrl && (
              <div className="bg-white p-2 rounded-xl border-3 border-black flex-shrink-0 flex flex-col items-center shadow-2xl">
                <img src={qrCodeUrl} alt="QR Code WhatsApp" className="w-18 h-18 sm:w-22 sm:h-22" />
                <span className="text-[10px] text-black font-black uppercase mt-1 tracking-tight leading-none bg-amber-400 px-1.5 py-0.5 rounded">
                  ESCANEIE AQUI
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 🌟 OS 2 CARDS A SEGUIR: SERVIÇOS + REGIÃO/PAGAMENTO (UMA LINHA POR ENTRADA DE TEXTO SEM QUEBRA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* CARD 2: SERVIÇOS DE FRETES */}
          <div className={`${themeStyles.card2Bg} rounded-xl overflow-hidden flex flex-col justify-start transition-all`}>
            {/* Header com barra de contraste */}
            <div className={`${themeStyles.cardHeaderBg} px-3.5 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`${themeStyles.cardIconBg} p-1 rounded-md flex items-center justify-center`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span className={`text-xs sm:text-sm ${themeStyles.cardTitleColor}`}>
                  <SafeHtml content={data.card2Title || 'SERVIÇOS DE FRETES'} />
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </div>

            {/* Conteúdo: Uma linha por item com suporte total a HTML */}
            <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-center">
              <CardListItems content={data.card2Content} />
            </div>
          </div>

          {/* CARD 3: REGIÃO & PAGAMENTO */}
          <div className={`${themeStyles.card3Bg} rounded-xl overflow-hidden flex flex-col justify-start transition-all`}>
            {/* Header com barra de contraste */}
            <div className={`${themeStyles.cardHeaderBg} px-3.5 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`${themeStyles.cardIconBg} p-1 rounded-md flex items-center justify-center`}>
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className={`text-xs sm:text-sm ${themeStyles.cardTitleColor}`}>
                  <SafeHtml content={data.card3Title || 'REGIÃO & PAGAMENTO'} />
                </span>
              </div>
              <CreditCard className="w-3.5 h-3.5 opacity-60" />
            </div>

            {/* Conteúdo: Uma linha por item com suporte total a HTML */}
            <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-center">
              <CardListItems content={data.card3Content} />
            </div>
          </div>

        </div>

      </div>

      {/* 3. RODAPÉ SUCINTO COM ALTO CONTRASTE */}
      {data.footerText && (
        <div className={`${themeStyles.footerBg} text-center py-2.5 px-3 text-xs sm:text-sm font-black tracking-wide`}>
          <SafeHtml content={data.footerText} />
        </div>
      )}
    </div>
  );
});

FlyerView.displayName = 'FlyerView';
