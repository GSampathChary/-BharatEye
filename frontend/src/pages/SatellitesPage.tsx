import React from 'react';
import { SatelliteCard } from '../components/satellites/SatelliteCard';
import { EdgeAIPipeline } from '../components/satellites/EdgeAIPipeline';
import { useSatelliteStore } from '../stores/useSatelliteStore';
import { Cpu, Sparkles } from 'lucide-react';

export const SatellitesPage: React.FC = () => {
  const { satellites, selectedSatellite } = useSatelliteStore();

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#EFF4F9] space-y-6 select-none font-sans">
      {/* Top Banner Disclaimer */}
      <div className="p-4 rounded-xl bg-[#0B2545] border border-blue-900 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
          <div>
            <strong className="block text-white text-sm">Earth Observation Satellite Constellation & Edge AI</strong>
            <span className="text-xs text-gray-200">ISRO & Earth Observation Satellite Telemetry & Downlink Pipeline</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded bg-[#0052CC] text-white border border-blue-400/40 font-bold text-xs shadow-sm">
          5 SATELLITES MONITORED
        </span>
      </div>

      {/* Edge AI Pipeline Diagram */}
      <EdgeAIPipeline />

      {/* Grid of Satellites */}
      <div>
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Simulated Satellite Constellation Telemetry
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {satellites.map((sat) => (
            <SatelliteCard key={sat.id} satellite={sat} />
          ))}
        </div>
      </div>

      {/* Detailed Satellite telemetry drawer */}
      {selectedSatellite && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 font-sans text-xs space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2 text-[#0052CC] font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>{selectedSatellite.name} — TELEMETRY & EDGE MODEL SPECS</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              STATUS: {selectedSatellite.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block mb-1">Target AOI</span>
              <strong className="text-slate-900 font-bold text-sm">{selectedSatellite.currentAOI}</strong>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block mb-1">Onboard Model</span>
              <strong className="text-[#0052CC] font-bold text-sm">{selectedSatellite.model}</strong>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block mb-1">Inference Latency</span>
              <strong className="text-emerald-600 font-bold text-sm">{selectedSatellite.inferenceMs} ms</strong>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block mb-1">Downlink Speed</span>
              <strong className="text-purple-600 font-bold text-sm">{selectedSatellite.downlinkKbps} kbps</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
