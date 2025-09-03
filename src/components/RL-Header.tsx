import { ArrowLeft, Globe, User } from 'lucide-react';

interface RLHeaderProps {
  title?: string;
  showBack?: boolean;
  showLanguage?: boolean;
  showProfile?: boolean;
  onBack?: () => void;
  onLanguageToggle?: () => void;
  onProfile?: () => void;
}

export function RLHeader({ 
  title, 
  showBack = false, 
  showLanguage = false, 
  showProfile = false,
  onBack,
  onLanguageToggle,
  onProfile 
}: RLHeaderProps) {
  return (
    <header 
      className="flex items-center justify-between px-4 bg-white border-b border-gray-100"
      style={{ height: 'var(--header-height)' }}
    >
      {/* Left side */}
      <div className="flex items-center touch-target">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="वापस जाएं"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Center - Title */}
      <div className="flex-1 text-center">
        {title && (
          <h1 
            className="text-gray-900 font-medium leading-none"
            style={{ fontSize: 'var(--text-headline-sm)' }}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {showLanguage && (
          <button 
            onClick={onLanguageToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="भाषा बदलें"
          >
            <Globe size={24} className="text-gray-700" />
          </button>
        )}
        {showProfile && (
          <button 
            onClick={onProfile}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="प्रोफ़ाइल"
          >
            <User size={24} className="text-gray-700" />
          </button>
        )}
      </div>
    </header>
  );
}