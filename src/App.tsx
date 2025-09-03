import { useState } from 'react';
import { LanguageSelection } from './components/screens/LanguageSelection';
import { HomeScreen } from './components/screens/HomeScreen';
import { VoiceLoanApplication } from './components/screens/VoiceLoanApplication';
import { ManualFormFallback } from './components/screens/ManualFormFallback';
import { KYCCapture } from './components/screens/KYCCapture';
import { ConsentTerms } from './components/screens/ConsentTerms';
import { AIUnderwritingProgress } from './components/screens/AIUnderwritingProgress';
import { DecisionOfferScreen } from './components/screens/DecisionOfferScreen';
import { DisbursalBankBinding } from './components/screens/DisbursalBankBinding';
import { MyLoansRepayment } from './components/screens/MyLoansRepayment';
import { HelpSupport } from './components/screens/HelpSupport';
import { OfflineResumeState } from './components/screens/OfflineResumeState';

export type Screen = 
  | 'language'
  | 'home'
  | 'voice-loan'
  | 'manual-form'
  | 'kyc'
  | 'consent'
  | 'underwriting'
  | 'decision'
  | 'disbursal'
  | 'my-loans'
  | 'help'
  | 'offline';

export type Language = 'hindi' | 'tamil' | 'telugu' | 'marathi' | 'bengali' | 'english';

interface AppState {
  currentScreen: Screen;
  language: Language;
  loanApplication: {
    amount?: number;
    tenure?: number;
    purpose?: string;
    mobileNumber?: string;
    voiceTranscript?: string;
  };
  kycData: {
    idPhoto?: string;
    selfiePhoto?: string;
  };
  loanOffer?: {
    status: 'approved' | 'pending' | 'rejected';
    amount: number;
    tenure: number;
    emi: number;
    interestRate: number;
    processingFee: number;
  };
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'language',
    language: 'hindi',
    loanApplication: {},
    kycData: {},
  });

  const navigateTo = (screen: Screen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
  };

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'language':
        return (
          <LanguageSelection
            selectedLanguage={appState.language}
            onLanguageSelect={(language) => updateAppState({ language })}
            onGetStarted={() => navigateTo('home')}
          />
        );
        
      case 'home':
        return (
          <HomeScreen
            language={appState.language}
            onApplyLoan={() => navigateTo('voice-loan')}
            onMyLoans={() => navigateTo('my-loans')}
            onHelp={() => navigateTo('help')}
            onLanguageToggle={() => navigateTo('language')}
          />
        );
        
      case 'voice-loan':
        return (
          <VoiceLoanApplication
            onBack={() => navigateTo('home')}
            onManualFallback={() => navigateTo('manual-form')}
            onComplete={(transcript) => {
              updateAppState({
                loanApplication: { ...appState.loanApplication, voiceTranscript: transcript }
              });
              navigateTo('kyc');
            }}
          />
        );
        
      case 'manual-form':
        return (
          <ManualFormFallback
            onBack={() => navigateTo('voice-loan')}
            onComplete={(formData) => {
              updateAppState({
                loanApplication: { ...appState.loanApplication, ...formData }
              });
              navigateTo('kyc');
            }}
          />
        );
        
      case 'kyc':
        return (
          <KYCCapture
            onBack={() => navigateTo('home')}
            onComplete={(kycData) => {
              updateAppState({ kycData });
              navigateTo('consent');
            }}
          />
        );
        
      case 'consent':
        return (
          <ConsentTerms
            loanData={appState.loanApplication}
            onBack={() => navigateTo('kyc')}
            onAccept={() => navigateTo('underwriting')}
          />
        );
        
      case 'underwriting':
        return (
          <AIUnderwritingProgress
            onComplete={() => {
              // Simulate loan decision
              updateAppState({
                loanOffer: {
                  status: 'approved',
                  amount: 50000,
                  tenure: 12,
                  emi: 4583,
                  interestRate: 18,
                  processingFee: 1000
                }
              });
              navigateTo('decision');
            }}
          />
        );
        
      case 'decision':
        return (
          <DecisionOfferScreen
            offer={appState.loanOffer!}
            onAccept={() => navigateTo('disbursal')}
            onDecline={() => navigateTo('home')}
            onBack={() => navigateTo('home')}
          />
        );
        
      case 'disbursal':
        return (
          <DisbursalBankBinding
            loanAmount={appState.loanOffer?.amount || 0}
            onBack={() => navigateTo('decision')}
            onComplete={() => navigateTo('my-loans')}
          />
        );
        
      case 'my-loans':
        return (
          <MyLoansRepayment
            onBack={() => navigateTo('home')}
            onHelp={() => navigateTo('help')}
          />
        );
        
      case 'help':
        return (
          <HelpSupport
            onBack={() => navigateTo('home')}
          />
        );
        
      case 'offline':
        return (
          <OfflineResumeState
            onRetry={() => navigateTo('home')}
            onResume={() => navigateTo('kyc')}
          />
        );
        
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="mobile-container bg-white shadow-2xl">
        {renderScreen()}
      </div>
      
      {/* Demo Navigation for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-2 rounded text-xs">
          Current: {appState.currentScreen}
        </div>
      )}
    </div>
  );
}