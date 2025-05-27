/// <reference types="vite/client" />
import "./types/intlayer.d.ts";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Add process declaration for compatibility
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string | undefined;
  }
};

// Add declaration for Intlayer global dictionaries
interface IntlayerDictionaryContent {
  [key: string]: { 
    en: string; 
    tr: string;
    [key: string]: string;
  } | IntlayerDictionaryContent;
}

interface Window {
  __INTLAYER_DICTIONARIES__?: Record<string, IntlayerDictionaryContent>;
}
