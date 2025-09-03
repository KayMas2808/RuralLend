import { useState } from 'react';
import { Phone, Calendar, MessageCircle, Clock, ChevronRight, ChevronDown, Search } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';
import { RLInput } from '../RL-Input';

interface HelpSupportProps {
  onBack: () => void;
}

const faqs = [
  {
    question: 'ऋण कैसे मिलता है?',
    answer: 'KYC पूरी करें, आवेदन दें, 2 मिनट में अप्रूवल मिलेगा और 24 घंटे में पैसा खाते में आ जाएगा।'
  },
  {
    question: 'EMI कैसे भरें?',
    answer: 'UPI, डेबिट कार्ड, या बैंक ट्रांसफर से भुगतान कर सकते हैं। Auto Pay भी सेट कर सकते हैं।'
  },
  {
    question: 'देर से भुगतान करने पर क्या होगा?',
    answer: 'देर से भुगतान पर ₹500 जुर्माना लगेगा और आपका क्रेडिट स्कोर प्रभावित हो सकता है।'
  },
  {
    question: 'ब्याज दर कितनी है?',
    answer: '18% से 36% वार्षिक, आपके क्रेडिट स्कोर के आधार पर निर्धारित होती है।'
  },
  {
    question: 'पहले से चुकता कर सकते हैं?',
    answer: 'हां, बिना किसी अतिरिक्त शुल्क के आप कभी भी पूरा ऋण चुकता कर सकते हैं।'
  },
  {
    question: 'कौन से दस्तावेज़ चाहिए?',
    answer: 'सिर्फ आधार कार्ड और सेल्फी। कोई अन्य कागजात की जरूरत नहीं।'
  }
];

export function HelpSupport({ onBack }: HelpSupportProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq' | 'chat'>('contact');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduledCall, setScheduledCall] = useState(false);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScheduleCall = () => {
    setScheduledCall(true);
  };

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="मदद और सहायता"
        showBack
        onBack={onBack}
      />

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        {[
          { id: 'contact' as const, label: 'संपर्क' },
          { id: 'faq' as const, label: 'FAQ' },
          { id: 'chat' as const, label: 'चैट' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 py-4 px-4 font-medium transition-colors touch-target
              ${activeTab === tab.id 
                ? 'text-[#0B7A4A] border-b-2 border-[#0B7A4A]' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
            style={{ fontSize: 'var(--text-body)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'contact' && (
          <div className="px-6 py-6">
            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => window.open('tel:+918000000000')}
                className="w-full flex items-center gap-4 p-6 bg-[#0B7A4A] text-white rounded-lg hover:bg-[#096A41] transition-colors touch-target"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 
                    className="font-bold"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    तुरंत कॉल करें
                  </h3>
                  <p 
                    className="opacity-90"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    24/7 उपलब्ध • +91 8000000000
                  </p>
                </div>
                <ChevronRight size={20} />
              </button>

              <button
                onClick={handleScheduleCall}
                className="w-full flex items-center gap-4 p-6 bg-white border-2 border-[#FF8A00] text-[#FF8A00] rounded-lg hover:bg-orange-50 transition-colors touch-target"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h3 
                    className="font-bold"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    कॉल शेड्यूल करें
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    आपकी सुविधा के अनुसार समय तय करें
                  </p>
                </div>
                <ChevronRight size={20} />
              </button>
            </div>

            {scheduledCall && (
              <div className="bg-green-50 border-2 border-[#0B7A4A] p-4 rounded-lg mb-6">
                <h4 
                  className="text-[#0B7A4A] font-medium mb-2"
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  कॉल शेड्यूल हो गई!
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  हमारी टीम आज शाम 6 बजे आपको कॉल करेगी। आप चाहें तो समय बदल भी सकते हैं।
                </p>
              </div>
            )}

            {/* Support Hours */}
            <div className="bg-[#F7F9FA] p-4 rounded-lg mb-6">
              <h4 
                className="text-gray-900 font-medium mb-3"
                style={{ fontSize: 'var(--text-body)' }}
              >
                सहायता समय
              </h4>
              
              <div className="space-y-2">
                {[
                  { day: 'सोमवार - शुक्रवार', time: '9:00 AM - 9:00 PM' },
                  { day: 'शनिवार - रविवार', time: '10:00 AM - 6:00 PM' },
                  { day: 'आपातकाल', time: '24/7 उपलब्ध' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span 
                      className="text-gray-700"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {schedule.day}
                    </span>
                    <span 
                      className="text-gray-900 font-medium"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            <div>
              <h4 
                className="text-gray-900 font-medium mb-3"
                style={{ fontSize: 'var(--text-body)' }}
              >
                आम समस्याएं
              </h4>
              
              <div className="space-y-2">
                {[
                  'भुगतान की समस्या',
                  'ऋण स्थिति की जानकारी',
                  'EMI की तारीख बदलना',
                  'दस्तावेज़ अपडेट करना'
                ].map((issue, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  >
                    <span 
                      className="text-gray-700"
                      style={{ fontSize: 'var(--text-body)' }}
                    >
                      {issue}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="px-6 py-6">
            {/* Search */}
            <div className="mb-6">
              <RLInput
                placeholder="सवाल खोजें..."
                value={searchQuery}
                onChange={setSearchQuery}
                leftIcon={<Search size={20} />}
              />
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors touch-target"
                  >
                    <span 
                      className="text-gray-900 font-medium pr-4"
                      style={{ fontSize: 'var(--text-body)' }}
                    >
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronDown size={20} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4">
                      <p 
                        className="text-gray-600"
                        style={{ fontSize: 'var(--text-body)' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  कोई सवाल नहीं मिला। कृपया अलग तरीके से खोजें।
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="px-6 py-6">
            {/* Chatbot Interface */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#0B7A4A] rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageCircle size={32} className="text-white" />
              </div>
              
              <h3 
                className="text-gray-900 font-bold mb-2"
                style={{ fontSize: 'var(--text-headline-sm)' }}
              >
                AI चैटबॉट
              </h3>
              
              <p 
                className="text-gray-600 mb-6"
                style={{ fontSize: 'var(--text-body)' }}
              >
                24/7 उपलब्ध स्मार्ट असिस्टेंट से तुरंत जवाब पाएं
              </p>

              <RLPrimaryButton onClick={() => {}}>
                चैट शुरू करें
              </RLPrimaryButton>
            </div>

            {/* Chat Features */}
            <div className="mt-6">
              <h4 
                className="text-gray-900 font-medium mb-3"
                style={{ fontSize: 'var(--text-body)' }}
              >
                चैटबॉट आपकी इन चीजों में मदद कर सकता है:
              </h4>
              
              <div className="space-y-2">
                {[
                  'ऋण की स्थिति जांचना',
                  'EMI की जानकारी',
                  'भुगतान के तरीके',
                  'दस्तावेज़ अपलोड करना',
                  'बुनियादी सवालों के जवाब'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0B7A4A] rounded-full" />
                    <span 
                      className="text-gray-700"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="p-6 bg-white border-t border-gray-100">
        <RLSecondaryButton onClick={onBack}>
          होम पर वापस जाएं
        </RLSecondaryButton>
      </div>
    </div>
  );
}