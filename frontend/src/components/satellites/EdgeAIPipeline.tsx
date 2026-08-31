import React from 'react';
import { Satellite, Cpu, Zap, Radio, Globe, ShieldCheck, Sparkles } from 'lucide-react';

export const EdgeAIPipeline: React.FC = () => {
  const steps = [
    { title: 'Satellite Sensor Payload', desc: 'SAR / Multispectral Imagery', icon: Satellite },
    { title: 'Onboard Edge Model', desc: 'Quantized Neural Inference', icon: Cpu },
    { title: 'Feature Extraction', desc: 'Polygon / Heatmap Generation', icon: Zap },
    { title: 'Downlink Stream', desc: 'Compressed Telemetry Broadcast', icon: Radio },
    { title: 'BharatEye GeoAI Platform', desc: 'Real-time Operations Dashboard', icon: Globe },
  ];

  return (
    <div className="p-5 rounded-xl bg-[#0B1726] border border-gray-800 space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>ONBOARD EDGE AI ARCHITECTURE</span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-[#101F31] px-2 py-0.5 rounded border border-gray-800">
          SIMULATED CONCEPT DEMO
        </span>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="relative p-3 rounded-lg bg-[#101F31] border border-gray-800/80 text-center font-mono space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-white">{s.title}</div>
              <div className="text-[10px] text-gray-400 font-sans">{s.desc}</div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-cyan-500 font-bold">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
