import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.electrishop.app',
  appName: 'ElectriShop',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
