import React, { useState } from 'react';
import { Play, CheckCircle2, Image as ImageIcon, Loader2 } from 'lucide-react';

export const SmartAIDetector: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('https://eoimages.gsfc.nasa.gov/images/imagerecord/151000/151829/india_vir_2023.jpg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleRunDetection = () => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        confidence: 96.8,
        featuresFound: 14,
        areaCoverageKm2: 342,
        processingTimeMs: 420,
        summary: 'Water body expansion detected along river delta basin. High flood risk.',
      });
    }, 1800);
  };

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 font-sans text-xs select-none">
      {/* Header (Smart Disaster AI Image 840 Right Card Style) */}
      <div className="border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-900 tracking-wide">
          Analyze Image
        </h3>
      </div>

      {/* URL Input */}
      <div className="space-y-1.5">
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://eoimages.gsfc.nasa.gov/image..."
          className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-800 focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] outline-none font-sans"
        />
      </div>

      {/* Action Button (Image 840 Style Royal Blue) */}
      <button
        onClick={handleRunDetection}
        disabled={isAnalyzing}
        className="w-full py-2.5 rounded-md bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xs"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>RUNNING AI DETECTION...</span>
          </>
        ) : (
          <>
            <span>Run AI Detection</span>
          </>
        )}
      </button>

      {/* Results Section (Image 840 Style) */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
        <h4 className="font-bold text-slate-800 text-xs border-b border-slate-200 pb-1">
          Results
        </h4>

        {isAnalyzing ? (
          <p className="text-xs text-slate-500 italic py-1 font-sans">Analyzing...</p>
        ) : result ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-emerald-700 font-bold text-xs">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Detection Complete
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                {result.confidence}% Confidence
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-snug">{result.summary}</p>

            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] pt-1">
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-500 block">Features</span>
                <strong className="text-[#0052CC]">{result.featuresFound}</strong>
              </div>
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-500 block">Area</span>
                <strong className="text-slate-800">{result.areaCoverageKm2} km²</strong>
              </div>
              <div className="p-1.5 rounded bg-white border border-slate-200">
                <span className="text-slate-500 block">Time</span>
                <strong className="text-emerald-700">{result.processingTimeMs} ms</strong>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-sans py-1">Analyzing...</p>
        )}
      </div>
    </div>
  );
};
