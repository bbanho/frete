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
  cleanPhoneNumber
} from './utils/flyerHelpers';
import html2canvas from 'html2canvas';
import { 
  Download, 
  Printer, 
  Share2, 
  Copy, 
  PhoneCall, 
  Truck, 
  Check, 
  Sparkles,
  Eye,
  Sliders
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<FlyerData>(DEFAULT_FLYER_DATA);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'preview' | 'edit'>('preview');

  const flyerViewRef = useRef<HTMLDivElement>(null);

  // Generate QR Code dynamically based on phone number
  useEffect(() => {
    async function updateQr() {
      if (data.phone) {
        const clean = cleanPhoneNumber(data.phone);
        const link = `https://wa.me/55${clean}?text=${encodeURIComponent('Olá! Gostaria de um orçamento de frete.')}`;
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
      const canvas = await html2canvas(flyerViewRef.current, {
        scale: 3, // High resolution for crisp printing and sharing
        useCORS: true,
        backgroundColor: null,
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `panfleto-fretes-${data.driverName.replace(/\s+/g, '-').toLowerCase() || 'caminhao'}.png`;
      link.href = imgData;
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
    const servicesList = data.servicesSummary
      .split('\n')
      .map(s => s.trim().replace(/^[•\-\*]\s*/, ''))
      .filter(Boolean);

    const text = generateWhatsAppBroadcastText({
      headline: data.title,
      driverName: data.driverName,
      phone: data.phone,
      vehicleType: data.vehicleType,
      services: servicesList,
      coverageArea: data.coverageArea,
      paymentNotice: data.paymentInfo
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
              <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
                Panfleto de Fretes & Transporte
              </h1>
              <p className="text-xs text-zinc-400">
                Foto original do caminhão • Telefone em destaque • Alta legibilidade
              </p>
            </div>
          </div>

          {/* Quick Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold text-xs sm:text-sm rounded-lg shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Gerando Imagem...' : 'Baixar Imagem (PNG)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm rounded-lg border border-zinc-700 transition-colors cursor-pointer"
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
            <span>Editar Dados</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: VISUALIZADOR DO PANFLETO */}
          <section className={`lg:col-span-6 flex flex-col items-center gap-4 ${mobileTab === 'edit' ? 'hidden sm:flex' : 'flex'}`}>
            <div className="w-full flex items-center justify-between text-xs text-zinc-400 px-1 no-print">
              <span className="font-semibold text-zinc-300">
                Visualização do Panfleto (Alta Resolução)
              </span>
              <span className="bg-zinc-800 text-amber-300 px-2 py-0.5 rounded text-[11px] font-bold">
                {data.format === 'vertical' ? 'Formato Panfleto A4' : data.format === 'square' ? 'Formato Quadrado' : 'Cartão'}
              </span>
            </div>

            {/* Container do Panfleto (Renderizado) */}
            <div className="w-full flex justify-center py-2 print-only-container">
              <FlyerView
                ref={flyerViewRef}
                data={data}
                qrCodeUrl={qrCodeUrl}
              />
            </div>

            {/* Botões de Ação Imediata (Mobile + Desktop) */}
            <div className="w-full max-w-[480px] grid grid-cols-2 gap-2 no-print">
              <button
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs rounded-xl shadow transition-colors cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Baixando...' : 'Salvar no Celular'}</span>
              </button>

              <button
                onClick={handleCopyWhatsAppText}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Texto Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar p/ WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            {/* Teste direto do link do WhatsApp */}
            <div className="w-full max-w-[480px] bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs no-print">
              <div className="text-zinc-400">
                <span className="text-zinc-200 font-semibold block">Contato do Cliente:</span>
                Ao clicar ou escanear, abre direto no WhatsApp
              </div>
              <a
                href={getWhatsAppUrl(data.phone, 'Olá! Vi seu panfleto de fretes e gostaria de um orçamento.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex-shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Testar Link</span>
              </a>
            </div>
          </section>

          {/* COLUNA DIREITA: EDITOR DE INFORMAÇÕES */}
          <section className={`lg:col-span-6 ${mobileTab === 'preview' ? 'hidden sm:block' : 'block'} no-print`}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-zinc-200">
                Personalizar Panfleto de Fretes
              </h2>
              <span className="text-xs text-amber-400 font-medium">
                Atualização em tempo real
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
        Panfleto de Fretes em Geral • Otimizado para alta legibilidade e divulgação rápida no WhatsApp, impressão e redes sociais.
      </footer>
    </div>
  );
}
