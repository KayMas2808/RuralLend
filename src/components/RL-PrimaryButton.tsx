import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface RLPrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function RLPrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  className = '',
  type = 'button'
}: RLPrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full rounded-lg text-white font-bold transition-all duration-200 touch-target
        ${disabled || loading 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-[#FF8A00] hover:bg-[#E67A00] active:bg-[#CC6F00] shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
        }
        ${className}
      `}
      style={{ 
        minHeight: 'var(--touch-target)',
        fontSize: 'var(--text-button)',
        borderRadius: 'var(--radius-button)',
        padding: '12px 24px'
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 size={20} className="animate-spin" />}
        <span>{children}</span>
      </div>
    </button>
  );
}