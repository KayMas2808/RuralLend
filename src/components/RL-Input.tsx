import { ReactNode, forwardRef } from 'react';

interface RLInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'number' | 'tel' | 'email';
  disabled?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export const RLInput = forwardRef<HTMLInputElement, RLInputProps>(({ 
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = ''
}, ref) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          className="block text-gray-700 font-medium"
          style={{ fontSize: 'var(--text-body)' }}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 bg-[#F7F9FA] border rounded-lg transition-all duration-200
            ${leftIcon ? 'pl-12' : ''}
            ${rightIcon ? 'pr-12' : ''}
            ${error 
              ? 'border-[#D3382A] focus:border-[#D3382A] focus:ring-[#D3382A]' 
              : 'border-[#E5E7EB] focus:border-[#0B7A4A] focus:ring-[#0B7A4A]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
          style={{ 
            fontSize: 'var(--text-body)',
            borderRadius: 'var(--radius-input)',
            minHeight: 'var(--touch-target)'
          }}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p 
          className="text-[#D3382A]" 
          style={{ fontSize: 'var(--text-micro)' }}
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p 
          className="text-gray-500" 
          style={{ fontSize: 'var(--text-micro)' }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

RLInput.displayName = 'RLInput';