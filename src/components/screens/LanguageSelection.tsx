import { CheckCircle } from 'lucide-react';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import type { Language } from '../../App';

interface LanguageSelectionProps {
  selectedLanguage: Language;
  onLanguageSelect: (language: Language) => void;
  onGetStarted: () => void;
}

const languages = [
  { code: 'hindi' as Language, name: 'हिंदी', nativeName: 'Hindi' },
  { code: 'tamil' as Language, name: 'தமிழ்', nativeName: 'Tamil' },
  { code: 'telugu' as Language, name: 'తెలుగు', nativeName: 'Telugu' },
  { code: 'marathi' as Language, name: 'मराठी', nativeName: 'Marathi' },
  { code: 'bengali' as Language, name: 'বাংলা', nativeName: 'Bengali' },
  { code: 'english' as Language, name: 'English', nativeName: 'English' },
];

export function LanguageSelection({ 
  selectedLanguage, 
  onLanguageSelect, 
  onGetStarted 
}: LanguageSelectionProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header with Logo */}
      <div className="text-center pt-16 pb-12">
        <div className="w-20 h-20 bg-[#0B7A4A] rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">RL</span>
        </div>
        <h1 
          className="text-[#0B7A4A] font-bold mb-2"
          style={{ fontSize: 'var(--text-headline)' }}
        >
          RuralLend
        </h1>
        <p 
          className="text-gray-600"
          style={{ fontSize: 'var(--text-body)' }}
        >
          तुरंत व्यक्तिगत ऋण
        </p>
      </div>

      {/* Language Selection */}
      <div className="flex-1 px-6">
        <h2 
          className="text-center text-gray-900 font-bold mb-8"
          style={{ fontSize: 'var(--text-headline-sm)' }}
        >
          अपनी भाषा चुनें
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 touch-target
                ${selectedLanguage === language.code
                  ? 'border-[#0B7A4A] bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <div className="text-center">
                <div 
                  className="font-bold mb-1"
                  style={{ fontSize: 'var(--text-headline-sm)' }}
                >
                  {language.name}
                </div>
                <div 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  {language.nativeName}
                </div>
              </div>
              
              {selectedLanguage === language.code && (
                <CheckCircle 
                  size={20} 
                  className="absolute top-2 right-2 text-[#0B7A4A]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 pt-0">
        <RLPrimaryButton onClick={onGetStarted}>
          शुरू करें
        </RLPrimaryButton>
        
        <p 
          className="text-center text-gray-500 mt-4"
          style={{ fontSize: 'var(--text-micro)' }}
        >
          आप बाद में भाषा बदल सकते हैं
        </p>
      </div>
    </div>
  );
}