
import React, { useState, useRef, useEffect } from 'react';
import { analyzeWasteImage } from '../geminiService';

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsLoading(true);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);

    const base64Image = canvas.toDataURL('image/jpeg');
    const result = await analyzeWasteImage(base64Image);
    
    setScanResult(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Top Header Over Camera */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6 text-white text-center">
        <h2 className="text-xl font-bold">Recycle Scanner</h2>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 overflow-hidden flex items-center justify-center">
        <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
        />
        
        {/* Scanner Overlay Frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative size-64 border-2 border-primary rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]">
                {/* Corners */}
                <div className="absolute -top-1 -left-1 size-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                <div className="absolute -top-1 -right-1 size-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
                <div className="absolute -bottom-1 -left-1 size-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
                <div className="absolute -bottom-1 -right-1 size-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
                
                {/* Animated Scan Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/60 shadow-[0_0_15px_rgba(46,204,112,0.8)] animate-bounce mt-10"></div>
            </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-4">
                <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold">Analyzing with AI...</p>
            </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Controls & Results */}
      <div className="bg-white dark:bg-zinc-900 rounded-t-3xl p-6 pb-24 relative -mt-6">
        {scanResult ? (
          <div className="animate-in slide-in-from-bottom duration-300">
            <div className="flex items-start gap-4 mb-4">
                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">recycling</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold">{scanResult.material}</h3>
                    <p className={`text-sm font-bold ${scanResult.isRecyclable ? 'text-primary' : 'text-red-500'}`}>
                        {scanResult.isRecyclable ? 'Recyclable ✓' : 'Non-Recyclable ✗'}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-primary text-xl font-black">+{scanResult.pointsReward} pts</p>
                </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 bg-zinc-50 dark:bg-zinc-800 p-4 rounded-2xl">
                {scanResult.instructions}
            </p>
            <div className="flex gap-4">
                <button 
                    onClick={() => setScanResult(null)}
                    className="flex-1 border-2 border-zinc-100 dark:border-zinc-800 font-bold py-3 rounded-full"
                >
                    Retake
                </button>
                <button 
                    onClick={() => setScanResult(null)}
                    className="flex-[2] bg-primary text-white font-bold py-3 rounded-full"
                >
                    Finish & Earn
                </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <p className="text-zinc-400 text-sm font-medium">Align the object within the frame</p>
            <div className="flex items-center justify-center gap-10">
                <button className="size-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <span className="material-symbols-outlined">image</span>
                </button>
                <button 
                    disabled={isLoading}
                    onClick={captureImage}
                    className="size-20 bg-primary rounded-full shadow-xl shadow-primary/30 flex items-center justify-center text-white active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-4xl filled-icon">photo_camera</span>
                </button>
                <button className="size-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <span className="material-symbols-outlined">flashlight_on</span>
                </button>
            </div>
            
            <div className="w-full flex gap-4 overflow-x-auto no-scrollbar pt-4">
                {['Plastic', 'Paper', 'Glass', 'Metal'].map(mat => (
                    <div key={mat} className="flex-none flex flex-col items-center gap-2">
                        <div className="size-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                            <span className="material-symbols-outlined">water_drop</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{mat}</span>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
