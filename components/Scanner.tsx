
import React, { useState, useRef, useEffect } from 'react';
import { analyzeWasteImage } from '../geminiService';

interface ScannerProps {
  onEarnPoints: (pts: number) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onEarnPoints }) => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!showMap) startCamera();
    return () => stopCamera();
  }, [showMap]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
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

    const base64Image = canvas.toDataURL('image/jpeg', 0.8);
    const result = await analyzeWasteImage(base64Image);
    
    setScanResult(result);
    setIsLoading(false);
  };

  const handleFinish = () => {
    if (scanResult) {
      onEarnPoints(scanResult.pointsReward || 10);
      setScanResult(null);
    }
  };

  const recyclingPoints = [
    { name: "EcoCenter Central", distance: "0.4 km", type: "Plastic, Glass", rating: 4.8 },
    { name: "GreenPoint Metro", distance: "1.2 km", type: "Paper, Metal", rating: 4.5 },
    { name: "Circular Hub", distance: "2.1 km", type: "Electronics", rating: 4.9 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
      {/* Header Overlay */}
      <div className="absolute top-8 left-0 right-0 z-20 px-6 flex flex-col gap-4">
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2rem] px-6 py-4 flex items-center shadow-2xl border border-white/20">
          <span className="material-symbols-outlined text-primary mr-3">search</span>
          <input 
            type="text" 
            placeholder="Find materials..." 
            className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold flex-1 placeholder:text-zinc-400"
          />
          <button onClick={() => setShowMap(!showMap)} className={`size-10 rounded-full flex items-center justify-center transition-colors ${showMap ? 'bg-primary text-white' : 'text-zinc-400'}`}>
            <span className="material-symbols-outlined">{showMap ? 'camera' : 'map'}</span>
          </button>
        </div>
      </div>

      {!showMap ? (
        <div className="flex flex-col flex-1">
          {/* Viewport */}
          <div className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-black">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover opacity-90"
            />
            
            {/* Scanner Frame */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative size-72 border-2 border-primary/30 rounded-[3rem] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    <div className="absolute -top-1 -left-1 size-16 border-t-[6px] border-l-[6px] border-primary rounded-tl-[3rem]"></div>
                    <div className="absolute -top-1 -right-1 size-16 border-t-[6px] border-r-[6px] border-primary rounded-tr-[3rem]"></div>
                    <div className="absolute -bottom-1 -left-1 size-16 border-b-[6px] border-l-[6px] border-primary rounded-bl-[3rem]"></div>
                    <div className="absolute -bottom-1 -right-1 size-16 border-b-[6px] border-r-[6px] border-primary rounded-br-[3rem]"></div>
                    <div className="absolute left-6 right-6 h-1 bg-primary/60 shadow-[0_0_20px_#2ecc70] animate-[bounce_2s_infinite] top-1/2"></div>
                </div>
            </div>

            {isLoading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center text-white gap-8 z-50">
                    <div className="relative size-24">
                        <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-4xl text-primary filled-icon animate-pulse">psychology</span>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-black tracking-tight">AI Vision Processing</p>
                        <p className="text-xs font-bold text-zinc-400 mt-2 uppercase tracking-widest">Identifying eco-potential...</p>
                    </div>
                </div>
            )}
          </div>

          {/* Controls / Result */}
          <div className="bg-white dark:bg-zinc-900 rounded-t-[3.5rem] -mt-16 relative z-10 p-10 shadow-[0_-30px_60px_rgba(0,0,0,0.15)] flex-1">
            {scanResult ? (
              <div className="animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center gap-6 mb-8">
                    <div className="size-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-5xl">recycling</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-black leading-tight">{scanResult.material}</h3>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${scanResult.isRecyclable ? 'text-primary' : 'text-rose-500'}`}>
                            {scanResult.isRecyclable ? 'Eco-Positive Item' : 'Restricted Waste'}
                        </p>
                    </div>
                    <div className="text-center bg-primary text-white p-4 rounded-3xl shadow-xl shadow-primary/30 min-w-[70px]">
                        <p className="text-2xl font-black">+{scanResult.pointsReward || 15}</p>
                        <p className="text-[10px] font-black uppercase tracking-tighter">XP</p>
                    </div>
                </div>
                
                <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-3xl mb-10 border border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {scanResult.instructions}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setScanResult(null)} className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-black py-5 rounded-[1.5rem] uppercase text-[10px] tracking-widest">Discard</button>
                    <button onClick={handleFinish} className="flex-[2] bg-primary text-white font-black py-5 rounded-[1.5rem] uppercase text-[10px] tracking-widest shadow-xl shadow-primary/40">Log & Earn</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-8">
                <div className="flex items-center gap-10">
                    <button className="size-14 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400"><span className="material-symbols-outlined">image</span></button>
                    <button 
                        onClick={captureImage}
                        className="size-28 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-white ring-[12px] ring-white dark:ring-zinc-900 active:scale-90 transition-transform"
                    >
                        <span className="material-symbols-outlined text-6xl">center_focus_strong</span>
                    </button>
                    <button className="size-14 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400"><span className="material-symbols-outlined">bolt</span></button>
                </div>
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Ready to analyze</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 pt-32 p-6 animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-black mb-6">Nearby Drop-off</h2>
            <div className="space-y-4 mb-8">
                {recyclingPoints.map((point, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 flex items-center gap-5 shadow-sm active:scale-95 transition-all cursor-pointer">
                        <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">local_shipping</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-sm">{point.name}</h4>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">{point.type}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-primary">{point.distance}</p>
                            <div className="flex items-center gap-0.5 text-amber-500">
                                <span className="material-symbols-outlined text-xs filled-icon">star</span>
                                <span className="text-[10px] font-bold">{point.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Mock Map View */}
            <div className="h-64 bg-zinc-100 dark:bg-zinc-800 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                <span className="material-symbols-outlined text-primary/40 text-8xl">map</span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
                    <span className="material-symbols-outlined text-4xl filled-icon animate-bounce">location_on</span>
                </div>
            </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Scanner;
