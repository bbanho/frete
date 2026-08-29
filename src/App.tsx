/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { FlyerData } from './types';
import { DEFAULT_FLYER_DATA } from './data/defaults';
import { FlyerView } from './components/FlyerView';
import { FlyerEditor } from './components/FlyerEditor';
import { 
  generateQrCodeDataUrl, 
  getWhatsAppUrl, 
  generateWhatsAppBroadcastText,
  cleanPhoneNumber,
  stripHtmlToWhatsApp
} from './utils/flyerHelpers';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Printer, 
  Copy, 
  PhoneCall, 
  Truck, 
  Check, 
  Eye, 
  Sliders,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Contrast
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<FlyerData>(DEFAULT_FLYER_DATA);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'preview' | 'edit'>('preview');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [isGrayscalePreview, setIsGrayscalePreview] = useState<boolean>(false);

  const flyerViewRef = useRef<HTMLDivElement>(null);

  // Generate QR Code dynamically based on phone number
  useEffect(() => {
    async function updateQr() {
      if (data.phone) {
        const clean = cleanPhoneNumber(data.phone);
        const link = `https://wa.me/55${clean}?text=${encodeURIComponent('Olá! Vi seu panfleto de fretes e gostaria de um orçamento.')}`;
        const url = await generateQrCodeDataUrl(link);
        setQrCodeUrl(url);
      }
    }
    updateQr();
  }, [data.phone]);

  const handleDataChange = (updated: Partial<FlyerData>) => {
    setData(prev => ({ ...prev, ...updated }));
  };

  // Download flyer as high-res PNG image
  const handleDownloadImage = async () => {
    if (!flyerViewRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(flyerViewRef.current, {
        pixelRatio: 3, // High resolution for super sharp printing and sharing
        cacheBust: true,
      });
      const link = document.createElement('a');
      const safeName = stripHtmlToWhatsApp(data.driverName || 'caminhao-fretes')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');
      link.download = `panfleto-fretes-${safeName || 'divulgacao'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem do panfleto:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Trigger print view
  const handlePrint = () => {
    window.print();
  };

  // Copy WhatsApp broadcast text
  const handleCopyWhatsAppText = () => {
    const text = generateWhatsAppBroadcastText({
      title: data.title,
      driverName: data.driverName,
      phone: data.phone,
      phoneSecondary: data.phoneSecondary,
      vehicleType: data.vehicleType,
      card2Title: data.card2Title,
      card2Content: data.card2Content,
      card3Title: data.card3Title,
      card3Content: data.card3Content,
      footerText: data.footerText
    });

    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      
      {/* HEADER SUPERIOR */}
      <header className="no-print bg-zinc-900/90 backdrop-blur border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black shadow-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                Panfleto de Fretes & Cargas
              </h1>
              <p className="text-xs text-zinc-400">
                1 Card em Destaque + 2 Cards Secundários • Fontes Imponentes • HTML Liberado
              </p>
            </div>
          </div>

          {/* Quick Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-black text-xs sm:text-sm rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Gerando Imagem...' : 'Baixar Imagem (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs sm:text-sm rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              title="Imprimir panfleto"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="sm:hidden flex border-t border-zinc-800 bg-zinc-900/95">
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              mobileTab === 'preview'
                ? 'border-amber-400 text-amber-400 bg-zinc-800/50'
                : 'border-transparent text-zinc-400'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Ver Panfleto</span>
          </button>
          <button
            onClick={() => setMobileTab('edit')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              mobileTab === 'edit'
                ? 'border-amber-400 text-amber-400 bg-zinc-800/50'
                : 'border-transparent text-zinc-400'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Editar & HTML</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: VISUALIZADOR DO PANFLETO (AMPLIADO PARA OCUPAR MAIS ESPAÇO) */}
          <section className={`lg:col-span-6 flex flex-col items-center gap-4 ${mobileTab === 'edit' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="w-full flex items-center justify-between text-xs text-zinc-400 px-1 no-print">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-200">
                  Visualização do Panfleto
                </span>
                <span className="bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {data.fontFamily}
                </span>
              </div>

              {/* Controles de Tamanho & Simulação de Impressão P&B */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsGrayscalePreview(!isGrayscalePreview)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-lg font-bold border transition-colors cursor-pointer ${
                    isGrayscalePreview
                      ? 'bg-zinc-100 text-zinc-950 border-white ring-2 ring-white/50'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
                  }`}
                  title="Simular visualização em Escala de Cinza / Impressão P&B"
                >
                  <Contrast className="w-3.5 h-3.5" />
                  <span>{isGrayscalePreview ? 'Modo Cor' : 'Simular P&B'}</span>
                </button>

                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setZoomScale(0.9)}
                    className={`px-2 py-0.5 text-[11px] rounded font-bold transition-colors ${zoomScale === 0.9 ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                  >
                    90%
                  </button>
                  <button
                    onClick={() => setZoomScale(1.0)}
                    className={`px-2 py-0.5 text-[11px] rounded font-bold transition-colors ${zoomScale === 1.0 ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                  >
                    100%
                  </button>
                  <button
                    onClick={() => setZoomScale(1.15)}
                    className={`px-2 py-0.5 text-[11px] rounded font-bold transition-colors ${zoomScale === 1.15 ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                    title="Ocupar mais espaço"
                  >
                    115%
                  </button>
                </div>
              </div>
            </div>

            {/* Container do Panfleto (Renderizado) */}
            <div 
              className="w-full flex justify-center py-2 print-only-container transition-transform duration-200 origin-top"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top center'
              }}
            >
              <FlyerView
                ref={flyerViewRef}
                data={data}
                qrCodeUrl={qrCodeUrl}
                isGrayscalePreview={isGrayscalePreview}
              />
            </div>

            {/* Botões de Ação Imediata (Mobile + Desktop) */}
            <div className="w-full max-w-[580px] grid grid-cols-2 gap-2.5 no-print pt-2">
              <button
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="flex items-center justify-center gap-1.5 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Baixando...' : 'Salvar Imagem (PNG)'}</span>
              </button>

              <button
                onClick={handleCopyWhatsAppText}
                className="flex items-center justify-center gap-1.5 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs sm:text-sm rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Texto Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Texto p/ WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            {/* Teste direto do link do WhatsApp */}
            <div className="w-full max-w-[580px] bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs no-print shadow">
              <div className="text-zinc-400">
                <span className="text-zinc-200 font-bold block">Contato Rápido:</span>
                Ao clicar ou escanear, abre direto a conversa no WhatsApp
              </div>
              <a
                href={getWhatsAppUrl(data.phone, 'Olá! Vi seu panfleto de fretes e gostaria de um orçamento.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex-shrink-0 shadow"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Abrir WhatsApp</span>
              </a>
            </div>
          </section>

          {/* COLUNA DIREITA: EDITOR DE INFORMAÇÕES & SUPORTE A HTML */}
          <section className={`lg:col-span-6 ${mobileTab === 'preview' ? 'hidden sm:block' : 'block'} no-print`}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-black text-zinc-200">
                Personalização com HTML & 3 Cards
              </h2>
              <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                HTML Permitido
              </span>
            </div>

            <FlyerEditor
              data={data}
              onChange={handleDataChange}
            />
          </section>

        </div>
      </main>

      {/* FOOTER DISCRETO */}
      <footer className="no-print border-t border-zinc-900 bg-zinc-950/80 py-4 px-4 text-center text-xs text-zinc-500">
        Panfleto de Fretes • 1 Card em Destaque + 2 Cards Secundários • Fontes Imponentes • Suporte Completo a Tags HTML.
      </footer>
    </div>
  );
}
