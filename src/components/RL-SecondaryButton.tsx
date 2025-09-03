import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface RLSecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export function RLSecondaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  className = '',
  type = 'button'
}: RLSecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full border-2 rounded-lg font-bold transition-all duration-200 touch-target
        ${disabled || loading 
          ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
          : 'border-[#0B7A4A] text-[#0B7A4A] hover:bg-[#0B7A4A] hover:text-white active:bg-[#096A41]'
        }
        ${className}
      `}
      style={{ 
        minHeight: 'var(--touch-target)',
        fontSize: 'var(--text-button)',
        borderRadius: 'var(--radius-button)',
        padding: '10px 24px'
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 size={20} className="animate-spin" />}
        <span>{children}</span>
      </div>
    </button>
  );
}