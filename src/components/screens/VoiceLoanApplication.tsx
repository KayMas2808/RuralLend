import { useState, useEffect } from 'react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLMicButton } from '../RL-MicButton';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface VoiceLoanApplicationProps {
  onBack: () => void;
  onManualFallback: () => void;
  onComplete: (transcript: string) => void;
}

export function VoiceLoanApplication({ 
  onBack, 
  onManualFallback, 
  onComplete 
}: VoiceLoanApplicationProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const prompts = [
    'आपको कितने पैसे की जरूरत है?',
    'यह पैसा किस काम के लिए चाहिए?',
    'आप कितने महीने में वापस करना चाहते हैं?',
    'आपका मोबाइल नंबर क्या है?'
  ];

  useEffect(() => {
    // Speak the current prompt
    if (isSpeakerOn && currentStep < prompts.length) {
      speakText(prompts[currentStep]);
    }
  }, [currentStep, isSpeakerOn]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && isSpeakerOn) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsProcessing(true);
      setIsListening(false);
      
      // Mock responses based on current step
      const mockResponses = [
        'मुझे पचास हजार रुपये चाहिए',
        'घर की मरम्मत के लिए',
        'बारह महीने में वापस करूंगा',
        'मेरा नंबर है नौ एक दो तीन चार पांच छह सात आठ नौ'
      ];
      
      setTimeout(() => {
        const response = mockResponses[currentStep] || 'समझ नहीं आया';
        setTranscript(prev => prev + (prev ? '\n' : '') + `प्रश्न ${currentStep + 1}: ${response}`);
        setIsProcessing(false);
        
        if (currentStep < prompts.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, 2000);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    onComplete(transcript);
  };

  const isComplete = currentStep >= prompts.length - 1 && transcript && !isProcessing;

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="ऋण आवेदन"
        showBack
        onBack={onBack}
      />

      <div className="flex-1 flex flex-col px-6 py-6">
        {/* Speaker Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSpeakerOn ? (
              <Volume2 size={24} className="text-[#0B7A4A]" />
            ) : (
              <VolumeX size={24} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span 
              className="text-gray-600"
              style={{ fontSize: 'var(--text-micro)' }}
            >
              प्रगति: {currentStep + 1}/{prompts.length}
            </span>
            <span 
              className="text-[#0B7A4A] font-medium"
              style={{ fontSize: 'var(--text-micro)' }}
            >
              {Math.round(((currentStep + 1) / prompts.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#0B7A4A] h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / prompts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Question */}
        <div className="text-center mb-8">
          <h2 
            className="text-gray-900 font-bold mb-4"
            style={{ fontSize: 'var(--text-headline-sm)' }}
          >
            {currentStep < prompts.length ? prompts[currentStep] : 'सभी जानकारी मिल गई!'}
          </h2>
          
          {isProcessing && (
            <p 
              className="text-[#FF8A00]"
              style={{ fontSize: 'var(--text-body)' }}
            >
              समझ रहे हैं...
            </p>
          )}
        </div>

        {/* Mic Button */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RLMicButton
              size="lg"
              isListening={isListening}
              isProcessing={isProcessing}
              onClick={handleMicClick}
              disabled={isComplete}
            />
            
            <p 
              className="mt-4 text-gray-600"
              style={{ fontSize: 'var(--text-body)' }}
            >
              {isListening 
                ? 'सुन रहे हैं...' 
                : isProcessing 
                ? 'प्रोसेसिंग...'
                : isComplete
                ? 'पूरा हो गया!'
                : 'बोलने के लिए दबाएं'
              }
            </p>
          </div>
        </div>

        {/* Live Transcript */}
        {transcript && (
          <div className="mb-6">
            <h3 
              className="text-gray-900 font-medium mb-2"
              style={{ fontSize: 'var(--text-body)' }}
            >
              आपकी जानकारी:
            </h3>
            <div 
              className="bg-[#F7F9FA] p-4 rounded-lg border whitespace-pre-line"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <p style={{ fontSize: 'var(--text-body)' }}>{transcript}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isComplete ? (
            <>
              <RLPrimaryButton onClick={handleConfirm}>
                जानकारी पुष्टि करें
              </RLPrimaryButton>
              <RLSecondaryButton onClick={() => {
                setTranscript('');
                setCurrentStep(0);
              }}>
                दोबारा शुरू करें
              </RLSecondaryButton>
            </>
          ) : (
            <RLSecondaryButton onClick={onManualFallback}>
              टाइप करके भरें
            </RLSecondaryButton>
          )}
        </div>
      </div>
    </div>
  );
}