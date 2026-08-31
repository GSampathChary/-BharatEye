import React from 'react';
import { Satellite, Cpu, Activity, HardDrive, ArrowDownRight, Sparkles } from 'lucide-react';
import { SatelliteEntity } from '../../types/satellite';
import { useSatelliteStore } from '../../stores/useSatelliteStore';

interface SatelliteCardProps {
  satellite: SatelliteEntity;
}

export const SatelliteCard: React.FC<SatelliteCardProps> = ({ satellite }) => {
  const { selectedSatellite, selectSatellite } = useSatelliteStore();
  const isSelected = selectedSatellite?.id === satellite.id;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return 'text-emerald-400 border-emerald-800 bg-emerald-950/60';
      case 'PROCESSING':
        return 'text-cyan-400 border-cyan-800 bg-cyan-950/60 animate-pulse';
      default:
        return 'text-gray-400 border-gray-800 bg-gray-900';
    }
  };

  return (
    <div
      onClick={() => selectSatellite(satellite)}
      className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-[#101F31] border-cyan-500 shadow-glow-cyan'
          : 'bg-[#0B1726] border-gray-800/80 hover:border-gray-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-cyan-400">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white font-sans">{satellite.name}</h3>
            <span className="text-[10px] text-gray-400 font-mono">{satellite.code} • SIMULATED</span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border ${getStatusBadge(satellite.status)}`}>
          ● {satellite.status}
        </span>
      </div>

      {/* Sensor & Model */}
      <div className="p-2.5 rounded bg-[#06111F] border border-gray-800 space-y-1 text-xs font-mono mb-3">
        <div className="flex justify-between text-gray-400">
          <span>Sensor Payload:</span>
          <span className="text-gray-200 font-semibold">{satellite.sensor}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Onboard GeoAI:</span>
          <span className="text-cyan-400 font-bold">{satellite.model}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Inference Latency:</span>
          <span className="text-emerald-400 font-bold">{satellite.inferenceMs > 0 ? `${satellite.inferenceMs} ms` : 'N/A'}</span>
        </div>
      </div>

      {/* Resource Gauge Bars */}
      <div className="space-y-2 font-mono text-[11px]">
        <div>
          <div className="flex justify-between text-gray-400 mb-1">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-cyan-400" /> Onboard CPU:</span>
            <span className="text-white font-bold">{satellite.cpuPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all" style={{ width: `${satellite.cpuPct}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-gray-400 mb-1">
            <span className="flex items-center gap-1"><HardDrive className="w-3 h-3 text-purple-400" /> Memory Usage:</span>
            <span className="text-white font-bold">{satellite.memoryPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full bg-purple-400 transition-all" style={{ width: `${satellite.memoryPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
