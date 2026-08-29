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
  driverName: 'Transportes & Fretes',
  phone: '(11) 98765-4321',
  phoneSecondary: '',
  vehicleType: 'CAMINHÃO BAÚ FECHADO',
  truckPhotoUrl: truckRedBauImg,
  servicesSummary: '• Fretes Urbanos e Viagens\n• Mudanças e Encomendas\n• Coletas e Entregas em Geral',
  coverageArea: 'Capital, Interior e Litoral',
  paymentInfo: 'Pix, Cartão e Dinheiro',
  showQrCode: true,
  theme: 'yellow-black',
  format: 'vertical'
};
