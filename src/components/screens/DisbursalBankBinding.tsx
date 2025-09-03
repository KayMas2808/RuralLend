import { useState } from 'react';
import { Banknote, Smartphone, Building2, CheckCircle, Copy } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLInput } from '../RL-Input';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface DisbursalBankBindingProps {
  loanAmount: number;
  onBack: () => void;
  onComplete: () => void;
}

export function DisbursalBankBinding({ loanAmount, onBack, onComplete }: DisbursalBankBindingProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'bank' | 'cash'>('upi');
  const [upiId, setUpiId] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
    }, 3000);
  };

  const handleComplete = () => {
    onComplete();
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('test@paytm');
    // You could add a toast notification here
  };

  const methods = [
    {
      id: 'upi' as const,
      icon: <Smartphone size={24} />,
      title: 'UPI ID',
      subtitle: 'तुरंत मिल जाएगा',
      recommended: true
    },
    {
      id: 'bank' as const,
      icon: <Building2 size={24} />,
      title: 'बैंक अकाउंट',
      subtitle: '2-4 घंटे में मिलेगा',
      recommended: false
    },
    {
      id: 'cash' as const,
      icon: <Banknote size={24} />,
      title: 'कैश कलेक्शन',
      subtitle: 'एजेंट आएगा',
      recommended: false
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="पैसा कैसे पाना चाहते हैं?"
        showBack
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Amount Display */}
        <div className="bg-[#0B7A4A] text-white p-6 rounded-lg mb-6 text-center">
          <h2 
            className="font-bold mb-2"
            style={{ fontSize: 'var(--text-headline-sm)' }}
          >
            मिलने वाली रकम
          </h2>
          <p 
            className="text-3xl font-bold"
            style={{ fontSize: 'var(--text-headline)' }}
          >
            ₹{loanAmount.toLocaleString('hi-IN')}
          </p>
        </div>

        {/* Method Selection */}
        <div className="mb-6">
          <h3 
            className="text-gray-900 font-medium mb-4"
            style={{ fontSize: 'var(--text-body)' }}
          >
            पेमेंट का तरीका चुनें
          </h3>
          
          <div className="space-y-3">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`
                  w-full p-4 border-2 rounded-lg transition-all duration-200 touch-target
                  ${selectedMethod === method.id
                    ? 'border-[#0B7A4A] bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${selectedMethod === method.id ? 'bg-[#0B7A4A] text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {method.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h4 
                        className="font-medium text-gray-900"
                        style={{ fontSize: 'var(--text-body)' }}
                      >
                        {method.title}
                      </h4>
                      {method.recommended && (
                        <span 
                          className="bg-[#FF8A00] text-white px-2 py-1 rounded text-xs font-bold"
                          style={{ fontSize: 'var(--text-micro)' }}
                        >
                          सुझाव
                        </span>
                      )}
                    </div>
                    <p 
                      className="text-gray-600"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {method.subtitle}
                    </p>
                  </div>

                  {selectedMethod === method.id && (
                    <CheckCircle size={20} className="text-[#0B7A4A]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields based on selected method */}
        {selectedMethod === 'upi' && (
          <div className="space-y-4">
            <RLInput
              label="आपकी UPI ID डालें"
              placeholder="yourname@paytm"
              value={upiId}
              onChange={setUpiId}
              helperText="Google Pay, PhonePe, Paytm आदि की UPI ID"
            />
            
            <div className="bg-[#F7F9FA] p-4 rounded-lg">
              <h4 
                className="text-gray-900 font-medium mb-2"
                style={{ fontSize: 'var(--text-body)' }}
              >
                UPI ID कैसे पता करें?
              </h4>
              <p 
                className="text-gray-600 mb-3"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                अपना UPI ऐप खोलें → Profile → UPI ID दिखेगी
              </p>
              
              <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded">
                <span 
                  className="text-gray-700 flex-1"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  example: test@paytm
                </span>
                <button
                  onClick={copyUpiId}
                  className="text-[#0B7A4A] hover:bg-green-50 p-1 rounded"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="space-y-4">
            <RLInput
              label="खाता संख्या"
              placeholder="1234567890"
              value={bankDetails.accountNumber}
              onChange={(value) => setBankDetails({ ...bankDetails, accountNumber: value })}
            />
            
            <RLInput
              label="IFSC कोड"
              placeholder="SBIN0001234"
              value={bankDetails.ifscCode}
              onChange={(value) => setBankDetails({ ...bankDetails, ifscCode: value.toUpperCase() })}
            />
            
            <RLInput
              label="खाताधारक का नाम"
              placeholder="आपका नाम जैसा बैंक में है"
              value={bankDetails.accountHolderName}
              onChange={(value) => setBankDetails({ ...bankDetails, accountHolderName: value })}
            />
          </div>
        )}

        {selectedMethod === 'cash' && (
          <div className="bg-[#F7F9FA] p-4 rounded-lg">
            <h4 
              className="text-gray-900 font-medium mb-3"
              style={{ fontSize: 'var(--text-body)' }}
            >
              कैश कलेक्शन की जानकारी
            </h4>
            <ul className="space-y-2">
              {[
                'हमारा एजेंट आपके घर/दुकान आएगा',
                'आपकी सुविधा के अनुसार समय तय होगा',
                'ID proof और लोन agreement साथ लाना',
                'कैश काउंटिंग के बाद रसीद मिलेगी'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#0B7A4A] rounded-full mt-2" />
                  <span 
                    className="text-gray-700"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Verification Status */}
        {isVerified && (
          <div className="bg-green-50 border-2 border-[#0B7A4A] p-4 rounded-lg mt-6">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-[#0B7A4A]" />
              <div>
                <h4 
                  className="text-[#0B7A4A] font-medium"
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  वेरिफाई हो गया!
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  आपका पेमेंट मेथड सफलतापूर्वक जुड़ गया है
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-3">
        {!isVerified ? (
          <>
            <RLPrimaryButton 
              onClick={handleVerify}
              loading={isVerifying}
              disabled={
                (selectedMethod === 'upi' && !upiId) ||
                (selectedMethod === 'bank' && (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName))
              }
            >
              {isVerifying ? 'वेरिफाई कर रहे हैं...' : 'वेरिफाई करें'}
            </RLPrimaryButton>
            <RLSecondaryButton onClick={onBack}>
              वापस जाएं
            </RLSecondaryButton>
          </>
        ) : (
          <RLPrimaryButton onClick={handleComplete}>
            पूरा करें
          </RLPrimaryButton>
        )}
      </div>
    </div>
  );
}