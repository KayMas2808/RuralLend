import { Camera, RotateCcw, Check, X } from 'lucide-react';
import { useState } from 'react';

interface RLDocCameraProps {
  title: string;
  subtitle?: string;
  onCapture?: (imageData: string) => void;
  onRetake?: () => void;
  onAccept?: () => void;
  capturedImage?: string;
  className?: string;
}

export function RLDocCamera({ 
  title,
  subtitle,
  onCapture,
  onRetake,
  onAccept,
  capturedImage,
  className = ''
}: RLDocCameraProps) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate camera capture delay
    setTimeout(() => {
      // In a real implementation, this would capture from camera
      const mockImageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...';
      onCapture?.(mockImageData);
      setIsCapturing(false);
    }, 1000);
  };

  if (capturedImage) {
    return (
      <div className={`bg-white rounded-lg p-6 ${className}`} style={{ borderRadius: 'var(--radius-card)' }}>
        <h3 className="text-center font-bold mb-2" style={{ fontSize: 'var(--text-headline-sm)' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-center text-gray-600 mb-4" style={{ fontSize: 'var(--text-body)' }}>
            {subtitle}
          </p>
        )}
        
        <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 overflow-hidden">
          <img 
            src={capturedImage} 
            alt="Captured document"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRetake}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#FF8A00] text-[#FF8A00] rounded-lg font-bold transition-colors hover:bg-[#FF8A00] hover:text-white touch-target"
            style={{ 
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-button)'
            }}
          >
            <RotateCcw size={20} />
            फिर से लें
          </button>
          
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#0B7A4A] text-white rounded-lg font-bold transition-colors hover:bg-[#096A41] touch-target"
            style={{ 
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-button)'
            }}
          >
            <Check size={20} />
            स्वीकार करें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`} style={{ borderRadius: 'var(--radius-card)' }}>
      <h3 className="text-center font-bold mb-2" style={{ fontSize: 'var(--text-headline-sm)' }}>
        {title}
      </h3>
      {subtitle && (
        <p className="text-center text-gray-600 mb-6" style={{ fontSize: 'var(--text-body)' }}>
          {subtitle}
        </p>
      )}
      
      {/* Camera Viewfinder */}
      <div className="relative aspect-[4/3] bg-black rounded-lg mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {isCapturing ? (
            <div className="text-white text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p style={{ fontSize: 'var(--text-body)' }}>कैप्चर कर रहे हैं...</p>
            </div>
          ) : (
            <div className="text-white text-center">
              <Camera size={48} className="mx-auto mb-2 opacity-60" />
              <p style={{ fontSize: 'var(--text-body)' }}>कैमरा व्यू</p>
            </div>
          )}
        </div>
        
        {/* Document Frame Overlay */}
        <div className="absolute inset-4 border-2 border-white border-dashed rounded-lg opacity-60" />
        
        {/* Corner guides */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-white" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-white" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-white" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-white" />
      </div>

      <button
        onClick={handleCapture}
        disabled={isCapturing}
        className="w-full flex items-center justify-center gap-3 py-4 bg-[#FF8A00] text-white rounded-lg font-bold transition-colors hover:bg-[#E67A00] disabled:opacity-50 touch-target"
        style={{ 
          borderRadius: 'var(--radius-button)',
          fontSize: 'var(--text-button)'
        }}
      >
        <Camera size={24} />
        {isCapturing ? 'कैप्चर कर रहे हैं...' : 'फोटो लें'}
      </button>
    </div>
  );
}