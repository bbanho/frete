import React, { useRef } from 'react';
import { FlyerData, FlyerTheme, FlyerFormat } from '../types';
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
  FileImage
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

  const themes: { id: FlyerTheme; name: string; bg: string; text: string; border: string }[] = [
    { id: 'yellow-black', name: 'Amarelo & Preto (Mais Visível)', bg: 'bg-amber-400', text: 'text-zinc-950', border: 'border-amber-400' },
    { id: 'blue-white', name: 'Azul & Branco', bg: 'bg-blue-900', text: 'text-white', border: 'border-blue-700' },
    { id: 'clean-light', name: 'Branco & Verde', bg: 'bg-white', text: 'text-zinc-900', border: 'border-zinc-300' },
    { id: 'dark-contrast', name: 'Preto & Ouro', bg: 'bg-zinc-900', text: 'text-amber-400', border: 'border-zinc-700' }
  ];

  const formats: { id: FlyerFormat; label: string }[] = [
    { id: 'vertical', label: 'Panfleto / Cartaz (A4)' },
    { id: 'square', label: 'Quadrado (WhatsApp/Redes)' },
    { id: 'card', label: 'Cartão de Visita' }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 space-y-6 text-zinc-100 shadow-xl">
      
      {/* 1. DADOS DE CONTATO & TELEFONE (PRIORIDADE) */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Phone className="w-5 h-5" />
          <span>1. Telefone & Contato (Destaque Principal)</span>
        </div>
        <p className="text-xs text-zinc-400">
          O número aparecerá em tamanho grande e com alto contraste no panfleto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Telefone / WhatsApp Principal *
            </label>
            <input
              type="text"
              value={data.phone}
              onChange={handlePhoneChange}
              placeholder="(11) 98765-4321"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-lg px-3 py-2 text-base font-bold text-amber-300 outline-none"
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
              placeholder="(11) 3456-7890"
              maxLength={15}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none"
            />
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
            <span>Exibir QR Code direto para o WhatsApp</span>
          </label>
        </div>
      </div>

      {/* 2. FOTO ORIGINAL DO CAMINHÃO */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Truck className="w-5 h-5" />
            <span>2. Foto Original do Caminhão</span>
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

        <p className="text-xs text-zinc-400">
          Envie a foto real do seu veículo ou escolha um modelo abaixo:
        </p>

        {/* Presets de Foto */}
        <div className="grid grid-cols-3 gap-2">
          {TRUCK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange({ truckPhotoUrl: preset.url })}
              className={`p-2 rounded-lg border text-left transition-all relative overflow-hidden group cursor-pointer ${
                data.truckPhotoUrl === preset.url
                  ? 'border-amber-400 bg-amber-400/10'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >
              <div className="aspect-video w-full rounded overflow-hidden mb-1.5 bg-zinc-900">
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

      {/* 3. TÍTULO E TEXTO SUCINTO (FRETES EM GERAL) */}
      <div className="space-y-3 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Type className="w-5 h-5" />
          <span>3. Informações dos Fretes (Sucinto)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Título do Panfleto
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="FRETES EM GERAL"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 font-bold outline-none uppercase"
            />
          </div>

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Tipo do Veículo / Carroceria
            </label>
            <input
              type="text"
              value={data.vehicleType}
              onChange={(e) => onChange({ vehicleType: e.target.value })}
              placeholder="CAMINHÃO 3/4 BAÚ FECHADO"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              <MapPin className="w-3.5 h-3.5 inline mr-1 text-zinc-400" />
              Região de Atendimento
            </label>
            <input
              type="text"
              value={data.coverageArea}
              onChange={(e) => onChange({ coverageArea: e.target.value })}
              placeholder="São Paulo, Litoral e Interior"
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            Resumo dos Serviços (Linhas Sucintas)
          </label>
          <textarea
            rows={3}
            value={data.servicesSummary}
            onChange={(e) => onChange({ servicesSummary: e.target.value })}
            placeholder="• Pequenas e Médias Cargas&#10;• Mudanças e Transportes&#10;• Viagens e Entregas Rápidas"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs font-medium text-zinc-100 outline-none resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1">
            <CreditCard className="w-3.5 h-3.5 inline mr-1 text-zinc-400" />
            Formas de Pagamento
          </label>
          <input
            type="text"
            value={data.paymentInfo}
            onChange={(e) => onChange({ paymentInfo: e.target.value })}
            placeholder="Pix, Dinheiro e Cartão"
            className="w-full bg-zinc-950 border border-zinc-700 focus:border-amber-400 rounded-lg px-3 py-2 text-sm text-zinc-100 outline-none"
          />
        </div>
      </div>

      {/* 4. TEMA DE ALTA LEGIBILIDADE & FORMATO */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Palette className="w-5 h-5" />
          <span>4. Cores de Alta Legibilidade & Formato</span>
        </div>

        {/* Escolha do Tema */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ theme: t.id })}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                data.theme === t.id
                  ? 'border-amber-400 ring-2 ring-amber-400/40 bg-zinc-800 font-bold'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className={`w-full h-5 rounded mb-1.5 ${t.bg} border border-black/20 flex items-center justify-center font-bold text-[10px] ${t.text}`}>
                Aa
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
                    ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
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
