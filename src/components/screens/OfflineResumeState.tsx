import { useState, useEffect } from 'react';
import { WifiOff, Upload, RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { RLPrimaryButton } from '../RL-PrimaryButton';
import { RLSecondaryButton } from '../RL-SecondaryButton';

interface OfflineResumeStateProps {
  onRetry: () => void;
  onResume: () => void;
}

const queuedUploads = [
  {
    id: 'kyc_id',
    name: 'आधार कार्ड फोटो',
    status: 'pending' as const,
    size: '2.3 MB',
    progress: 0
  },
  {
    id: 'kyc_selfie',
    name: 'सेल्फी फोटो',
    status: 'pending' as const,
    size: '1.8 MB',
    progress: 0
  },
  {
    id: 'application_data',
    name: 'आवेदन डेटा',
    status: 'completed' as const,
    size: '12 KB',
    progress: 100
  }
];

export function OfflineResumeState({ onRetry, onResume }: OfflineResumeStateProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [uploads, setUploads] = useState(queuedUploads);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleUploadNow = () => {
    setIsUploading(true);
    
    // Simulate upload process
    const pendingUploads = uploads.filter(upload => upload.status === 'pending');
    let currentIndex = 0;

    const uploadNext = () => {
      if (currentIndex >= pendingUploads.length) {
        setIsUploading(false);
        return;
      }

      const currentUpload = pendingUploads[currentIndex];
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        
        setUploads(prev => prev.map(upload => 
          upload.id === currentUpload.id 
            ? { ...upload, progress, status: progress === 100 ? 'completed' : 'uploading' }
            : upload
        ));

        if (progress >= 100) {
          clearInterval(interval);
          currentIndex++;
          setTimeout(uploadNext, 500);
        }
      }, 200);
    };

    uploadNext();
  };

  const handleUploadOnWifi = () => {
    // Set preference for WiFi upload
    localStorage.setItem('uploadOnWifi', 'true');
    onRetry();
  };

  const pendingUploadsCount = uploads.filter(upload => upload.status === 'pending').length;
  const allUploaded = uploads.every(upload => upload.status === 'completed');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-8 text-center">
        <div className={`
          w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center
          ${isOnline ? 'bg-orange-100' : 'bg-red-100'}
        `}>
          {isOnline ? (
            <Upload size={40} className="text-[#FF8A00]" />
          ) : (
            <WifiOff size={40} className="text-[#D3382A]" />
          )}
        </div>
        
        <h1 
          className="text-gray-900 font-bold mb-2"
          style={{ fontSize: 'var(--text-headline)' }}
        >
          {isOnline ? 'अपलोड पेंडिंग' : 'इंटरनेट नहीं मिल रहा'}
        </h1>
        
        <p 
          className="text-gray-600"
          style={{ fontSize: 'var(--text-body)' }}
        >
          {isOnline 
            ? 'आपकी फाइलें अपलोड होने का इंतजार कर रही हैं'
            : 'कृपया इंटरनेट कनेक्शन चेक करें'
          }
        </p>
      </div>

      {/* Connection Status */}
      <div className="px-6 mb-6">
        <div className={`
          flex items-center gap-3 p-4 rounded-lg
          ${isOnline 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
          }
        `}>
          <div className={`
            w-3 h-3 rounded-full
            ${isOnline ? 'bg-[#0B7A4A]' : 'bg-[#D3382A]'}
          `} />
          <span 
            className={`font-medium ${isOnline ? 'text-[#0B7A4A]' : 'text-[#D3382A]'}`}
            style={{ fontSize: 'var(--text-body)' }}
          >
            {isOnline ? 'इंटरनेट कनेक्टेड' : 'इंटरनेट डिसकनेक्टेड'}
          </span>
        </div>
      </div>

      {/* Upload Queue */}
      <div className="flex-1 px-6">
        <h3 
          className="text-gray-900 font-medium mb-4"
          style={{ fontSize: 'var(--text-body)' }}
        >
          अपलोड की जाने वाली फाइलें ({pendingUploadsCount})
        </h3>
        
        <div className="space-y-3 mb-6">
          {uploads.map((upload) => {
            const getStatusIcon = () => {
              switch (upload.status) {
                case 'completed':
                  return <CheckCircle size={20} className="text-[#0B7A4A]" />;
                case 'uploading':
                  return <div className="w-5 h-5 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />;
                case 'pending':
                default:
                  return <Clock size={20} className="text-gray-400" />;
              }
            };

            const getStatusColor = () => {
              switch (upload.status) {
                case 'completed':
                  return 'border-green-200 bg-green-50';
                case 'uploading':
                  return 'border-orange-200 bg-orange-50';
                case 'pending':
                default:
                  return 'border-gray-200 bg-white';
              }
            };

            return (
              <div 
                key={upload.id}
                className={`p-4 border rounded-lg ${getStatusColor()}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon()}
                  <div className="flex-1">
                    <p 
                      className="text-gray-900 font-medium"
                      style={{ fontSize: 'var(--text-body)' }}
                    >
                      {upload.name}
                    </p>
                    <p 
                      className="text-gray-600"
                      style={{ fontSize: 'var(--text-micro)' }}
                    >
                      {upload.size}
                    </p>
                  </div>
                  <span 
                    className="text-gray-600"
                    style={{ fontSize: 'var(--text-micro)' }}
                  >
                    {upload.progress}%
                  </span>
                </div>
                
                {upload.status === 'uploading' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF8A00] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Usage Warning */}
        {isOnline && pendingUploadsCount > 0 && (
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-[#FF8A00] mt-0.5" />
              <div>
                <h4 
                  className="text-[#FF8A00] font-medium mb-1"
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  डेटा का उपयोग
                </h4>
                <p 
                  className="text-gray-600"
                  style={{ fontSize: 'var(--text-micro)' }}
                >
                  अपलोड में लगभग 4.1 MB डेटा खर्च होगा। WiFi का उपयोग करना बेहतर हो सकता है।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-6 bg-white border-t border-gray-100 space-y-3">
        {isOnline ? (
          <>
            {allUploaded ? (
              <RLPrimaryButton onClick={onResume}>
                आगे बढ़ें
              </RLPrimaryButton>
            ) : (
              <>
                <RLPrimaryButton 
                  onClick={handleUploadNow}
                  loading={isUploading}
                  disabled={isUploading}
                >
                  {isUploading ? 'अपलोड हो रहा है...' : 'अभी अपलोड करें'}
                </RLPrimaryButton>
                <RLSecondaryButton onClick={handleUploadOnWifi}>
                  WiFi मिलने पर अपलोड करें
                </RLSecondaryButton>
              </>
            )}
          </>
        ) : (
          <>
            <RLPrimaryButton onClick={() => window.location.reload()}>
              <div className="flex items-center justify-center gap-2">
                <RefreshCw size={20} />
                <span>दोबारा कोशिश करें</span>
              </div>
            </RLPrimaryButton>
            <RLSecondaryButton onClick={onRetry}>
              बाद में कोशिश करूंगा
            </RLSecondaryButton>
          </>
        )}
      </div>
    </div>
  );
}