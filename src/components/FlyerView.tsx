import React, { forwardRef } from 'react';
import { FlyerData } from '../types';
import { Phone, MessageSquare } from 'lucide-react';

interface FlyerViewProps {
  data: FlyerData;
  qrCodeUrl?: string;
  isCompact?: boolean;
}

export const FlyerView = forwardRef<HTMLDivElement, FlyerViewProps>(({ data, qrCodeUrl, isCompact }, ref) => {
  // Theme color styles prioritizing maximum contrast and readability without heavy graphics
  const themeStyles = {
    'yellow-black': {
      bg: 'bg-amber-400',
      text: 'text-zinc-950',
      topBannerBg: 'bg-zinc-950 text-amber-400',
      phoneCardBg: 'bg-zinc-950 text-amber-300 border-4 border-zinc-900',
      badgeBg: 'bg-zinc-900 text-white',
      accentBg: 'bg-zinc-950 text-white',
      borderAccent: 'border-zinc-950'
    },
    'blue-white': {
      bg: 'bg-white',
      text: 'text-slate-900',
      topBannerBg: 'bg-blue-900 text-white',
      phoneCardBg: 'bg-blue-900 text-yellow-300 border-4 border-blue-950',
      badgeBg: 'bg-blue-800 text-white',
      accentBg: 'bg-blue-950 text-white',
      borderAccent: 'border-blue-900'
    },
    'clean-light': {
      bg: 'bg-zinc-50',
      text: 'text-zinc-900',
      topBannerBg: 'bg-zinc-900 text-white',
      phoneCardBg: 'bg-emerald-700 text-white border-4 border-emerald-900',
      badgeBg: 'bg-zinc-800 text-white',
      accentBg: 'bg-zinc-900 text-white',
      borderAccent: 'border-zinc-800'
    },
    'dark-contrast': {
      bg: 'bg-zinc-900',
      text: 'text-zinc-50',
      topBannerBg: 'bg-amber-400 text-zinc-950',
      phoneCardBg: 'bg-amber-400 text-zinc-950 border-4 border-amber-300',
      badgeBg: 'bg-zinc-800 text-zinc-100 border border-zinc-700',
      accentBg: 'bg-zinc-800 text-zinc-100',
      borderAccent: 'border-amber-400'
    }
  }[data.theme] || {
    bg: 'bg-amber-400',
    text: 'text-zinc-950',
    topBannerBg: 'bg-zinc-950 text-amber-400',
    phoneCardBg: 'bg-zinc-950 text-amber-300 border-4 border-zinc-900',
    badgeBg: 'bg-zinc-900 text-white',
    accentBg: 'bg-zinc-950 text-white',
    borderAccent: 'border-zinc-950'
  };

  // Format sizing
  const formatClasses = {
    vertical: 'w-full max-w-[480px] min-h-[640px] aspect-[1/1.414]', // A4 ratio
    square: 'w-full max-w-[480px] aspect-square',
    card: 'w-full max-w-[500px] min-h-[290px] aspect-[1.75/1]'
  }[data.format];

  return (
    <div
      ref={ref}
      id="panfleto-caminhao-fretes"
      className={`${formatClasses} ${themeStyles.bg} ${themeStyles.text} rounded-xl shadow-2xl overflow-hidden flex flex-col justify-between select-none relative transition-all duration-200`}
      style={{
        boxSizing: 'border-box',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* 1. TOPO: TÍTULO SUCINTO DE ALTO IMPACTO */}
      <div className={`${themeStyles.topBannerBg} px-4 py-3 text-center tracking-tight`}>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide font-oswald leading-tight">
          {data.title || 'FRETES EM GERAL'}
        </h1>
        {data.driverName && (
          <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-normal mt-0.5">
            {data.driverName} • {data.vehicleType}
          </p>
        )}
      </div>

      {/* 2. CORPO: FOTO DO CAMINHÃO + INFORMAÇÕES SUCINTAS */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-3">
        {/* Foto Original do Caminhão */}
        <div className="relative w-full rounded-lg overflow-hidden bg-black/10 border-2 border-black/20 flex-1 min-h-[140px] max-h-[220px] flex items-center justify-center">
          {data.truckPhotoUrl ? (
            <img
              src={data.truckPhotoUrl}
              alt="Foto do Caminhão de Fretes"
              className="w-full h-full object-cover object-center"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="p-4 text-center font-bold text-sm opacity-60">
              [ Foto do Caminhão ]
            </div>
          )}
          {data.vehicleType && (
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[11px] font-bold px-2 py-1 rounded">
              {data.vehicleType}
            </div>
          )}
        </div>

        {/* Resumo Sucinto dos Serviços e Região */}
        <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm font-medium">
          {data.servicesSummary && (
            <div className="bg-black/5 p-2 rounded border border-black/10">
              <div className="font-bold uppercase text-[11px] tracking-wider opacity-75 mb-1">
                Serviços Realizados:
              </div>
              <div className="whitespace-pre-line font-bold leading-snug">
                {data.servicesSummary}
              </div>
            </div>
          )}

          {data.coverageArea && (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold opacity-90 px-1">
              <span>📍 Região:</span>
              <span>{data.coverageArea}</span>
            </div>
          )}
        </div>

        {/* 3. BLOCO DE CONTATO EM MÁXIMO DESTAQUE (TELEFONE / WHATSAPP) */}
        <div className={`${themeStyles.phoneCardBg} rounded-xl p-3 sm:p-4 text-center shadow-md flex items-center justify-between gap-3`}>
          <div className="flex-1 text-center">
            <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider mb-0.5 opacity-90 flex items-center justify-center gap-1">
              <Phone className="w-3.5 h-3.5 inline" />
              Ligue ou Chame no WhatsApp
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black font-oswald tracking-wider leading-none py-0.5">
              {data.phone || '(00) 00000-0000'}
            </div>
            {data.phoneSecondary && (
              <div className="text-xs sm:text-sm font-bold opacity-80 mt-0.5">
                Tel. Alternativo: {data.phoneSecondary}
              </div>
            )}
            {data.paymentInfo && (
              <div className="text-[10px] sm:text-[11px] font-semibold opacity-75 mt-1 border-t border-white/20 pt-1">
                Pagamento: {data.paymentInfo}
              </div>
            )}
          </div>

          {/* QR Code opcional para escanear direto */}
          {data.showQrCode && qrCodeUrl && (
            <div className="bg-white p-1 rounded-lg border border-black/20 flex-shrink-0 flex flex-col items-center">
              <img src={qrCodeUrl} alt="QR Code WhatsApp" className="w-14 h-14 sm:w-16 sm:h-16" />
              <span className="text-[8px] text-zinc-800 font-bold uppercase mt-0.5">WhatsApp</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. RODAPÉ SUCINTO */}
      <div className="text-center py-1.5 px-3 bg-black/10 text-[10px] font-semibold opacity-80 border-t border-black/10">
        Orçamento rápido sem compromisso • Pontualidade e Segurança
      </div>
    </div>
  );
});

FlyerView.displayName = 'FlyerView';
