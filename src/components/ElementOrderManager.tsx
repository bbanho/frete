import React, { useState } from 'react';
import { FlyerElementKey } from '../types';
import { 
  GripVertical, 
  ArrowUp, 
  ArrowDown, 
  Type, 
  Truck, 
  Phone, 
  Layers, 
  AlignLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ElementOrderManagerProps {
  order: FlyerElementKey[];
  onChange: (newOrder: FlyerElementKey[]) => void;
}

interface ElementMeta {
  key: FlyerElementKey;
  label: string;
  desc: string;
  icon: React.ElementType;
  badge: string;
}

const ELEMENT_METAS: Record<FlyerElementKey, ElementMeta> = {
  header: {
    key: 'header',
    label: 'Título & Topo',
    desc: 'Título de Fretes, Subtítulo e Nome do Motorista',
    icon: Type,
    badge: 'Cabeçalho'
  },
  photo: {
    key: 'photo',
    label: 'Foto do Caminhão',
    desc: 'Imagem do caminhão e tipo de veículo',
    icon: Truck,
    badge: 'Foto'
  },
  card1: {
    key: 'card1',
    label: 'Card 1: Telefone & Contato',
    desc: 'Telefone Destaque Gigante, 2º Tel, QR Code e Urgência',
    icon: Phone,
    badge: 'Destaque'
  },
  servicesCards: {
    key: 'servicesCards',
    label: 'Cards 2 & 3: Serviços e Região',
    desc: 'Serviços de Fretes + Região e Formas de Pagamento',
    icon: Layers,
    badge: '2 Cards'
  },
  footer: {
    key: 'footer',
    label: 'Rodapé',
    desc: 'Frase de fechamento e segurança',
    icon: AlignLeft,
    badge: 'Final'
  }
};

export function ElementOrderManager({ order, onChange }: ElementOrderManagerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  // Garantir que todas as 5 chaves existam na ordem
  const currentOrder: FlyerElementKey[] = order && order.length === 5 
    ? order 
    : ['header', 'photo', 'card1', 'servicesCards', 'footer'];

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDropTargetIndex(null);
      return;
    }

    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, moved);

    onChange(newOrder);
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[target];
    newOrder[target] = temp;

    onChange(newOrder);
  };

  const applyPreset = (presetOrder: FlyerElementKey[]) => {
    onChange(presetOrder);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-zinc-200">
            Arraste com o Mouse para Reordenar os Elementos
          </span>
        </div>
        <button
          type="button"
          onClick={() => applyPreset(['header', 'photo', 'card1', 'servicesCards', 'footer'])}
          className="text-[10px] text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
          title="Restaurar ordem original"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restaurar</span>
        </button>
      </div>

      <p className="text-[11px] text-zinc-400 leading-tight">
        Clique e arraste qualquer bloco para mudar sua posição visual no panfleto (ex: colocar o Telefone antes da Foto ou no Topo).
      </p>

      {/* Lista de Blocos Arrastáveis com o Mouse */}
      <div className="space-y-1.5">
        {currentOrder.map((key, index) => {
          const meta = ELEMENT_METAS[key] || ELEMENT_METAS.header;
          const Icon = meta.icon;
          const isDragging = draggedIndex === index;
          const isTarget = dropTargetIndex === index && draggedIndex !== index;

          return (
            <div
              key={key}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all select-none cursor-grab active:cursor-grabbing ${
                isDragging
                  ? 'opacity-40 border-amber-400 bg-amber-400/10 scale-98 ring-2 ring-amber-400/50'
                  : isTarget
                  ? 'border-amber-400 bg-amber-400/20 ring-2 ring-amber-400 shadow-md translate-y-0.5'
                  : 'border-zinc-800 bg-zinc-900/90 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200'
              }`}
            >
              {/* Lado Esquerdo: Grip + Posição + Ícone + Nome */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="text-zinc-500 hover:text-amber-400 flex-shrink-0">
                  <GripVertical className="w-4 h-4" />
                </div>

                <span className="w-5 h-5 rounded-full bg-zinc-800 text-amber-400 text-[10px] font-black flex items-center justify-center flex-shrink-0 border border-zinc-700">
                  {index + 1}
                </span>

                <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0 text-amber-400">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-100 truncate">
                      {meta.label}
                    </span>
                    <span className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.2 rounded font-medium">
                      {meta.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 truncate">
                    {meta.desc}
                  </div>
                </div>
              </div>

              {/* Lado Direito: Botões de Seta para ajuste fino */}
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveItem(index, 'up');
                  }}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Subir elemento"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={index === currentOrder.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveItem(index, 'down');
                  }}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  title="Descer elemento"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Presets Rápidos de Disposição */}
      <div className="pt-1">
        <div className="flex items-center gap-1 text-[10px] text-zinc-400 mb-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Disposições Prontas em 1 Clique:</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => applyPreset(['header', 'photo', 'card1', 'servicesCards', 'footer'])}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-1.5 rounded text-left transition-colors truncate"
          >
            1. Padrão (Título &gt; Foto &gt; Tel)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['card1', 'header', 'photo', 'servicesCards', 'footer'])}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-1.5 rounded text-left transition-colors truncate"
          >
            2. Telefone no Topo (Urgente)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['photo', 'header', 'card1', 'servicesCards', 'footer'])}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-1.5 rounded text-left transition-colors truncate"
          >
            3. Foto no Topo (Visual)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(['header', 'servicesCards', 'card1', 'photo', 'footer'])}
            className="text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 p-1.5 rounded text-left transition-colors truncate"
          >
            4. Serviços Antes do Contato
          </button>
        </div>
      </div>
    </div>
  );
}
