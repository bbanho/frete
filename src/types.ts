export type FlyerTheme = 
  | 'yellow-black' 
  | 'blue-white' 
  | 'clean-light'
  | 'dark-contrast';

export type FlyerFormat = 'vertical' | 'square' | 'card';

export interface FlyerData {
  title: string;
  driverName: string;
  phone: string;
  phoneSecondary: string;
  vehicleType: string;
  truckPhotoUrl: string;
  servicesSummary: string;
  coverageArea: string;
  paymentInfo: string;
  showQrCode: boolean;
  theme: FlyerTheme;
  format: FlyerFormat;
}

export interface TruckPreset {
  id: string;
  name: string;
  url: string;
  tag: string;
}
