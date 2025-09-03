import { useState } from 'react';
import { Volume2, FileText, Shield, CreditCard } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLOfferCard } from '../RL-OfferCard';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface ConsentTermsProps {
  loanData: {
    amount?: number;
    tenure?: number;
    purpose?: string;
    mobileNumber?: string;
  };
  onBack: () => void;
  onAccept: () => void;
}

export function ConsentTerms({ loanData, onBack, onAccept }: ConsentTermsProps) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock loan offer based on input
  const mockOffer = {
    status: 'pending' as const,
    amount: loanData.amount || 50000,
    tenure: loanData.tenure || 12,
    emi: Math.round((loanData.amount || 50000) * 1.18 / (loanData.tenure || 12)),
    interestRate: 18,
    processingFee: Math.round((loanData.amount || 50000) * 0.02)
  };

  const terms = [
    {
      icon: <FileText size={20} />,
      title: 'ऋण की शर्तें',
      desc: 'आप समय पर EMI का भुगतान करने के लिए सहमत हैं'
    },
    {
      icon: <Shield size={20} />,
      title: 'डेटा सुरक्षा',
      desc: 'आपकी जानकारी सुरक्षित रखी जाएगी और केवल ऋण के लिए उपयोग होगी'
    },
    {
      icon: <CreditCard size={20} />,
      title: 'क्रेडिट स्कोर',
      desc: 'आपका क्रेडिट स्कोर और इतिहास चेक किया जाएगा'
    }
  ];

  const handlePlayAudio = () => {
    setIsPlaying(true);
    
    // Simulate audio playback
    const text = `आप ${mockOffer.amount.toLocaleString('hi-IN')} रुपये के ऋण के लिए आवेदन दे रहे हैं। मासिक EMI ${mockOffer.emi.toLocaleString('hi-IN')} रुपये होगी। ब्याज दर ${mockOffer.interestRate} प्रतिशत वार्षिक है।`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="शर्तें और सहमति"
        showBack
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Loan Summary */}
        <div className="mb-6">
          <h2 
            className="text-gray-900 font-bold mb-4"
            style={{ fontSize: 'var(--text-headline-sm)' }}
          >
            ऋण सारांश
          </h2>
          <RLOfferCard {...mockOffer} />
        </div>

        {/* Audio Playback */}
        <div className="bg-[#F7F9FA] p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="text-gray-900 font-medium"
                style={{ fontSize: 'var(--text-body)' }}
              >
                ऑडियो में सुनें
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                ऋण की विस्तृत जानकारी
              </p>
            </div>
            <button
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-colors touch-target
                ${isPlaying 
                  ? 'bg-[#FF8A00] animate-pulse' 
                  : 'bg-[#0B7A4A] hover:bg-[#096A41]'
                }
              `}
            >
              {isPlaying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Volume2 size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6">
          <h3 
            className="text-gray-900 font-medium mb-4"
            style={{ fontSize: 'var(--text-body)' }}
          >
            मुख्य शर्तें
          </h3>
          
          <div className="space-y-4">
            {terms.map((term, index) => (
              <div key={index} className="flex gap-3 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="text-[#0B7A4A] mt-1">
                  {term.icon}
                </div>
                <div>
                  <h4 
                    className="text-gray-900 font-medium mb-1"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {term.title}
                  </h4>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {term.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 w-5 h-5 text-[#0B7A4A] rounded focus:ring-[#0B7A4A] focus:ring-2"
            />
            <div>
              <p 
                className="text-gray-900 font-medium"
                style={{ fontSize: 'var(--text-body)' }}
              >
                मैं सभी शर्तों से सहमत हूं
              </p>
              <p 
                className="text-gray-600 mt-1"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                मैंने सभी नियम और शर्तें पढ़ी हैं और मैं इनसे सहमत हूं। मैं समझता हूं कि समय पर भुगतान न करने पर अतिरिक्त शुल्क लग सकता है।
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-3">
        <RLPrimaryButton 
          onClick={onAccept}
          disabled={!consentGiven}
        >
          स्वीकार करें और आगे बढ़ें
        </RLPrimaryButton>
        <RLSecondaryButton onClick={onBack}>
          वापस जाएं
        </RLSecondaryButton>
      </div>
    </div>
  );
}