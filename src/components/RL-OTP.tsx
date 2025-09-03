import { useState, useRef, useEffect } from 'react';

interface RLOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function RLOTP({ 
  length = 6,
  value = '',
  onChange,
  disabled = false,
  error,
  className = ''
}: RLOTPProps) {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value) {
      const values = value.split('').slice(0, length);
      const newValues = [...values, ...Array(length - values.length).fill('')];
      setOtpValues(newValues);
    }
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;
    
    // Only allow single digits
    if (digit.length > 1) digit = digit.slice(-1);
    if (!/^\d*$/.test(digit)) return;

    const newValues = [...otpValues];
    newValues[index] = digit;
    setOtpValues(newValues);

    // Call onChange with complete OTP
    onChange?.(newValues.join(''));

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);
    
    const newValues = Array(length).fill('');
    for (let i = 0; i < digits.length; i++) {
      newValues[i] = digits[i];
    }
    
    setOtpValues(newValues);
    onChange?.(newValues.join(''));
    
    // Focus the next empty input or the last filled input
    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-center gap-3">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpValues[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`
              w-12 h-12 text-center border-2 rounded-lg font-bold transition-all duration-200
              ${error 
                ? 'border-[#D3382A] focus:border-[#D3382A] focus:ring-[#D3382A]' 
                : 'border-gray-300 focus:border-[#0B7A4A] focus:ring-[#0B7A4A]'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'}
              focus:outline-none focus:ring-2 focus:ring-opacity-20
            `}
            style={{ 
              fontSize: 'var(--text-headline-sm)',
              borderRadius: 'var(--radius-input)'
            }}
          />
        ))}
      </div>
      
      {error && (
        <p 
          className="text-[#D3382A] text-center" 
          style={{ fontSize: 'var(--text-micro)' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}