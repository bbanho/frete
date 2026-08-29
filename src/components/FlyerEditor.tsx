import React, { useRef } from 'react';
import { FlyerData, FlyerTheme, FlyerFormat, ImposingFont, FlyerElementKey } from '../types';
import { TRUCK_PRESETS } from '../data/defaults';
import { formatPhoneMask } from '../utils/flyerHelpers';
import { ElementOrderManager } from './ElementOrderManager';
import { 
  Phone, 
  Truck, 
  Palette, 
  QrCode, 
  Upload, 
  Type, 
  Layers, 
  CheckCircle2,
  Code2,
  Heading,
  Sun,
  Printer,
  Sparkles,
  Scissors,
  GripVertical
} from 'lucide-react';

interface FlyerEditorProps {
  data: FlyerData;
  onChange: (updated: Partial<FlyerData>) => void;
}

export function FlyerEditor({ data, onChange }: FlyerEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneMask(e.target.value);
    onChange({ phone: formatted });
  };

  const handleSecondaryPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneMask(e.target.value);
    onChange({ phoneSecondary: formatted });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({ truckPhotoUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to insert quick HTML tag into an input or textarea
  const insertHtmlTag = (field: keyof FlyerData, openTag: string, closeTag: string = '') => {
    const currentVal = (data[field] as string) || '';
    onChange({ [field]: `${currentVal}${openTag}${closeTag}` });
  };

  const fonts: { id: ImposingFont; name: string; previewClass: string; desc: string }[] = [
    { id: 'anton', name: 'Anton Heavy', previewClass: 'font-anton', desc: 'Padrão Pôster & Outdoor Impactante' },
    { id: 'bebas', name: 'Bebas Neue', previewClass: 'font-bebas', desc: 'Condensada Clássica Comercial' },
    { id: 'archivo', name: 'Archivo Black', previewClass: 'font-archivo', desc: 'Maciça e Ultra Legível' },
    { id: 'oswald', name: 'Oswald Bold', previewClass: 'font-oswald', desc: 'Moderna e Imponente' },
    { id: 'montserrat', name: 'Montserrat Black', previewClass: 'font-montserrat', desc: 'Geométrica Pesada' },
    { id: 'rubik', name: 'Rubik Black', previewClass: 'font-rubik', desc: 'Robusta e Arredondada' }
  ];

  const whiteThemes: { id: FlyerTheme; name: string; bg: string; text: string; tag: string }[] = [
    { id: 'clean-white', name: 'Branco & Preto Contraste', bg: 'bg-white', text: 'text-black', tag: 'Clássico' },
    { id: 'white-blue', name: 'Branco & Azul Royal', bg: 'bg-white', text: 'text-blue-900', tag: 'Transportes' },
    { id: 'white-red', name: 'Branco & Vermelho', bg: 'bg-white', text: 'text-red-700', tag: 'Destaque' },
    { id: 'white-emerald', name: 'Branco & Verde Esmeralda', bg: 'bg-white', text: 'text-emerald-800', tag: 'Confiança' },
    { id: 'white-amber', name: 'Branco & Âmbar Asfalto', bg: 'bg-white', text: 'text-amber-600', tag: 'Rodoviário' },
    { id: 'white-minimal', name: 'Branco Minimalista Laser', bg: 'bg-white', text: 'text-black', tag: 'Econômico' }
  ];

  const otherThemes: { id: FlyerTheme; name: string; bg: string; text: string; tag: string }[] = [
    { id: 'yellow-black', name: 'Amarelo & Preto Impacto', bg: 'bg-amber-400', text: 'text-zinc-950', tag: 'Alta Visibilidade' },
    { id: 'black-gold', name: 'Preto & Ouro Neon', bg: 'bg-zinc-950', text: 'text-amber-400', tag: 'Premium' },
    { id: 'blue-yellow', name: 'Azul & Amarelo', bg: 'bg-blue-950', text: 'text-amber-400', tag: 'Comercial' },
    { id: 'red-black', name: 'Vermelho & Preto', bg: 'bg-red-700', text: 'text-yellow-300', tag: 'Alerta' },
    { id: 'print-grayscale', name: 'P&B / Escala de Cinza', bg: 'bg-zinc-100', text: 'text-black', tag: 'Impressão Laser' }
  ];

  const formats: { id: FlyerFormat; label: string; desc: string; iconTag: string }[] = [
    { id: 'vertical', label: '1x A4 Vertical', desc: '1 Panfleto Grande por Folha', iconTag: '1 por A4' },
    { id: 'double-a5', label: 'Folha Dupla (2x A5)', desc: '2 Cópias com Linha de Corte', iconTag: '2 por A4' },
    { id: '4-up', label: '4 por Folha A4', desc: 'Mini Panfletos p/ Distribuição', iconTag: '4 por A4' },
    { id: 'square', label: '1:1 Quadrado', desc: 'Post WhatsApp & Instagram', iconTag: '1:1 Social' },
    { id: 'landscape', label: 'Paisagem Horizontal', desc: 'Faixa e Cartaz Horizontal', iconTag: 'Horizontal' },
    { id: 'card', label: 'Cartão de Visita', desc: 'Panfleto Compacto de Bolso', iconTag: 'Compacto' }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-6 text-zinc-100 shadow-2xl">
      
      {/* 1. SELETOR DE TEMAS & CORES (DESTACANDO MODELOS COM FUNDO BRANCO) */}
      <div className="space-y-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Palette className="w-5 h-5" />
            <span>Modelos & Cores do Panfleto</span>
          </div>
          <span className="text-[11px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold flex items-center gap-1">
            <Sun className="w-3.5 h-3.5" /> Fundo Branco & Coloridos
          </span>
        </div>

        {/* Grupo 1: Modelos de Fundo Branco */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Modelos com Fundo Branco (Alta Legibilidade & Impressão)
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">6 opções</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {whiteThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ theme: t.id })}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  data.theme === t.id
                    ? 'border-amber-400 ring-2 ring-amber-400/40 bg-zinc-800 font-bold'
                    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className={`w-full h-6 rounded mb-1.5 ${t.bg} border border-black/20 flex items-center justify-between px-2 font-black text-[11px] ${t.text} shadow-sm`}>
                  <span>Aa FRETES</span>
                  <span className="text-[9px] opacity-70 font-semibold">{t.tag}</span>
                </div>
                <div className="text-[11px] leading-tight font-bold truncate">
                  {t.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Grupo 2: Modelos Coloridos & Escala de Cinza */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              Modelos Coloridos & Escala de Cinza
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">5 opções</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {otherThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onChange({ theme: t.id })}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  data.theme === t.id
                    ? 'border-amber-400 ring-2 ring-amber-400/40 bg-zinc-800 font-bold'
                    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className={`w-full h-6 rounded mb-1.5 ${t.bg} border border-black/20 flex items-center justify-between px-2 font-black text-[11px] ${t.text} shadow-sm`}>
                  <span>Aa FRETES</span>
                  <span className="text-[9px] opacity-70 font-semibold">{t.tag}</span>
                </div>
                <div className="text-[11px] leading-tight font-bold truncate">
                  {t.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SELETOR DE FONTES IMPONENTES */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Heading className="w-5 h-5" />
            <span>Seletor de Fontes Imponentes</span>
          </div>
          <span className="text-[11px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold">
            Alta Visibilidade
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Escolha uma tipografia de peso pesado para destacar o título e o telefone à distância:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ fontFamily: f.id })}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                data.fontFamily === f.id
                  ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400/40 text-amber-300'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className={`text-xl font-black leading-tight ${f.previewClass} truncate`}>
                FRETES 1218
              </div>
              <div className="text-xs font-bold mt-1 text-zinc-200">
                {f.name}
              </div>
              <div className="text-[10px] text-zinc-400 truncate">
                {f.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. CARD EM DESTAQUE PRINCIPAL (TELEFONE & CONTATO) */}
      <div className="space-y-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Phone className="w-5 h-5" />
            <span>Card em Destaque Principal (Telefone & Contato)</span>
          </div>
          <span className="text-[10px] bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded">
            Card 1 - Principal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Telefone Principal (Destaque Gigante) *
            </label>
            <input
              type="text"
              value={data.phone}
              onChange={handlePhoneChange}
              placeholder="Ex: (11) 98765-4321 (WhatsApp Direto)"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2.5 text-base font-black text-amber-300 outline-none placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Telefone Secundário (Opcional)
            </label>
            <input
              type="text"
              value={data.phoneSecondary}
              onChange={handleSecondaryPhoneChange}
              placeholder="Ex: (11) 91234-5678 (Fixo ou 2º WhatsApp)"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2.5 text-sm text-zinc-200 font-bold outline-none placeholder:text-zinc-600"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-zinc-300">
              Título do Card Principal (Aceita HTML)
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => insertHtmlTag('card1Title', '<b>', '</b>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
              >
                &lt;b&gt;
              </button>
              <button
                type="button"
                onClick={() => insertHtmlTag('card1Title', '<span style="color:#facc15">', '</span>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
              >
                cor
              </button>
            </div>
          </div>
          <input
            type="text"
            value={data.card1Title}
            onChange={(e) => onChange({ card1Title: e.target.value })}
            placeholder="Ex: LIGUE AGORA OU CHAME NO WHATSAPP • ATENDIMENTO 24H"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-bold text-zinc-100 outline-none placeholder:text-zinc-600"
          />
          {/* Sugestões rápidas de título do card 1 */}
          <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
            {[
              'LIGUE OU CHAME NO WHATSAPP',
              'DISK FRETES RÁPIDO & WHATSAPP',
              'SOLICITE SEU ORÇAMENTO AGORA'
            ].map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => onChange({ card1Title: text })}
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Chamada de Urgência / Subtítulo do Card (Aceita HTML)
          </label>
          <input
            type="text"
            value={data.card1Highlight}
            onChange={(e) => onChange({ card1Highlight: e.target.value })}
            placeholder="Ex: ORÇAMENTO RÁPIDO SEM COMPROMISSO • COBRIMOS QUALQUER OFERTA"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none placeholder:text-zinc-600"
          />
          {/* Sugestões rápidas de chamada de urgência */}
          <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
            {[
              'ORÇAMENTO RÁPIDO SEM COMPROMISSO • ATENDIMENTO 24H',
              'PREÇO JUSTO • SAÍDAS IMEDIATAS TODOS OS DIAS',
              'COBRIMOS QUALQUER ORÇAMENTO • CHAME JÁ'
            ].map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => onChange({ card1Highlight: text })}
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={data.showQrCode}
              onChange={(e) => onChange({ showQrCode: e.target.checked })}
              className="w-4 h-4 text-amber-500 rounded border-zinc-700 bg-zinc-950 focus:ring-amber-400"
            />
            <QrCode className="w-4 h-4 text-zinc-400" />
            <span>Exibir QR Code para abrir o WhatsApp na hora</span>
          </label>
        </div>
      </div>

      {/* 4. OS 2 CARDS A SEGUIR (SERVIÇOS + REGIÃO/PAGAMENTO) - UMA LINHA POR ITEM */}
      <div className="space-y-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>Os 2 Cards a Seguir (Serviços e Região)</span>
          </div>
          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-bold flex items-center gap-1">
            <Code2 className="w-3 h-3 text-amber-400" /> 1 Linha por Item
          </span>
        </div>

        <p className="text-xs text-zinc-400">
          Cada linha é formatada automaticamente em uma entrada limpa e sem quebras. Separe as entradas com <code className="bg-zinc-800 px-1 py-0.5 rounded text-amber-300">&lt;br&gt;</code> ou nova linha.
        </p>

        {/* CARD 2: SERVIÇOS */}
        <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-amber-300">
              Card 2: Título dos Serviços
            </label>
            <span className="text-[10px] text-zinc-400">Card Secundário 1</span>
          </div>
          <input
            type="text"
            value={data.card2Title}
            onChange={(e) => onChange({ card2Title: e.target.value })}
            placeholder="Ex: SERVIÇOS DE FRETES (ou NOSSOS SERVIÇOS)"
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-100 outline-none placeholder:text-zinc-600"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-zinc-300">
              Itens dos Serviços (Uma linha por entrada)
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => insertHtmlTag('card2Content', '<b>', '</b>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 font-bold"
              >
                &lt;b&gt;negrito&lt;/b&gt;
              </button>
              <button
                type="button"
                onClick={() => insertHtmlTag('card2Content', '<br>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
              >
                &lt;br&gt;
              </button>
              <button
                type="button"
                onClick={() => insertHtmlTag('card2Content', '<span style="color:#facc15">', '</span>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-amber-300"
              >
                &lt;cor&gt;
              </button>
            </div>
          </div>
          <textarea
            rows={4}
            value={data.card2Content}
            onChange={(e) => onChange({ card2Content: e.target.value })}
            placeholder={`Exemplos reais e vendedores (1 item por linha):
<b>Fretes Urbanos e Intermunicipais</b>
<b>Mudanças Residenciais e Comerciais</b>
<b>Cargas Fechadas e Pequenos Volumes</b>
<b>Entregas e Coletas Rápidas no Dia</b>`}
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 outline-none resize-none leading-relaxed placeholder:text-zinc-600"
          />
          {/* Presets rápidos para Card 2 */}
          <div className="flex flex-wrap gap-1.5 pt-1 items-center">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Preencher com:</span>
            <button
              type="button"
              onClick={() => onChange({
                card2Title: 'SERVIÇOS DE FRETES',
                card2Content: '<b>Fretes Urbanos e Intermunicipais</b><br><b>Mudanças Residenciais e Comerciais</b><br><b>Cargas Fechadas e Pequenos Volumes</b><br><b>Entregas e Coletas Rápidas no Dia</b>'
              })}
              className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
            >
              Fretes & Mudanças
            </button>
            <button
              type="button"
              onClick={() => onChange({
                card2Title: 'SERVIÇOS DE TRANSPORTES',
                card2Content: '<b>Coletas e Entregas Comerciais</b><br><b>Cargas Fracionadas e Dedicadas</b><br><b>Distribuição de Mercadorias</b><br><b>Viagens para Todo o Estado</b>'
              })}
              className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
            >
              Comercial & Cargas
            </button>
          </div>
        </div>

        {/* CARD 3: REGIÃO & PAGAMENTO */}
        <div className="bg-zinc-950/80 p-3 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-amber-300">
              Card 3: Título Região & Pagamento
            </label>
            <span className="text-[10px] text-zinc-400">Card Secundário 2</span>
          </div>
          <input
            type="text"
            value={data.card3Title}
            onChange={(e) => onChange({ card3Title: e.target.value })}
            placeholder="Ex: REGIÃO & PAGAMENTO (ou CONDIÇÕES & ÁREA)"
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-100 outline-none placeholder:text-zinc-600"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-zinc-300">
              Itens Região & Pagamento (Uma linha por entrada)
            </label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => insertHtmlTag('card3Content', '<b>', '</b>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300 font-bold"
              >
                &lt;b&gt;negrito&lt;/b&gt;
              </button>
              <button
                type="button"
                onClick={() => insertHtmlTag('card3Content', '<br>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-300"
              >
                &lt;br&gt;
              </button>
              <button
                type="button"
                onClick={() => insertHtmlTag('card3Content', '<span style="color:#4ade80">', '</span>')}
                className="px-1.5 py-0.5 text-[10px] bg-zinc-800 hover:bg-zinc-700 rounded text-emerald-400"
              >
                &lt;verde&gt;
              </button>
            </div>
          </div>
          <textarea
            rows={4}
            value={data.card3Content}
            onChange={(e) => onChange({ card3Content: e.target.value })}
            placeholder={`Exemplos reais e vendedores (1 item por linha):
<b>Atendimento:</b> Capital, Litoral e Interior
<b>Pagamento:</b> Pix, Cartões em até 12x e Dinheiro
<b>Agilidade:</b> Cargas com Cuidado e Pontualidade
<b>Orçamento:</b> Rápido e Sem Compromisso`}
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 outline-none resize-none leading-relaxed placeholder:text-zinc-600"
          />
          {/* Presets rápidos para Card 3 */}
          <div className="flex flex-wrap gap-1.5 pt-1 items-center">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Preencher com:</span>
            <button
              type="button"
              onClick={() => onChange({
                card3Title: 'REGIÃO & PAGAMENTO',
                card3Content: '<b>Atendimento:</b> Capital, Litoral e Interior<br><b>Pagamento:</b> Pix, Cartões em até 12x e Dinheiro<br><b>Agilidade:</b> Cargas com Cuidado e Pontualidade<br><b>Orçamento:</b> Rápido e Sem Compromisso'
              })}
              className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
            >
              Completo Pix/Cartão
            </button>
            <button
              type="button"
              onClick={() => onChange({
                card3Title: 'COBERTURA & CONDIÇÕES',
                card3Content: '<b>Região:</b> Grande SP, Vale do Paraíba e Litoral<br><b>Facilidade:</b> Parcelamos no Cartão de Crédito<br><b>Segurança:</b> Caminhão Rastreado e Seguro<br><b>Desconto:</b> 10% de Desconto para Pagamento via Pix'
              })}
              className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
            >
              Com Desconto Pix
            </button>
          </div>
        </div>
      </div>

      {/* 5. FOTO ORIGINAL DO CAMINHÃO */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Truck className="w-5 h-5" />
            <span>Foto Original do Caminhão</span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Enviar Foto Própria</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Presets de Foto */}
        <div className="grid grid-cols-3 gap-2">
          {TRUCK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange({ truckPhotoUrl: preset.url })}
              className={`p-2 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                data.truckPhotoUrl === preset.url
                  ? 'border-amber-400 bg-amber-400/10 ring-1 ring-amber-400'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-1.5 bg-zinc-900">
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[11px] font-bold text-zinc-200 truncate">
                {preset.tag}
              </div>
              {data.truckPhotoUrl === preset.url && (
                <div className="absolute top-1 right-1 bg-amber-400 text-zinc-950 rounded-full p-0.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 6. TÍTULO, CABEÇALHO & RODAPÉ */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Type className="w-5 h-5" />
          <span>Cabeçalho e Rodapé</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Título do Panfleto (Aceita HTML)
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Ex: FRETES E MUDANÇAS (ou DISK FRETES 24H)"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 font-bold outline-none placeholder:text-zinc-600"
            />
            {/* Sugestões rápidas de título */}
            <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
              {[
                'FRETES EM GERAL',
                'FRETES & MUDANÇAS',
                'DISK FRETES 24H',
                'TRANSPORTE RÁPIDO'
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => onChange({ title: text })}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Subtítulo do Topo
            </label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              placeholder="Ex: TRANSPORTE RÁPIDO, SEGURO E COM PREÇO JUSTO"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none placeholder:text-zinc-600"
            />
            {/* Sugestões rápidas de subtítulo */}
            <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
              {[
                'TRANSPORTE RÁPIDO E SEGURO',
                'ATENDIMENTO 24H • PREÇO JUSTO',
                'LIGOU, CHEGOU NO MESMO DIA'
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => onChange({ subtitle: text })}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Nome do Motorista / Empresa
            </label>
            <input
              type="text"
              value={data.driverName}
              onChange={(e) => onChange({ driverName: e.target.value })}
              placeholder="Ex: Carlos Fretes Express (ou TransSilva & Cia)"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Tipo do Veículo (Badge na Foto)
            </label>
            <input
              type="text"
              value={data.vehicleType}
              onChange={(e) => onChange({ vehicleType: e.target.value })}
              placeholder="Ex: CAMINHÃO BAÚ FECHADO 3/4 (ou HR / IVECO)"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            />
            {/* Sugestões rápidas de veículo */}
            <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
              {[
                'CAMINHÃO BAÚ FECHADO',
                'CAMINHÃO 3/4 CARROCERIA',
                'HR / IVECO DAILY BAÚ',
                'CAMINHÃO TOCO'
              ].map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => onChange({ vehicleType: text })}
                  className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Texto do Rodapé
          </label>
          <input
            type="text"
            value={data.footerText}
            onChange={(e) => onChange({ footerText: e.target.value })}
            placeholder="Ex: FRETES COM SEGURANÇA E CONFIANÇA • PEÇA SEU ORÇAMENTO AGORA!"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none placeholder:text-zinc-600"
          />
          {/* Sugestões rápidas de rodapé */}
          <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
            <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5 text-amber-400" /> Sugestões:</span>
            {[
              'FRETES COM SEGURANÇA E CONFIANÇA • PEÇA SEU ORÇAMENTO AGORA!',
              'QUALIDADE, PONTUALIDADE E O MELHOR PREÇO DA REGIÃO!',
              'LIGOU, CHEGOU • SUA CARGA EM BOAS MÃOS!'
            ].map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => onChange({ footerText: text })}
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded transition-colors"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 7. FORMATO DE IMPRESSÃO & DIVULGAÇÃO */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Printer className="w-5 h-5" />
            <span>Formatos de Impressão & Divulgação</span>
          </label>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded">
            Folha Dupla, 4 por Folha, 1:1, Paisagem
          </span>
        </div>
        
        <p className="text-xs text-zinc-400">
          Escolha o formato ideal para economizar papel e tinta na impressão ou gerar para redes sociais:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ format: f.id })}
              className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                data.format === f.id
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400 ring-2 ring-amber-400/40 font-black shadow-md'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-zinc-100">
                  {f.label}
                </span>
                <span className="text-[9px] bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                  {f.iconTag}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-tight">
                {f.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 8. ORDENAÇÃO DOS ELEMENTOS (ARRASTE COM O MOUSE) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <GripVertical className="w-5 h-5" />
            <span>Disposição & Ordem dos Elementos</span>
          </div>
          <span className="text-[10px] bg-amber-400 text-zinc-950 font-black px-2 py-0.5 rounded">
            Arrastar c/ Mouse
          </span>
        </div>

        <ElementOrderManager
          order={data.elementOrder || ['header', 'photo', 'card1', 'servicesCards', 'footer']}
          onChange={(newOrder) => onChange({ elementOrder: newOrder })}
        />
      </div>

    </div>
  );
}
