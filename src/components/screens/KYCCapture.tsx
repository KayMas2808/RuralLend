import { useState } from 'react';
import { RLHeader } from '../RL-Header';
import { RLDocCamera } from '../RL-DocCamera';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLProgressBar } from '../RL-ProgressBar';
import { CheckCircle } from 'lucide-react';

interface KYCCaptureProps {
  onBack: () => void;
  onComplete: (kycData: { idPhoto: string; selfiePhoto: string }) => void;
}

export function KYCCapture({ onBack, onComplete }: KYCCaptureProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [idPhoto, setIdPhoto] = useState<string>('');
  const [selfiePhoto, setSelfiePhoto] = useState<string>('');

  const steps = ['ID Photo', 'Selfie', 'Complete'];

  const handleIdCapture = (imageData: string) => {
    setIdPhoto(imageData);
  };

  const handleIdAccept = () => {
    setCurrentStep(1);
  };

  const handleSelfieCapture = (imageData: string) => {
    setSelfiePhoto(imageData);
  };

  const handleSelfieAccept = () => {
    setCurrentStep(2);
  };

  const handleComplete = () => {
    onComplete({ idPhoto, selfiePhoto });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <RLDocCamera
            title="आधार कार्ड की फोटो लें"
            subtitle="कार्ड को फ्रेम के अंदर रखें और साफ फोटो लें"
            onCapture={handleIdCapture}
            onAccept={handleIdAccept}
            capturedImage={idPhoto}
          />
        );
        
      case 1:
        return (
          <RLDocCamera
            title="अपनी सेल्फी लें"
            subtitle="अपना चेहरा साफ दिखाएं और फ्रेम के अंदर रखें"
            onCapture={handleSelfieCapture}
            onAccept={handleSelfieAccept}
            capturedImage={selfiePhoto}
          />
        );
        
      case 2:
        return (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-[#0B7A4A]" />
            </div>
            
            <h2 
              className="text-gray-900 font-bold mb-4"
              style={{ fontSize: 'var(--text-headline-sm)' }}
            >
              KYC पूरा हो गया!
            </h2>
            
            <p 
              className="text-gray-600 mb-8"
              style={{ fontSize: 'var(--text-body)' }}
            >
              आपके दस्तावेज़ सफलतापूर्वक अपलोड हो गए हैं
            </p>

            {/* Document Preview */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center">
                <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                  <img 
                    src={idPhoto} 
                    alt="ID Card"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  आधार कार्ड
                </p>
              </div>
              
              <div className="text-center">
                <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                  <img 
                    src={selfiePhoto} 
                    alt="Selfie"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  सेल्फी फोटो
                </p>
              </div>
            </div>

            <RLPrimaryButton onClick={handleComplete}>
              आगे बढ़ें
            </RLPrimaryButton>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="KYC वेरिफिकेशन"
        showBack
        onBack={onBack}
      />

      <div className="px-6 py-6">
        <RLProgressBar
          progress={(currentStep / (steps.length - 1)) * 100}
          steps={steps}
          currentStep={currentStep}
          className="mb-6"
        />
      </div>

      <div className="flex-1 px-6 pb-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
}