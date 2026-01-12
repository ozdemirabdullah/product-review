import React, { createContext, useContext, useState, type ReactNode as ReactNodeType } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    tr: {
        title: 'Ürün İncelemeleri',
        products: 'Ürünler',
        darkMode: 'Karanlık Mod',
        lightMode: 'Aydınlık Mod',
        product1: {
            name: 'Ürün 1',
            description: 'Bu yüksek kaliteli bir üründür. Günlük kullanım için idealdir.',
            features: ['Dayanıksız malzeme', 'Kolay kullanım', 'Uzun ömürlü']
        },
        product2: {
            name: 'Ürün 2',
            description: 'Modern tasarım ile öne çıkan bu ürün, teknoloji severler için mükemmel.',
            features: ['Akıllı özellikler', 'Kablosuz bağlantı', 'Hızlı şarj']
        },
        product3: {
            name: 'Ürün 3',
            description: 'Şık ve fonksiyonel bir ürün. Her ortamda uyum sağlar.',
            features: ['Şık tasarım', 'Çok yönlü kullanım', 'Garantili']
        },
        product4: {
            name: 'Ürün 4',
            description: 'Premium kalitede bir ürün. Lüks ve konfor sunar.',
            features: ['Premium malzemeler', 'Lüks his', 'Uzman desteği']
        }
    },
    en: {
        title: 'Product Reviews',
        products: 'Products',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        product1: {
            name: 'Product 1',
            description: 'This is a high-quality product. Ideal for daily use.',
            features: ['Durable material', 'Easy to use', 'Long-lasting']
        },
        product2: {
            name: 'Product 2',
            description: 'This product stands out with its modern design, perfect for tech enthusiasts.',
            features: ['Smart features', 'Wireless connection', 'Fast charging']
        },
        product3: {
            name: 'Product 3',
            description: 'A stylish and functional product. Fits in any environment.',
            features: ['Stylish design', 'Versatile use', 'Warranted']
        },
        product4: {
            name: 'Product 4',
            description: 'A premium quality product. Offers luxury and comfort.',
            features: ['Premium materials', 'Luxurious feel', 'Expert support']
        }
    }
};

export const LanguageProvider: React.FC<{ children: ReactNodeType }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('tr');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
    };

    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};