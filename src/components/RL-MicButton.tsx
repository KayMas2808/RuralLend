import { Mic, MicOff, Square } from 'lucide-react';

interface RLMicButtonProps {
  isListening?: boolean;
  isProcessing?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RLMicButton({ 
  isListening = false,
  isProcessing = false,
  onClick,
  disabled = false,
  size = 'md',
  className = ''
}: RLMicButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        transition-all duration-300 transform active:scale-95 shadow-lg touch-target
        ${isListening 
          ? 'bg-[#D3382A] hover:bg-[#B8302A] animate-pulse' 
          : 'bg-[#0B7A4A] hover:bg-[#096A41]'
        }
        ${disabled || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isProcessing ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isListening ? (
        <Square size={iconSizes[size]} className="text-white fill-current" />
      ) : (
        <Mic size={iconSizes[size]} className="text-white" />
      )}
    </button>
  );
}