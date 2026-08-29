import { FlyerData, TruckPreset, ImagePosition, TruckViewPreset, FlyerTemplate } from '../types';
import truckRedBauImg from '../assets/images/caminhao_vermelho_bau_1788017348827.jpg';
import truckBauImg from '../assets/images/caminhao_frete_original_1788017192766.jpg';
import truckCarroceriaImg from '../assets/images/caminhao_carroceria_frete_1788017210053.jpg';

export const DEFAULT_IMAGE_POSITION: ImagePosition = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0
};

export const TRUCK_VIEW_PRESETS: { id: TruckViewPreset; name: string; position: ImagePosition; icon: string }[] = [
  { id: 'front', name: 'Frente', position: { x: 0, y: -10, scale: 1.1, rotation: 0 }, icon: '🚛' },
  { id: 'side', name: 'Lateral (Perfil)', position: { x: 0, y: 0, scale: 1, rotation: 0 }, icon: '🚚' },
  { id: 'rear', name: 'Traseira', position: { x: 0, y: 10, scale: 1.1, rotation: 0 }, icon: '🔙' },
  { id: 'curve-mountain', name: 'Curva na Serra ★', position: { x: -15, y: -20, scale: 1.3, rotation: -12 }, icon: '🏔️' },
  { id: 'loading', name: 'Carregando', position: { x: 20, y: 5, scale: 0.9, rotation: 5 }, icon: '📦' },
  { id: 'highway', name: 'Estrada', position: { x: 0, y: -5, scale: 1.15, rotation: 0 }, icon: '🛣️' }
];

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

export const FLYER_TEMPLATES: { id: FlyerTemplate; name: string; desc: string; icon: string; preview: string }[] = [
  {
    id: 'classic',
    name: 'Clássico Completo',
    desc: 'Header + Foto + Contato + 2 Cards + Rodapé',
    icon: '📋',
    preview: 'header → photo → card1 → servicesCards → footer'
  },
  {
    id: 'photo-focused',
    name: 'Foto em Destaque',
    desc: 'Foto grande ocupa 50% + Cards compactos',
    icon: '📸',
    preview: 'photo (grande) → card1 → servicesCards'
  },
  {
    id: 'contact-heavy',
    name: 'Contato Gigante',
    desc: 'Telefone + QR Code dominam + Cards mínimos',
    icon: '📞',
    preview: 'card1 (gigante) → photo → servicesCards'
  },
  {
    id: 'services-grid',
    name: 'Grade de Serviços',
    desc: '4 Cards de serviços em grid 2x2',
    icon: '⚙️',
    preview: 'header → photo → 4 cards grid → footer'
  },
  {
    id: 'minimal',
    name: 'Mínimo (Cartão)',
    desc: 'Logo + Telefone + QR apenas',
    icon: '💳',
    preview: 'header → card1 → qr'
  },
  {
    id: 'double-deck',
    name: 'Dois Andares',
    desc: 'Bloco superior + bloco inferior independentes',
    icon: '🏢',
    preview: 'header+photo+card1 | servicesCards+footer'
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
  imagePosition: DEFAULT_IMAGE_POSITION,
  truckViewPreset: 'side',
  
  // Card 1 (Destaque Principal): Contato & Chamada Imediata
  card1Title: 'LIGUE OU CHAME NO WHATSAPP',
  card1Highlight: 'ORÇAMENTO RÁPIDO SEM COMPROMISSO • ATENDIMENTO 24H',
  
  // Card 2 (Secundário 1): Serviços de Fretes (Uma linha por item - HTML Permitido)
  card2Title: 'SERVIÇOS DE FRETES',
  card2Content: '<b>Fretes Urbanos e Intermunicipais</b><br><b>Mudanças Residenciais e Comerciais</b><br><b>Cargas Fechadas e Pequenos Volumes</b><br><b>Entregas e Coletas Rápidas no Dia</b>',
  
  // Card 3 (Secundário 2): Região & Pagamento (Uma linha por item - HTML Permitido)
  card3Title: 'REGIÃO & PAGAMENTO',
  card3Content: '<b>Atendimento:</b> Capital, Litoral e Interior<br><b>Pagamento:</b> Pix, Cartões em até 12x e Dinheiro<br><b>Agilidade:</b> Cargas com Cuidado e Pontualidade<br><b>Orçamento:</b> Rápido e Sem Compromisso',
  
  footerText: 'FRETES COM SEGURANÇA E CONFIANÇA • PEÇA SEU ORÇAMENTO AGORA!',
  showQrCode: true,
  theme: 'clean-white',
  format: 'vertical',
  fontFamily: 'anton',
  elementOrder: ['header', 'photo', 'card1', 'servicesCards', 'footer'],
  template: 'classic'
};
