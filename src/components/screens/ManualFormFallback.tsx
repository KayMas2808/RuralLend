import { useState } from 'react';
import { RLHeader } from '../RL-Header';
import { RLInput } from '../RL-Input';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';
import { IndianRupee, Calendar, Target, Phone } from 'lucide-react';

interface ManualFormFallbackProps {
  onBack: () => void;
  onComplete: (formData: {
    amount: number;
    tenure: number;
    purpose: string;
    mobileNumber: string;
  }) => void;
}

export function ManualFormFallback({ onBack, onComplete }: ManualFormFallbackProps) {
  const [formData, setFormData] = useState({
    amount: '',
    tenure: '',
    purpose: '',
    mobileNumber: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const purposes = [
    'घर की मरम्मत',
    'व्यापार',
    'शिक्षा',
    'चिकित्सा',
    'शादी-विवाह',
    'कृषि',
    'अन्य'
  ];

  const tenures = [
    { value: '3', label: '3 महीने' },
    { value: '6', label: '6 महीने' },
    { value: '12', label: '12 महीने' },
    { value: '18', label: '18 महीने' },
    { value: '24', label: '24 महीने' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || Number(formData.amount) < 1000) {
      newErrors.amount = 'कम से कम ₹1,000 डालें';
    }
    if (Number(formData.amount) > 200000) {
      newErrors.amount = 'अधिकतम ₹2,00,000 तक';
    }

    if (!formData.tenure) {
      newErrors.tenure = 'अवधि चुनें';
    }

    if (!formData.purpose) {
      newErrors.purpose = 'उद्देश्य चुनें';
    }

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'वैध 10 अंकों का नंबर डालें';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete({
        amount: Number(formData.amount),
        tenure: Number(formData.tenure),
        purpose: formData.purpose,
        mobileNumber: formData.mobileNumber
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="ऋण विवरण"
        showBack
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-6">
          {/* Amount Input */}
          <RLInput
            label="आपको कितने पैसे चाहिए? *"
            placeholder="50000"
            type="number"
            value={formData.amount}
            onChange={(value) => setFormData({ ...formData, amount: value })}
            leftIcon={<IndianRupee size={20} />}
            error={errors.amount}
            helperText="₹1,000 से ₹2,00,000 तक"
          />

          {/* Tenure Selection */}
          <div>
            <label 
              className="block text-gray-700 font-medium mb-3"
              style={{ fontSize: 'var(--text-body)' }}
            >
              कितने महीने में वापस करेंगे? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tenures.map((tenure) => (
                <button
                  key={tenure.value}
                  onClick={() => setFormData({ ...formData, tenure: tenure.value })}
                  className={`
                    p-3 border-2 rounded-lg transition-all duration-200 touch-target
                    ${formData.tenure === tenure.value
                      ? 'border-[#0B7A4A] bg-green-50 text-[#0B7A4A]'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  <Calendar size={20} className="mx-auto mb-1" />
                  <span style={{ fontSize: 'var(--text-body)' }}>{tenure.label}</span>
                </button>
              ))}
            </div>
            {errors.tenure && (
              <p 
                className="text-[#D3382A] mt-1"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                {errors.tenure}
              </p>
            )}
          </div>

          {/* Purpose Selection */}
          <div>
            <label 
              className="block text-gray-700 font-medium mb-3"
              style={{ fontSize: 'var(--text-body)' }}
            >
              पैसे का उपयोग किसके लिए? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {purposes.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => setFormData({ ...formData, purpose })}
                  className={`
                    p-3 border-2 rounded-lg transition-all duration-200 touch-target text-left
                    ${formData.purpose === purpose
                      ? 'border-[#0B7A4A] bg-green-50 text-[#0B7A4A]'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  <div className="flex items-center gap-2">
                    <Target size={16} />
                    <span style={{ fontSize: 'var(--text-body)' }}>{purpose}</span>
                  </div>
                </button>
              ))}
            </div>
            {errors.purpose && (
              <p 
                className="text-[#D3382A] mt-1"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                {errors.purpose}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <RLInput
            label="आपका मोबाइल नंबर *"
            placeholder="9123456789"
            type="tel"
            value={formData.mobileNumber}
            onChange={(value) => setFormData({ ...formData, mobileNumber: value.replace(/\D/g, '') })}
            leftIcon={<Phone size={20} />}
            error={errors.mobileNumber}
            helperText="OTP भेजने के लिए"
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-3">
        <RLPrimaryButton onClick={handleSubmit}>
          आगे बढ़ें
        </RLPrimaryButton>
        <RLSecondaryButton onClick={onBack}>
          वापस आवाज़ में भरें
        </RLSecondaryButton>
      </div>
    </div>
  );
}