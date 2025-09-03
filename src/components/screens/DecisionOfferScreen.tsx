import { PartyPopper, XCircle, AlertTriangle } from 'lucide-react';
import { RLHeader } from '../RL-Header';
import { RLOfferCard } from '../RL-OfferCard';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface DecisionOfferScreenProps {
  offer: {
    status: 'approved' | 'pending' | 'rejected';
    amount: number;
    tenure: number;
    emi: number;
    interestRate: number;
    processingFee: number;
  };
  onAccept: () => void;
  onDecline: () => void;
  onBack: () => void;
}

export function DecisionOfferScreen({ offer, onAccept, onDecline, onBack }: DecisionOfferScreenProps) {
  const getStatusContent = () => {
    switch (offer.status) {
      case 'approved':
        return {
          icon: <PartyPopper size={48} className="text-[#0B7A4A]" />,
          title: 'बधाई हो! ऋण मंज़ूर',
          subtitle: 'आपका ऋण आवेदन स्वीकृत हो गया है',
          bgColor: 'bg-green-50',
          textColor: 'text-[#0B7A4A]'
        };
      case 'pending':
        return {
          icon: <AlertTriangle size={48} className="text-[#FF8A00]" />,
          title: 'समीक्षा में है',
          subtitle: 'आपका आवेदन मैन्युअल समीक्षा में भेजा गया है',
          bgColor: 'bg-orange-50',
          textColor: 'text-[#FF8A00]'
        };
      case 'rejected':
        return {
          icon: <XCircle size={48} className="text-[#D3382A]" />,
          title: 'खुशी नहीं हुई',
          subtitle: 'इस समय हम आपको ऋण नहीं दे सकते',
          bgColor: 'bg-red-50',
          textColor: 'text-[#D3382A]'
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="h-full flex flex-col">
      <RLHeader 
        title="ऋण निर्णय"
        showBack={offer.status === 'rejected'}
        onBack={onBack}
      />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Status Header */}
        <div className={`${statusContent.bgColor} p-6 rounded-lg mb-6 text-center`}>
          <div className="mb-4">
            {statusContent.icon}
          </div>
          <h1 
            className={`${statusContent.textColor} font-bold mb-2`}
            style={{ fontSize: 'var(--text-headline)' }}
          >
            {statusContent.title}
          </h1>
          <p 
            className="text-gray-600"
            style={{ fontSize: 'var(--text-body)' }}
          >
            {statusContent.subtitle}
          </p>
        </div>

        {/* Offer Details */}
        {offer.status !== 'rejected' && (
          <div className="mb-6">
            <RLOfferCard {...offer} />
          </div>
        )}

        {/* Additional Information */}
        {offer.status === 'approved' && (
          <div className="bg-[#F7F9FA] p-4 rounded-lg mb-6">
            <h3 
              className="text-gray-900 font-medium mb-3"
              style={{ fontSize: 'var(--text-body)' }}
            >
              अगले कदम:
            </h3>
            <ul className="space-y-2">
              {[
                'बैंक अकाउंट या UPI से जोड़ें',
                'डिजिटल समझौते पर हस्ताक्षर करें',
                '24 घंटे में पैसा मिल जाएगा'
              ].map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0B7A4A] rounded-full" />
                  <span 
                    className="text-gray-700"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {offer.status === 'pending' && (
          <div className="bg-[#F7F9FA] p-4 rounded-lg mb-6">
            <h3 
              className="text-gray-900 font-medium mb-2"
              style={{ fontSize: 'var(--text-body)' }}
            >
              क्या करें?
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontSize: 'var(--text-micro)' }}
            >
              हमारी टीम 24-48 घंटे में आपको कॉल करेगी। आप चाहें तो हमसे सीधे संपर्क भी कर सकते हैं।
            </p>
          </div>
        )}

        {offer.status === 'rejected' && (
          <div className="space-y-4">
            <div className="bg-[#F7F9FA] p-4 rounded-lg">
              <h3 
                className="text-gray-900 font-medium mb-2"
                style={{ fontSize: 'var(--text-body)' }}
              >
                अस्वीकृति के कारण:
              </h3>
              <ul className="space-y-1">
                {[
                  'क्रेडिट स्कोर कम है',
                  'आय की पुष्टि नहीं हो सकी',
                  'अन्य ऋण का बोझ ज्यादा है'
                ].map((reason, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#D3382A] rounded-full" />
                    <span 
                      className="text-gray-700"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F7F9FA] p-4 rounded-lg">
              <h3 
                className="text-gray-900 font-medium mb-2"
                style={{ fontSize: 'var(--text-body)' }}
              >
                क्या करें?
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontSize: 'var(--text-micro)' }}
              >
                3-6 महीने बाद दोबारा कोशिश करें। इस दौरान अपना क्रेडिट स्कोर सुधारें और मौजूदा कर्ज़ कम करें।
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-3">
        {offer.status === 'approved' && (
          <>
            <RLPrimaryButton onClick={onAccept}>
              ऑफर स्वीकार करें
            </RLPrimaryButton>
            <RLSecondaryButton onClick={onDecline}>
              अभी नहीं चाहिए
            </RLSecondaryButton>
          </>
        )}

        {offer.status === 'pending' && (
          <>
            <RLPrimaryButton onClick={() => window.open('tel:+918000000000')}>
              कॉल करें
            </RLPrimaryButton>
            <RLSecondaryButton onClick={onBack}>
              होम पर जाएं
            </RLSecondaryButton>
          </>
        )}

        {offer.status === 'rejected' && (
          <RLPrimaryButton onClick={onBack}>
            होम पर जाएं
          </RLPrimaryButton>
        )}
      </div>
    </div>
  );
}