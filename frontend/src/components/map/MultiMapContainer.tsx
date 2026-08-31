import React from 'react';
import { IndiaMap } from './IndiaMap';
import { Layers, Globe, Eye, Sparkles, Activity } from 'lucide-react';

export const MultiMapContainer: React.FC<{ splitView: boolean; onToggleSplit: () => void }> = ({
  splitView,
  onToggleSplit,
}) => {
  if (!splitView) {
    return (
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* Floating Split Mode Switcher Button */}
        <div className="absolute top-4 left-4 z-20 font-mono text-xs select-none">
          <button
            onClick={onToggleSplit}
            className="px-3 py-1.5 rounded-lg bg-[#0B1726]/90 border border-cyan-500/50 hover:bg-[#101F31] text-cyan-300 shadow-glow-cyan flex items-center space-x-2 transition-all backdrop-blur-md"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">SWITCH TO MULTI-MAP SPLIT VIEW (IMAGE 2 LAYOUT)</span>
          </button>
        </div>

        <IndiaMap />
      </div>
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col bg-[#06111F]">
      {/* Top Split View Bar */}
      <div className="h-9 bg-[#0B1726] border-b border-gray-800 px-4 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold">
          <Sparkles className="w-4 h-4" />
          <span>MULTI-SENSOR SPLIT VIEW DASHBOARD (DANA CYCLONE STYLE)</span>
        </div>
        <button
          onClick={onToggleSplit}
          className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 text-[10px] font-bold"
        >
          RETURN TO FULL MAP
        </button>
      </div>

      {/* 3 Side-by-Side Map Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-1 p-1 overflow-hidden">
        {/* Stream 1: Earth Observation Satellite Data */}
        <div className="flex flex-col border border-gray-800 rounded-lg overflow-hidden relative">
          <div className="h-7 bg-[#101F31] px-3 flex items-center justify-between text-[11px] font-mono text-cyan-300 border-b border-gray-800">
            <span className="font-bold">1. Sentinel-2 High-Res Imagery</span>
            <span className="text-[9px] text-gray-400">ISRO / Sentinel Data</span>
          </div>
          <div className="flex-1 relative">
            <IndiaMap splitView={true} />
          </div>
        </div>

        {/* Stream 2: IMD Weather & Cyclone Track */}
        <div className="flex flex-col border border-gray-800 rounded-lg overflow-hidden relative">
          <div className="h-7 bg-[#101F31] px-3 flex items-center justify-between text-[11px] font-mono text-amber-300 border-b border-gray-800">
            <span className="font-bold">2. IMD Cyclone & Thermal Track</span>
            <span className="text-[9px] text-gray-400">National Disaster Report</span>
          </div>
          <div className="flex-1 relative">
            <IndiaMap splitView={true} />
          </div>
        </div>

        {/* Stream 3: Thermal / Wind Forecast Stream */}
        <div className="flex flex-col border border-gray-800 rounded-lg overflow-hidden relative">
          <div className="h-7 bg-[#101F31] px-3 flex items-center justify-between text-[11px] font-mono text-emerald-300 border-b border-gray-800">
            <span className="font-bold">3. Wind & Precip Forecasting</span>
            <span className="text-[9px] text-gray-400">ECMWF / GFS Forecast</span>
          </div>
          <div className="flex-1 relative">
            <IndiaMap splitView={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
