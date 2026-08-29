import { FlyerData, TruckPreset } from '../types';
import truckRedBauImg from '../assets/images/caminhao_vermelho_bau_1788017348827.jpg';
import truckBauImg from '../assets/images/caminhao_frete_original_1788017192766.jpg';
import truckCarroceriaImg from '../assets/images/caminhao_carroceria_frete_1788017210053.jpg';

export const TRUCK_PRESETS: TruckPreset[] = [
  {
    id: 'caminhao-vermelho-bau',
    name: 'Caminhão MB Baú Fechado (Foto Melhorada)',
    url: truckRedBauImg,
    tag: 'Caminhão Baú Vermelho'
  },
  {
    id: 'bau-34',
    name: 'Caminhão 3/4 Branco Baú',
    url: truckBauImg,
    tag: 'Baú 3/4'
  },
  {
    id: 'carroceria',
    name: 'Caminhão Carroceria Aberta',
    url: truckCarroceriaImg,
    tag: 'Carroceria'
  }
];

export const DEFAULT_FLYER_DATA: FlyerData = {
  title: 'FRETES EM GERAL',
  subtitle: 'TRANSPORTE RÁPIDO, SEGURO E COM PREÇO JUSTO',
  driverName: 'CARLOS TRANSPORTES',
  phone: '(11) 98765-4321',
  phoneSecondary: '(11) 91234-5678',
  vehicleType: 'CAMINHÃO BAÚ FECHADO 3/4',
  truckPhotoUrl: truckRedBauImg,
  
  // Card 1 (Destaque Principal): Contato & Chamada Imediata
  card1Title: 'LIGUE OU CHAME NO WHATSAPP',
  card1Highlight: 'ORÇAMENTO RÁPIDO SEM COMPROMISSO • ATENDIMENTO 24H',
  
  // Card 2 (Secundário 1): Serviços de Fretes (HTML Permitido)
  card2Title: 'SERVIÇOS DE FRETES',
  card2Content: '• <b>Fretes Urbanos & Intermunicipais</b><br>• Mudanças Residenciais & Comerciais<br>• <b>Cargas Fechadas e Pequenos Volumes</b><br>• Entregas e Coletas Rápidas',
  
  // Card 3 (Secundário 2): Região & Pagamento (HTML Permitido)
  card3Title: 'REGIÃO & PAGAMENTO',
  card3Content: '📍 <b>Atendemos:</b> Capital, Interior e Litoral<br>💳 <b>Pagamento:</b> Aceitamos Pix, Cartão em até 12x e Dinheiro<br>⏱️ <b>Pontualidade & Cuidado com sua carga</b>',
  
  footerText: 'FRETES COM SEGURANÇA E CONFIANÇA • PEÇA SEU ORÇAMENTO AGORA!',
  showQrCode: true,
  theme: 'yellow-black',
  format: 'vertical',
  fontFamily: 'anton'
};
