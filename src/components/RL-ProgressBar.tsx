interface RLProgressBarProps {
  progress: number; // 0-100
  steps?: string[];
  currentStep?: number;
  className?: string;
}

export function RLProgressBar({ 
  progress, 
  steps = [], 
  currentStep = 0,
  className = '' 
}: RLProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-[#0B7A4A] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {/* Steps (if provided) */}
      {steps.length > 0 && (
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-[#0B7A4A]' : 'text-gray-400'
              }`}
            >
              <div 
                className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold ${
                  index < currentStep 
                    ? 'bg-[#0B7A4A]' 
                    : index === currentStep 
                    ? 'bg-[#FF8A00]' 
                    : 'bg-gray-300'
                }`}
                style={{ fontSize: 'var(--text-micro)' }}
              >
                {index + 1}
              </div>
              <span 
                className="text-xs"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}