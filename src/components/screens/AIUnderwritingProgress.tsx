import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Search, FileText, Shield } from 'lucide-react';

interface AIUnderwritingProgressProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 'documents',
    icon: FileText,
    title: 'दस्तावेज़ जांच रहे हैं',
    description: 'आपके KYC दस्तावेज़ों की पुष्टि की जा रही है'
  },
  {
    id: 'credit',
    icon: Search,
    title: 'क्रेडिट स्कोर चेक कर रहे हैं',
    description: 'आपका क्रेडिट इतिहास और स्कोर देख रहे हैं'
  },
  {
    id: 'ai',
    icon: Shield,
    title: 'AI से मंज़ूरी मिल रही है',
    description: 'कृत्रिम बुद्धिमत्ता से आपकी योग्यता की जांच हो रही है'
  }
];

export function AIUnderwritingProgress({ onComplete }: AIUnderwritingProgressProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const currentStep = steps[currentStepIndex];
        
        // Mark current step as completed after 3 seconds
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, currentStep.id]);
          
          if (currentStepIndex === steps.length - 1) {
            // All steps completed, move to next screen after 1 second
            setTimeout(() => {
              onComplete();
            }, 1000);
          } else {
            // Move to next step
            setCurrentStepIndex(prev => prev + 1);
          }
        }, 3000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentStepIndex, onComplete]);

  const getStepStatus = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (completedSteps.includes(step.id)) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="h-full flex flex-col justify-center px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-[#0B7A4A] rounded-full mx-auto mb-6 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        
        <h1 
          className="text-gray-900 font-bold mb-2"
          style={{ fontSize: 'var(--text-headline)' }}
        >
          योग्यता जांची जा रही है
        </h1>
        
        <p 
          className="text-gray-600"
          style={{ fontSize: 'var(--text-body)' }}
        >
          कृपया प्रतीक्षा करें, यह 1-2 मिनट में हो जाएगा
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-6 mb-12">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const StepIcon = step.icon;
          
          return (
            <div 
              key={step.id}
              className={`
                flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-500
                ${status === 'completed' 
                  ? 'border-[#0B7A4A] bg-green-50' 
                  : status === 'current'
                  ? 'border-[#FF8A00] bg-orange-50'
                  : 'border-gray-200 bg-gray-50'
                }
              `}
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${status === 'completed'
                    ? 'bg-[#0B7A4A] text-white'
                    : status === 'current'
                    ? 'bg-[#FF8A00] text-white'
                    : 'bg-gray-300 text-gray-500'
                  }
                `}
              >
                {status === 'completed' ? (
                  <CheckCircle size={24} />
                ) : status === 'current' ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <StepIcon size={24} />
                )}
              </div>
              
              <div className="flex-1">
                <h3 
                  className={`font-medium ${
                    status === 'completed' 
                      ? 'text-[#0B7A4A]' 
                      : status === 'current'
                      ? 'text-[#FF8A00]'
                      : 'text-gray-600'
                  }`}
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-gray-600 mt-1"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  {step.description}
                </p>
              </div>
              
              {status === 'current' && (
                <Clock size={20} className="text-[#FF8A00]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-[#0B7A4A] h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${((completedSteps.length + (currentStepIndex < steps.length ? 0.5 : 0)) / steps.length) * 100}%` 
          }}
        />
      </div>
      
      <p 
        className="text-center text-gray-500"
        style={{ fontSize: 'var(--text-micro)' }}
      >
        {Math.round(((completedSteps.length + (currentStepIndex < steps.length ? 0.5 : 0)) / steps.length) * 100)}% पूरा
      </p>
    </div>
  );
}