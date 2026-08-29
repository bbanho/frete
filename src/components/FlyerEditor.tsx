import React, { useRef } from 'react';
import { FlyerData, FlyerTheme, FlyerFormat, ImposingFont } from '../types';
import { TRUCK_PRESETS } from '../data/defaults';
import { formatPhoneMask } from '../utils/flyerHelpers';
import { 
  Phone, 
  Truck, 
  Palette, 
  QrCode, 
  Upload, 
  Type, 
  MapPin, 
  CreditCard,
  CheckCircle2,
  Code2,
  Sparkles,
  Layers,
  Heading
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

  const themes: { id: FlyerTheme; name: string; bg: string; text: string; border: string; desc?: string }[] = [
    { id: 'yellow-black', name: 'Amarelo & Preto (Máximo Contraste)', bg: 'bg-amber-400', text: 'text-zinc-950', border: 'border-amber-400' },
    { id: 'black-gold', name: 'Preto & Ouro Neon', bg: 'bg-zinc-950', text: 'text-amber-400', border: 'border-amber-400' },
    { id: 'blue-yellow', name: 'Azul & Amarelo Comercial', bg: 'bg-blue-950', text: 'text-amber-400', border: 'border-blue-700' },
    { id: 'red-black', name: 'Vermelho & Amarelo Alerta', bg: 'bg-red-700', text: 'text-yellow-300', border: 'border-red-600' },
    { id: 'clean-white', name: 'Branco & Preto Contraste', bg: 'bg-zinc-100', text: 'text-zinc-950', border: 'border-zinc-400' },
    { id: 'print-grayscale', name: 'P&B / Escala de Cinza Laser', bg: 'bg-white', text: 'text-black', border: 'border-black' }
  ];

  const formats: { id: FlyerFormat; label: string }[] = [
    { id: 'vertical', label: 'Panfleto A4 / Grande' },
    { id: 'square', label: 'Quadrado (WhatsApp)' },
    { id: 'card', label: 'Cartão Horizontal' }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6 space-y-6 text-zinc-100 shadow-2xl">
      
      {/* 🔤 SELETOR DE FONTES IMPONENTES */}
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

      {/* 🌟 1. CARD EM DESTAQUE PRINCIPAL (TELEFONE & CONTATO) */}
      <div className="space-y-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Phone className="w-5 h-5" />
            <span>1. Card em Destaque Principal (Telefone & Contato)</span>
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
              placeholder="(11) 98765-4321"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2.5 text-base font-black text-amber-300 outline-none"
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
              placeholder="(11) 91234-5678"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2.5 text-sm text-zinc-200 font-bold outline-none"
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
            placeholder="LIGUE OU CHAME NO WHATSAPP"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-bold text-zinc-100 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Chamada de Urgência / Subtítulo do Card (Aceita HTML)
          </label>
          <input
            type="text"
            value={data.card1Highlight}
            onChange={(e) => onChange({ card1Highlight: e.target.value })}
            placeholder="ORÇAMENTO RÁPIDO SEM COMPROMISSO • ATENDIMENTO 24H"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-200 outline-none"
          />
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

      {/* 🌟 2. OS 2 CARDS A SEGUIR (SERVIÇOS + REGIÃO/PAGAMENTO) */}
      <div className="space-y-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Layers className="w-5 h-5" />
            <span>2. Os 2 Cards a Seguir (Serviços e Região)</span>
          </div>
          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-bold flex items-center gap-1">
            <Code2 className="w-3 h-3 text-amber-400" /> Suporta HTML
          </span>
        </div>

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
            placeholder="SERVIÇOS DE FRETES"
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-100 outline-none"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-zinc-300">
              Conteúdo dos Serviços (HTML permitido: &lt;b&gt;, &lt;br&gt;, &lt;span&gt;)
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
            rows={3}
            value={data.card2Content}
            onChange={(e) => onChange({ card2Content: e.target.value })}
            placeholder="• <b>Fretes Urbanos & Intermunicipais</b><br>• Mudanças Residenciais & Comerciais..."
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 outline-none resize-none leading-relaxed"
          />
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
            placeholder="REGIÃO & PAGAMENTO"
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-100 outline-none"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-zinc-300">
              Conteúdo Região & Pagamento (HTML permitido)
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
            rows={3}
            value={data.card3Content}
            onChange={(e) => onChange({ card3Content: e.target.value })}
            placeholder="📍 <b>Atendemos:</b> Capital, Litoral e Interior<br>💳 <b>Pagamento:</b> Pix, Cartão e Dinheiro"
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 outline-none resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* 🚛 3. FOTO DO CAMINHÃO */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Truck className="w-5 h-5" />
            <span>3. Foto Original do Caminhão</span>
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

      {/* 📝 4. TÍTULO, CABEÇALHO & RODAPÉ (HTML PERMITIDO) */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Type className="w-5 h-5" />
          <span>4. Cabeçalho e Rodapé</span>
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
              placeholder="FRETES EM GERAL"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Subtítulo do Topo
            </label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              placeholder="TRANSPORTE RÁPIDO E SEGURO"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none"
            />
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
              placeholder="Carlos Transportes"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none"
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
              placeholder="CAMINHÃO BAÚ FECHADO"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none"
            />
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
            placeholder="FRETES COM SEGURANÇA E CONFIANÇA"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-zinc-100 outline-none"
          />
        </div>
      </div>

      {/* 🎨 5. TEMA DE ALTO CONTRASTE & FORMATO */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Palette className="w-5 h-5" />
          <span>5. Cores & Formato do Panfleto</span>
        </div>

        {/* Escolha do Tema */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ theme: t.id })}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                data.theme === t.id
                  ? 'border-amber-400 ring-2 ring-amber-400/40 bg-zinc-800 font-bold'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className={`w-full h-5 rounded mb-1.5 ${t.bg} border border-black/20 flex items-center justify-center font-black text-[11px] ${t.text}`}>
                Aa FRETES
              </div>
              <div className="text-[11px] leading-tight truncate">
                {t.name}
              </div>
            </button>
          ))}
        </div>

        {/* Formato */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Formato do Panfleto
          </label>
          <div className="grid grid-cols-3 gap-2">
            {formats.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ format: f.id })}
                className={`py-2 px-2 text-center rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  data.format === f.id
                    ? 'bg-amber-400 text-zinc-950 border-amber-400 font-black'
                    : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
