import { Mic, CreditCard, HelpCircle, IndianRupee, Clock, TrendingUp } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import type { Language } from '../../App';

interface HomeScreenProps {
  language: Language;
  onApplyLoan: () => void;
  onMyLoans: () => void;
  onHelp: () => void;
  onLanguageToggle: () => void;
}

export function HomeScreen({ 
  language, 
  onApplyLoan, 
  onMyLoans, 
  onHelp,
  onLanguageToggle 
}: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        showLanguage 
        showProfile
        onLanguageToggle={onLanguageToggle}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Welcome Section */}
        <div className="px-6 py-6">
          <h1 
            className="text-gray-900 font-bold mb-2"
            style={{ fontSize: 'var(--text-headline)' }}
          >
            नमस्ते! 👋
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontSize: 'var(--text-body)' }}
          >
            आपको कितना पैसा चाहिए?
          </p>
        </div>

        {/* Quick Loan Card */}
        <div className="px-6 mb-6">
          <div 
            className="bg-gradient-to-r from-[#0B7A4A] to-[#0D8B54] p-6 text-white shadow-lg"
            style={{ borderRadius: 'var(--radius-card)' }}
          >
            <h2 
              className="font-bold mb-2"
              style={{ fontSize: 'var(--text-headline-sm)' }}
            >
              तुरंत ऋण
            </h2>
            <p 
              className="opacity-90 mb-4"
              style={{ fontSize: 'var(--text-body)' }}
            >
              ₹1,000 से ₹2,00,000 तक
            </p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span style={{ fontSize: 'var(--text-micro)' }}>2 मिनट में अप्रूवल</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp size={16} />
                <span style={{ fontSize: 'var(--text-micro)' }}>18% से शुरू</span>
              </div>
            </div>

            <RLPrimaryButton 
              onClick={onApplyLoan}
              className="bg-[#FF8A00] hover:bg-[#E67A00]"
            >
              <div className="flex items-center justify-center gap-2">
                <Mic size={20} />
                <span>ऋण के लिए आवेदन दें</span>
              </div>
            </RLPrimaryButton>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-6">
          <h3 
            className="text-gray-900 font-medium mb-4"
            style={{ fontSize: 'var(--text-body)' }}
          >
            क्विक एक्शन
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onMyLoans}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow touch-target"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <CreditCard size={24} className="text-[#0B7A4A] mb-2" />
              <p 
                className="text-gray-900 font-medium"
                style={{ fontSize: 'var(--text-body)' }}
              >
                मेरे ऋण
              </p>
              <p 
                className="text-gray-500"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                भुगतान और इतिहास
              </p>
            </button>

            <button
              onClick={onHelp}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow touch-target"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <HelpCircle size={24} className="text-[#FF8A00] mb-2" />
              <p 
                className="text-gray-900 font-medium"
                style={{ fontSize: 'var(--text-body)' }}
              >
                मदद
              </p>
              <p 
                className="text-gray-500"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                सहायता और सपोर्ट
              </p>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="px-6 mb-6">
          <h3 
            className="text-gray-900 font-medium mb-4"
            style={{ fontSize: 'var(--text-body)' }}
          >
            सुविधाएं
          </h3>
          
          <div className="space-y-3">
            {[
              { icon: '🏠', title: 'बिना गारंटी', desc: 'कोई संपत्ति गिरवी नहीं' },
              { icon: '📋', title: 'आसान कागजात', desc: 'सिर्फ आधार और PAN' },
              { icon: '⚡', title: 'तुरंत अप्रूवल', desc: '2 मिनट में जवाब' },
              { icon: '💰', title: 'फ्लेक्सिबल EMI', desc: '3-24 महीने तक' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#F7F9FA] rounded-lg">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p 
                    className="text-gray-900 font-medium"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    {feature.title}
                  </p>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}