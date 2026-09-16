import React, { useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, X, Activity, ShieldCheck } from 'lucide-react';
import { useAOIStore } from '../../stores/useAOIStore';

export const GeoAIModal: React.FC = () => {
  const { isAnalyzing, analysisStep, analysisStepsText, setAnalysisStep, setAnalysisResult, lastResult } = useAOIStore();

  useEffect(() => {
    if (!isAnalyzing) return;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < analysisStepsText.length) {
        setAnalysisStep(step);
      } else {
        clearInterval(interval);
        setAnalysisResult({
          confidence: 94,
          affectedAreaKm2: 128,
          detectedRegionsCount: 17,
          processingTimeSec: 18.4,
          features: [],
          riskFactors: [
            { factor: 'Water Expansion Rate', level: 'High' },
            { factor: 'Historical Flood Plain', level: 'Medium' },
            { factor: 'Population Exposure', level: 'High' },
          ],
          isSimulated: true,
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  if (!isAnalyzing && !lastResult) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none">
      <div className="w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#0B1726] border border-cyan-500/50 rounded-xl shadow-glow-cyan p-4 sm:p-6 space-y-5 text-xs font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>GEOAI EXECUTION PIPELINE</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
            DEMO / SIMULATED INFERENCE
          </span>
        </div>

        {/* Step-by-Step Animated Execution List */}
        {isAnalyzing ? (
          <div className="space-y-3 py-2">
            {analysisStepsText.map((stepText, idx) => {
              const isCompleted = idx < analysisStep;
              const isCurrent = idx === analysisStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-2.5 rounded-lg border transition-all ${
                    isCompleted
                      ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                      : isCurrent
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-glow-cyan'
                      : 'bg-[#101F31]/50 border-gray-800/50 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0 flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </div>
                  )}
                  <span className="font-mono text-xs">{stepText}</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* ANALYSIS COMPLETE RESULT DISPLAY */
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 flex items-center space-x-3 text-emerald-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">ANALYSIS COMPLETE</h4>
                <p className="text-[11px] text-emerald-400/80">GeoAI spatial inference pipeline executed successfully.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded bg-[#101F31] border border-gray-800">
                <span className="text-gray-400 text-[10px] block mb-1">Model Confidence</span>
                <span className="text-xl font-bold text-cyan-400">{lastResult?.confidence}%</span>
              </div>
              <div className="p-3 rounded bg-[#101F31] border border-gray-800">
                <span className="text-gray-400 text-[10px] block mb-1">Affected Area</span>
                <span className="text-xl font-bold text-white">{lastResult?.affectedAreaKm2} km²</span>
              </div>
              <div className="p-3 rounded bg-[#101F31] border border-gray-800">
                <span className="text-gray-400 text-[10px] block mb-1">Detected Regions</span>
                <span className="text-xl font-bold text-amber-400">{lastResult?.detectedRegionsCount} polygons</span>
              </div>
              <div className="p-3 rounded bg-[#101F31] border border-gray-800">
                <span className="text-gray-400 text-[10px] block mb-1">Processing Time</span>
                <span className="text-xl font-bold text-emerald-400">{lastResult?.processingTimeSec} sec</span>
              </div>
            </div>

            {/* Risk Factors */}
            <div>
              <span className="text-gray-400 text-[11px] uppercase tracking-wider block mb-2 font-bold">
                Generated Risk Factor Assessment
              </span>
              <div className="space-y-1.5">
                {lastResult?.riskFactors.map((rf, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-[#101F31] border border-gray-800">
                    <span className="text-gray-300 text-xs">{rf.factor}</span>
                    <span className="text-amber-400 font-bold text-xs">{rf.level}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => useAOIStore.getState().setAnalysisResult(lastResult!)}
              className="w-full py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-wider transition-all"
            >
              CLOSE & VIEW ON MAP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
