import { useState } from 'react';
import { Calendar, CreditCard, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface MyLoansRepaymentProps {
  onBack: () => void;
  onHelp: () => void;
}

const mockLoans = [
  {
    id: 'RL001234',
    amount: 50000,
    emi: 4583,
    tenure: 12,
    paidInstallments: 3,
    nextDueDate: '2024-01-15',
    status: 'active' as const,
    daysUntilDue: 5
  }
];

const mockTransactions = [
  {
    id: 'TXN001',
    date: '2023-12-15',
    amount: 4583,
    type: 'payment' as const,
    status: 'success' as const,
    method: 'UPI'
  },
  {
    id: 'TXN002', 
    date: '2023-11-15',
    amount: 4583,
    type: 'payment' as const,
    status: 'success' as const,
    method: 'Bank Transfer'
  },
  {
    id: 'TXN003',
    date: '2023-10-15',
    amount: 4583,
    type: 'payment' as const,
    status: 'success' as const,
    method: 'UPI'
  }
];

export function MyLoansRepayment({ onBack, onHelp }: MyLoansRepaymentProps) {
  const [activeTab, setActiveTab] = useState<'loans' | 'history'>('loans');

  const activeLoan = mockLoans[0];
  const remainingAmount = (activeLoan.tenure - activeLoan.paidInstallments) * activeLoan.emi;
  const progressPercentage = (activeLoan.paidInstallments / activeLoan.tenure) * 100;

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="मेरे ऋण"
        showBack
        onBack={onBack}
      />

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        {[
          { id: 'loans' as const, label: 'सक्रिय ऋण', count: 1 },
          { id: 'history' as const, label: 'इतिहास', count: mockTransactions.length }
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
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'loans' ? (
          <div className="px-6 py-6">
            {/* Active Loan Card */}
            <div 
              className="bg-white border border-gray-200 p-6 mb-6 shadow-sm"
              style={{ 
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              {/* Loan Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="text-gray-900 font-bold"
                    style={{ fontSize: 'var(--text-headline-sm)' }}
                  >
                    ऋण #{activeLoan.id}
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    मूल राशि: ₹{activeLoan.amount.toLocaleString('hi-IN')}
                  </p>
                </div>
                <span className="bg-green-100 text-[#0B7A4A] px-3 py-1 rounded-full font-medium text-xs">
                  सक्रिय
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    प्रगति: {activeLoan.paidInstallments}/{activeLoan.tenure} EMI
                  </span>
                  <span 
                    className="text-[#0B7A4A] font-medium"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#0B7A4A] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    अगली EMI
                  </p>
                  <p 
                    className="text-gray-900 font-bold"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    ₹{activeLoan.emi.toLocaleString('hi-IN')}
                  </p>
                </div>
                <div>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    बची राशि
                  </p>
                  <p 
                    className="text-gray-900 font-bold"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    ₹{remainingAmount.toLocaleString('hi-IN')}
                  </p>
                </div>
              </div>

              {/* Due Date Alert */}
              <div className={`
                flex items-center gap-3 p-3 rounded-lg
                ${activeLoan.daysUntilDue <= 3 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-orange-50 border border-orange-200'
                }
              `}>
                <AlertCircle 
                  size={20} 
                  className={activeLoan.daysUntilDue <= 3 ? 'text-[#D3382A]' : 'text-[#FF8A00]'} 
                />
                <div>
                  <p 
                    className="font-medium text-gray-900"
                    style={{ fontSize: 'var(--text-body)' }}
                  >
                    अगली भुगतान तिथि: {activeLoan.nextDueDate}
                  </p>
                  <p 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {activeLoan.daysUntilDue} दिन बाकी
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-6">
              <h4 
                className="text-gray-900 font-medium mb-4"
                style={{ fontSize: 'var(--text-body)' }}
              >
                भुगतान के तरीके
              </h4>
              
              <div className="space-y-3">
                {[
                  { icon: <CreditCard size={20} />, title: 'UPI/Debit Card', subtitle: 'तुरंत भुगतान' },
                  { icon: <Calendar size={20} />, title: 'Auto Pay सेट करें', subtitle: 'भूलने की जरूरत नहीं' },
                  { icon: <Clock size={20} />, title: 'बैंक ट्रांसफर', subtitle: '2-4 घंटे में' }
                ].map((option, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  >
                    <div className="text-[#0B7A4A]">
                      {option.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p 
                        className="text-gray-900 font-medium"
                        style={{ fontSize: 'var(--text-body)' }}
                      >
                        {option.title}
                      </p>
                      <p 
                        className="text-gray-600"
                        style={{ fontSize: 'var(--text-micro)' }}
                      >
                        {option.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Transaction History */
          <div className="px-6 py-6">
            <h3 
              className="text-gray-900 font-medium mb-4"
              style={{ fontSize: 'var(--text-body)' }}
            >
              भुगतान इतिहास
            </h3>
            
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="bg-white border border-gray-200 p-4 rounded-lg flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} className="text-[#0B7A4A]" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p 
                          className="text-gray-900 font-medium"
                          style={{ fontSize: 'var(--text-body)' }}
                        >
                          EMI भुगतान
                        </p>
                        <p 
                          className="text-gray-600"
                          style={{ fontSize: 'var(--text-micro)' }}
                        >
                          {transaction.date} • {transaction.method}
                        </p>
                      </div>
                      <div className="text-right">
                        <p 
                          className="text-gray-900 font-bold"
                          style={{ fontSize: 'var(--text-body)' }}
                        >
                          ₹{transaction.amount.toLocaleString('hi-IN')}
                        </p>
                        <span className="bg-green-100 text-[#0B7A4A] px-2 py-1 rounded text-xs">
                          सफल
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100">
        {activeTab === 'loans' ? (
          <div className="space-y-3">
            <RLPrimaryButton onClick={() => {}}>
              अभी भुगतान करें
            </RLPrimaryButton>
            <RLSecondaryButton onClick={onHelp}>
              <div className="flex items-center justify-center gap-2">
                <HelpCircle size={20} />
                <span>मदद चाहिए?</span>
              </div>
            </RLSecondaryButton>
          </div>
        ) : (
          <RLSecondaryButton onClick={() => {}}>
            विस्तृत रिपोर्ट डाउनलोड करें
          </RLSecondaryButton>
        )}
      </div>
    </div>
  );
}