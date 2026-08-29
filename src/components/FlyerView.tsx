import React, { forwardRef, useState } from 'react';
import { FlyerData, FlyerElementKey } from '../types';
import { SafeHtml } from './SafeHtml';
import { 
  Phone, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight, 
  GripVertical,
  Scissors,
  Mountain
} from 'lucide-react';

interface FlyerViewProps {
  data: FlyerData;
  qrCodeUrl?: string;
  isGrayscalePreview?: boolean;
  onReorderElements?: (newOrder: FlyerElementKey[]) => void;
  onSelectElement?: (key: FlyerElementKey) => void; // Seleciona objeto no editor
  selectedElement?: FlyerElementKey | null; // Objeto atualmente selecionado (destaque)
  isSheetDuplicate?: boolean; // Se é uma cópia secundária em folha dupla/4-up
}

/**
 * Componente que renderiza cada entrada de texto da lista em exatamente UMA LINHA,
 * ajustando tamanho e espaçamento para não quebrar linha.
 */
function CardListItems({ content, isCompact = false }: { content: string; isCompact?: boolean }) {
  if (!content) return null;

  const items = content
    .split(/<br\s*\/?>|\n/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  if (items.length === 0) return null;

  return (
    <div className={`flex flex-col ${isCompact ? 'gap-0.5' : 'gap-1.5'} w-full py-0.5`}>
      {items.map((item, idx) => {
        let cleaned = item;
        if (cleaned.startsWith('•') || cleaned.startsWith('-') || cleaned.startsWith('✔') || cleaned.startsWith('*')) {
          cleaned = cleaned.substring(1).trim();
        }

        return (
          <div
            key={idx}
            className={`flex items-center gap-1.5 w-full min-w-0 ${
              isCompact ? 'text-[9.5px] sm:text-[10.5px]' : 'text-[11px] sm:text-[12px] md:text-[12.5px]'
            } leading-tight font-medium`}
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

/**
 * Componente base de um único panfleto (Single Flyer), com suporte a reordenação por drag and drop
 */
export const SingleFlyer = forwardRef<HTMLDivElement, FlyerViewProps>(({
  data,
  qrCodeUrl,
  isGrayscalePreview = false,
  onReorderElements,
  onSelectElement,
  selectedElement
}, ref) => {
  const [draggedKey, setDraggedKey] = useState<FlyerElementKey | null>(null);
  const [targetKey, setTargetKey] = useState<FlyerElementKey | null>(null);

  // Ordem dos elementos
  const currentOrder: FlyerElementKey[] = data.elementOrder && data.elementOrder.length === 5
    ? data.elementOrder
    : ['header', 'photo', 'card1', 'servicesCards', 'footer'];

  // Handlers para arrastar com o mouse diretamente no panfleto
  const handleDragStart = (e: React.DragEvent, key: FlyerElementKey) => {
    e.dataTransfer.setData('text/plain', key);
    setDraggedKey(key);
  };

  const handleDragOver = (e: React.DragEvent, key: FlyerElementKey) => {
    e.preventDefault();
    if (targetKey !== key) {
      setTargetKey(key);
    }
  };

  const handleDrop = (e: React.DragEvent, dropKey: FlyerElementKey) => {
    e.preventDefault();
    if (!draggedKey || draggedKey === dropKey || !onReorderElements) {
      setDraggedKey(null);
      setTargetKey(null);
      return;
    }

    const newOrder = [...currentOrder];
    const draggedIdx = newOrder.indexOf(draggedKey);
    const targetIdx = newOrder.indexOf(dropKey);

    if (draggedIdx !== -1 && targetIdx !== -1) {
      const [moved] = newOrder.splice(draggedIdx, 1);
      newOrder.splice(targetIdx, 0, moved);
      onReorderElements(newOrder);
    }

    setDraggedKey(null);
    setTargetKey(null);
  };

  const handleDragEnd = () => {
    setDraggedKey(null);
    setTargetKey(null);
  };

  // Seleciona o elemento no editor ao clicar no bloco (tempo real)
  const handleSelect = (key: FlyerElementKey) => {
    if (onSelectElement) onSelectElement(key);
  };

  // Classes de destaque quando o elemento está selecionado
  const selectionHighlight = (key: FlyerElementKey) =>
    selectedElement === key
      ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-transparent cursor-pointer'
      : 'cursor-pointer hover:ring-1 hover:ring-amber-400/30';

  // Configurações de temas com modelos de fundo branco e alto contraste
  const themeStyles = {
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

  const fontClass = {
    anton: 'font-anton',
    bebas: 'font-bebas tracking-wider',
    archivo: 'font-archivo tracking-tight',
    oswald: 'font-oswald tracking-wide',
    montserrat: 'font-montserrat tracking-tight',
    rubik: 'font-rubik tracking-tight'
  }[data.fontFamily] || 'font-anton';

  // Dimensionamento por formato
  const isLandscape = data.format === 'landscape';
  const isSquare = data.format === 'square';
  const isCard = data.format === 'card';
  const isDoubleA5 = data.format === 'double-a5';
  const is4Up = data.format === '4-up';

  const formatContainerClass = {
    vertical: 'w-full max-w-[620px] min-h-[880px]',
    'double-a5': 'w-full min-h-[440px]',
    '4-up': 'w-full min-h-[380px]',
    square: 'w-full max-w-[620px] aspect-square',
    landscape: 'w-full max-w-[860px] min-h-[520px]',
    card: 'w-full max-w-[620px] min-h-[380px]'
  }[data.format];

  // Renderizadores de cada um dos 5 blocos do panfleto
  const renderHeader = () => (
    <div
      key="header"
      draggable={!!onReorderElements}
      onDragStart={(e) => handleDragStart(e, 'header')}
      onDragOver={(e) => handleDragOver(e, 'header')}
      onDrop={(e) => handleDrop(e, 'header')}
      onDragEnd={handleDragEnd}
      onClick={() => handleSelect('header')}
      className={`group relative ${themeStyles.topBannerBg} px-3.5 py-2.5 sm:py-3.5 text-center transition-all ${
        draggedKey === 'header' ? 'opacity-30' : ''
      } ${targetKey === 'header' ? 'ring-4 ring-amber-400' : ''} ${selectionHighlight('header')}`}
    >
      {onReorderElements && (
        <div className="no-print absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 text-amber-300 p-1 rounded cursor-grab active:cursor-grabbing text-[10px] flex items-center gap-1 transition-opacity">
          <GripVertical className="w-3.5 h-3.5" />
          <span>Arrastar Bloco</span>
        </div>
      )}

      <div className={`${
        isLandscape || isCard ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'
      } font-black uppercase leading-tight ${fontClass}`}>
        <SafeHtml content={data.title || 'FRETES EM GERAL'} />
      </div>
      
      {data.subtitle && (
        <div className={`text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wider mt-1 ${themeStyles.topBannerSub}`}>
          <SafeHtml content={data.subtitle} />
        </div>
      )}
      
      {data.driverName && (
        <div className="mt-1.5 inline-flex items-center justify-center">
          <div className={`text-[11px] sm:text-xs font-black px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 ${themeStyles.driverBadge}`}>
            <Truck className="w-3.5 h-3.5" />
            <SafeHtml content={data.driverName} />
          </div>
        </div>
      )}
    </div>
  );

  const renderPhoto = () => (
    <div
      key="photo"
      draggable={!!onReorderElements}
      onDragStart={(e) => handleDragStart(e, 'photo')}
      onDragOver={(e) => handleDragOver(e, 'photo')}
      onDrop={(e) => handleDrop(e, 'photo')}
      onDragEnd={handleDragEnd}
      onClick={() => handleSelect('photo')}
      className={`group relative w-full rounded-xl overflow-hidden bg-black/30 ${themeStyles.photoBorder} ${
        isLandscape || isCard ? 'min-h-[130px] max-h-[170px]' : is4Up || isDoubleA5 ? 'min-h-[130px] max-h-[180px]' : 'min-h-[170px] max-h-[260px]'
      } flex items-center justify-center transition-all ${
        draggedKey === 'photo' ? 'opacity-30' : ''
      } ${targetKey === 'photo' ? 'ring-4 ring-amber-400' : ''} ${selectionHighlight('photo')}`}
    >
      {onReorderElements && (
        <div className="no-print absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 bg-black/70 text-amber-300 p-1 rounded cursor-grab active:cursor-grabbing text-[10px] flex items-center gap-1 transition-opacity">
          <GripVertical className="w-3.5 h-3.5" />
          <span>Arrastar Foto</span>
        </div>
      )}

      {data.truckPhotoUrl ? (
        <img
          src={data.truckPhotoUrl}
          alt="Foto do Caminhão de Fretes"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          style={{
            transform: `translate(${data.imagePosition?.x || 0}%, ${data.imagePosition?.y || 0}%) scale(${data.imagePosition?.scale || 1}) rotate(${data.imagePosition?.rotation || 0}deg)`,
            transformOrigin: 'center center'
          }}
        />
      ) : (
        <div className="p-6 text-center font-black text-base opacity-70">
          [ FOTO DO CAMINHÃO ]
        </div>
      )}

      {data.vehicleType && (
        <div className="absolute bottom-2 left-2 bg-black text-white text-[11px] sm:text-xs md:text-sm font-black px-2.5 py-0.5 rounded-lg border-2 border-white shadow-xl flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-300" />
          <SafeHtml content={data.vehicleType} />
        </div>
      )}

      {/* Indicador de contexto para vista "Curva na Serra" - contempla características */}
      {data.truckViewPreset === 'curve-mountain' && (
        <div className="absolute top-2 left-2 bg-black/70 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-lg border border-amber-400/50 shadow-lg flex items-center gap-1.5">
          <Mountain className="w-3.5 h-3.5" />
          <span>SUBINDO A SERRA • BAU {data.vehicleType ? 'DESTAQUE' : ''}</span>
        </div>
      )}
    </div>
  );

  const renderCard1 = () => (
    <div
      key="card1"
      draggable={!!onReorderElements}
      onDragStart={(e) => handleDragStart(e, 'card1')}
      onDragOver={(e) => handleDragOver(e, 'card1')}
      onDrop={(e) => handleDrop(e, 'card1')}
      onDragEnd={handleDragEnd}
      onClick={() => handleSelect('card1')}
      className={`group relative ${themeStyles.card1Bg} rounded-2xl p-3.5 sm:p-4.5 overflow-hidden transition-all ${
        draggedKey === 'card1' ? 'opacity-30' : ''
      } ${targetKey === 'card1' ? 'ring-4 ring-amber-400' : ''} ${selectionHighlight('card1')}`}
    >
      {onReorderElements && (
        <div className="no-print absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 text-amber-300 p-1 rounded cursor-grab active:cursor-grabbing text-[10px] flex items-center gap-1 transition-opacity">
          <GripVertical className="w-3.5 h-3.5" />
          <span>Arrastar Card</span>
        </div>
      )}

      {/* Header do Card 1: Badge Moderno com Ícone */}
      <div className="flex items-center justify-between mb-2.5 border-b-2 border-white/15 pb-2">
        <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm ${themeStyles.card1Badge}`}>
          <Phone className="w-3 h-3" />
          <SafeHtml content={data.card1Title || 'LIGUE OU CHAME NO WHATSAPP'} />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-tight opacity-90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Atendimento 24h</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Números de Telefone Grandes */}
        <div className="flex-1 text-center sm:text-left">
          <div className={`${
            isLandscape || isCard ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'
          } font-black leading-none ${fontClass} tracking-wide ${themeStyles.card1PhoneColor} drop-shadow`}>
            <SafeHtml content={data.phone || '(00) 00000-0000'} />
          </div>

          {data.phoneSecondary && (
            <div className="text-xs sm:text-sm font-black mt-1.5 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="bg-white/20 text-white text-[9px] uppercase font-black px-1 py-0.2 rounded">
                2º Tel
              </span>
              <span className="opacity-95 font-bold">
                <SafeHtml content={data.phoneSecondary} />
              </span>
            </div>
          )}

          {data.card1Highlight && (
            <div className={`text-[10.5px] sm:text-xs font-black mt-2 px-2 py-1 rounded-lg text-center sm:text-left ${themeStyles.card1HighlightBg}`}>
              <SafeHtml content={data.card1Highlight} />
            </div>
          )}
        </div>

        {/* QR Code de Alto Contraste */}
        {data.showQrCode && qrCodeUrl && (
          <div className="bg-white p-1.5 sm:p-2 rounded-xl border-2 sm:border-3 border-black flex-shrink-0 flex flex-col items-center shadow-xl">
            <img 
              src={qrCodeUrl} 
              alt="QR Code WhatsApp" 
              className={`${isLandscape || isCard ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16 sm:w-20 sm:h-20'}`} 
            />
            <span className="text-[9px] text-black font-black uppercase mt-0.5 tracking-tight leading-none bg-amber-400 px-1 py-0.5 rounded">
              WHATSAPP
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderServicesCards = () => (
    <div
      key="servicesCards"
      draggable={!!onReorderElements}
      onDragStart={(e) => handleDragStart(e, 'servicesCards')}
      onDragOver={(e) => handleDragOver(e, 'servicesCards')}
      onDrop={(e) => handleDrop(e, 'servicesCards')}
      onDragEnd={handleDragEnd}
      onClick={() => handleSelect('servicesCards')}
      className={`group relative grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 transition-all ${
        draggedKey === 'servicesCards' ? 'opacity-30' : ''
      } ${targetKey === 'servicesCards' ? 'ring-4 ring-amber-400 rounded-xl' : ''} ${selectionHighlight('servicesCards')}`}
    >
      {onReorderElements && (
        <div className="no-print absolute -top-3 right-2 z-10 opacity-0 group-hover:opacity-100 bg-black/70 text-amber-300 p-1 rounded cursor-grab active:cursor-grabbing text-[10px] flex items-center gap-1 transition-opacity">
          <GripVertical className="w-3.5 h-3.5" />
          <span>Arrastar Serviços</span>
        </div>
      )}

      {/* CARD 2: SERVIÇOS */}
      <div className={`${themeStyles.card2Bg} rounded-xl overflow-hidden flex flex-col justify-start transition-all`}>
        <div className={`${themeStyles.cardHeaderBg} px-3 py-1.5 sm:py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-1.5">
            <span className={`${themeStyles.cardIconBg} p-1 rounded flex items-center justify-center`}>
              <ShieldCheck className="w-3 h-3" />
            </span>
            <span className={`text-[11px] sm:text-xs md:text-sm font-black ${themeStyles.cardTitleColor}`}>
              <SafeHtml content={data.card2Title || 'SERVIÇOS DE FRETES'} />
            </span>
          </div>
          <ChevronRight className="w-3 h-3 opacity-60" />
        </div>

        <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-center">
          <CardListItems content={data.card2Content} isCompact={isLandscape || isCard || is4Up} />
        </div>
      </div>

      {/* CARD 3: REGIÃO & PAGAMENTO */}
      <div className={`${themeStyles.card3Bg} rounded-xl overflow-hidden flex flex-col justify-start transition-all`}>
        <div className={`${themeStyles.cardHeaderBg} px-3 py-1.5 sm:py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-1.5">
            <span className={`${themeStyles.cardIconBg} p-1 rounded flex items-center justify-center`}>
              <MapPin className="w-3 h-3" />
            </span>
            <span className={`text-[11px] sm:text-xs md:text-sm font-black ${themeStyles.cardTitleColor}`}>
              <SafeHtml content={data.card3Title || 'REGIÃO & PAGAMENTO'} />
            </span>
          </div>
          <CreditCard className="w-3 h-3 opacity-60" />
        </div>

        <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-center">
          <CardListItems content={data.card3Content} isCompact={isLandscape || isCard || is4Up} />
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    data.footerText ? (
      <div
        key="footer"
        draggable={!!onReorderElements}
        onDragStart={(e) => handleDragStart(e, 'footer')}
        onDragOver={(e) => handleDragOver(e, 'footer')}
        onDrop={(e) => handleDrop(e, 'footer')}
        onDragEnd={handleDragEnd}
        onClick={() => handleSelect('footer')}
        className={`group relative ${themeStyles.footerBg} text-center py-2 px-3 text-[11px] sm:text-xs md:text-sm font-black tracking-wide transition-all ${
          draggedKey === 'footer' ? 'opacity-30' : ''
        } ${targetKey === 'footer' ? 'ring-4 ring-amber-400' : ''} ${selectionHighlight('footer')}`}
      >
        {onReorderElements && (
          <div className="no-print absolute top-1 right-2 opacity-0 group-hover:opacity-100 bg-black/70 text-amber-300 p-1 rounded cursor-grab active:cursor-grabbing text-[10px] flex items-center gap-1 transition-opacity">
            <GripVertical className="w-3 h-3" />
            <span>Arrastar Rodapé</span>
          </div>
        )}
        <SafeHtml content={data.footerText} />
      </div>
    ) : null
  );

  // Mapeamento dos renderizadores
  const elementRenderers: Record<FlyerElementKey, () => React.ReactNode> = {
    header: renderHeader,
    photo: renderPhoto,
    card1: renderCard1,
    servicesCards: renderServicesCards,
    footer: renderFooter
  };

  // Separação de elementos topo/rodapé vs miolo caso seja o layout padrão, ou renderização sequencial
  const hasCustomOrder = currentOrder.length === 5;

  return (
    <div
      ref={ref}
      className={`${formatContainerClass} ${themeStyles.bg} ${themeStyles.text} rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between select-none relative transition-all duration-200 border-4 ${themeStyles.borderAccent} ${
        isGrayscalePreview ? 'grayscale contrast-125' : ''
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Renderização sequencial segundo elementOrder */}
      {hasCustomOrder ? (
        <div className="flex-1 flex flex-col justify-between">
          {currentOrder.map((key, index) => {
            const renderer = elementRenderers[key];
            if (!renderer) return null;

            // Se for bloco intermediário (não cabeçalho nem rodapé), adicionamos container de padding
            const isMiddle = key !== 'header' && key !== 'footer';

            return isMiddle ? (
              <div key={key} className="px-3 sm:px-4 py-1.5 sm:py-2">
                {renderer()}
              </div>
            ) : (
              <React.Fragment key={key}>
                {renderer()}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <>
          {renderHeader()}
          <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between gap-3">
            {renderPhoto()}
            {renderCard1()}
            {renderServicesCards()}
          </div>
          {renderFooter()}
        </>
      )}
    </div>
  );
});

SingleFlyer.displayName = 'SingleFlyer';

/**
 * FlyerView principal: gerencia layouts de página única, Folha Dupla (2 por A4) e 4 por Folha (4-up)
 */
export const FlyerView = forwardRef<HTMLDivElement, FlyerViewProps>((props, ref) => {
  const { data, isGrayscalePreview } = props;

  // 1. FOLHA DUPLA (2 por Folha A4 / A5 com linha de corte)
  if (data.format === 'double-a5') {
    return (
      <div
        ref={ref}
        id="panfleto-caminhao-fretes"
        className={`w-full max-w-[620px] bg-white text-zinc-950 p-2 sm:p-3 rounded-2xl shadow-2xl border-2 border-zinc-300 flex flex-col gap-3 ${
          isGrayscalePreview ? 'grayscale contrast-125' : ''
        }`}
      >
        {/* 1º Panfleto da Folha */}
        <div className="w-full">
          <SingleFlyer {...props} isSheetDuplicate={false} />
        </div>

        {/* Linha de Corte Tracejada */}
        <div className="w-full flex items-center justify-center gap-2 py-1 border-t-2 border-dashed border-zinc-400 text-zinc-500 font-bold text-[11px] select-none">
          <Scissors className="w-3.5 h-3.5" />
          <span>CORTE AQUI (2 PANFLETOS POR FOLHA A4)</span>
          <Scissors className="w-3.5 h-3.5 transform -scale-x-100" />
        </div>

        {/* 2º Panfleto da Folha (Cópia Exata) */}
        <div className="w-full">
          <SingleFlyer {...props} isSheetDuplicate={true} />
        </div>
      </div>
    );
  }

  // 2. 4 POR FOLHA (4-up / Mini Panfletos com 4 cópias e linhas de corte)
  if (data.format === '4-up') {
    return (
      <div
        ref={ref}
        id="panfleto-caminhao-fretes"
        className={`w-full max-w-[720px] bg-white text-zinc-950 p-2 sm:p-3 rounded-2xl shadow-2xl border-2 border-zinc-300 flex flex-col gap-2 ${
          isGrayscalePreview ? 'grayscale contrast-125' : ''
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          <SingleFlyer {...props} isSheetDuplicate={false} />
          <SingleFlyer {...props} isSheetDuplicate={true} />
        </div>

        <div className="w-full flex items-center justify-center gap-2 py-0.5 border-t-2 border-dashed border-zinc-400 text-zinc-500 font-bold text-[10px] select-none">
          <Scissors className="w-3 h-3" />
          <span>LINHA DE CORTE HORIZONTAL & VERTICAL (4 POR FOLHA A4)</span>
          <Scissors className="w-3 h-3 transform -scale-x-100" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SingleFlyer {...props} isSheetDuplicate={true} />
          <SingleFlyer {...props} isSheetDuplicate={true} />
        </div>
      </div>
    );
  }

  // 3. FORMATO INDIVIDUAL (Vertical A4, Quadrado 1:1, Paisagem Horizontal ou Cartão)
  return (
    <div id="panfleto-caminhao-fretes" className="w-full flex justify-center">
      <SingleFlyer ref={ref} {...props} />
    </div>
  );
});

FlyerView.displayName = 'FlyerView';
