import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
    internationalization: {
        locales: [
            Locales.ENGLISH,
            Locales.TURKISH,
            Locales.GERMAN,
            Locales.FRENCH,
            Locales.SPANISH,
            Locales.ITALIAN,
            Locales.ARABIC,
            Locales.RUSSIAN,
            Locales.CHINESE,
            Locales.JAPANESE,
            Locales.PORTUGUESE,
            Locales.DUTCH,
            Locales.KOREAN,
            Locales.FARSI,
            Locales.HINDI,
        ],
        defaultLocale: Locales.ENGLISH,
    },
};

export default config;