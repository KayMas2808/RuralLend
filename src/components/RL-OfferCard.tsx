import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface RLOfferCardProps {
  status: 'approved' | 'pending' | 'rejected';
  amount: number;
  tenure: number;
  emi: number;
  interestRate: number;
  processingFee?: number;
  className?: string;
}

export function RLOfferCard({ 
  status,
  amount,
  tenure,
  emi,
  interestRate,
  processingFee = 0,
  className = ''
}: RLOfferCardProps) {
  const statusConfig = {
    approved: {
      icon: CheckCircle,
      color: 'text-[#0B7A4A]',
      bgColor: 'bg-green-50',
      borderColor: 'border-[#0B7A4A]',
      title: 'ऋण स्वीकृत!'
    },
    pending: {
      icon: Clock,
      color: 'text-[#FF8A00]',
      bgColor: 'bg-orange-50',
      borderColor: 'border-[#FF8A00]',
      title: 'समीक्षा में'
    },
    rejected: {
      icon: XCircle,
      color: 'text-[#D3382A]',
      bgColor: 'bg-red-50',
      borderColor: 'border-[#D3382A]',
      title: 'ऋण अस्वीकृत'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div 
      className={`
        bg-white border-2 p-6 shadow-lg
        ${config.borderColor} ${className}
      `}
      style={{ 
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {/* Status Header */}
      <div className={`flex items-center gap-3 p-3 -m-3 mb-4 rounded-lg ${config.bgColor}`}>
        <StatusIcon size={24} className={config.color} />
        <h3 className={`font-bold ${config.color}`} style={{ fontSize: 'var(--text-headline-sm)' }}>
          {config.title}
        </h3>
      </div>

      {/* Loan Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600" style={{ fontSize: 'var(--text-body)' }}>
            ऋण राशि
          </span>
          <span className="font-bold text-gray-900" style={{ fontSize: 'var(--text-headline-sm)' }}>
            ₹{amount.toLocaleString('hi-IN')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600" style={{ fontSize: 'var(--text-body)' }}>
            अवधि
          </span>
          <span className="font-medium text-gray-900" style={{ fontSize: 'var(--text-body)' }}>
            {tenure} महीने
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600" style={{ fontSize: 'var(--text-body)' }}>
            मासिक EMI
          </span>
          <span className="font-bold text-[#0B7A4A]" style={{ fontSize: 'var(--text-headline-sm)' }}>
            ₹{emi.toLocaleString('hi-IN')}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600" style={{ fontSize: 'var(--text-body)' }}>
            ब्याज दर
          </span>
          <span className="font-medium text-gray-900" style={{ fontSize: 'var(--text-body)' }}>
            {interestRate}% प्रति वर्ष
          </span>
        </div>

        {processingFee > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600" style={{ fontSize: 'var(--text-body)' }}>
              प्रोसेसिंग फीस
            </span>
            <span className="font-medium text-gray-900" style={{ fontSize: 'var(--text-body)' }}>
              ₹{processingFee.toLocaleString('hi-IN')}
            </span>
          </div>
        )}
      </div>

      {/* Total Payable */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900" style={{ fontSize: 'var(--text-body)' }}>
            कुल भुगतान
          </span>
          <span className="font-bold text-gray-900" style={{ fontSize: 'var(--text-headline-sm)' }}>
            ₹{(emi * tenure + processingFee).toLocaleString('hi-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}