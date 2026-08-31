import React, { useState } from 'react';
import { Flame, Layers, Upload, Calendar, MapPin, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAOIStore } from '../../stores/useAOIStore';

export const HotspotPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'HOTSPOT' | 'LAYERS' | 'DISCOVERY'>('HOTSPOT');
  const [source, setSource] = useState<'MODIS' | 'VIIRS' | 'HIMAWARI'>('MODIS');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | 'custom'>('24h');
  const { startAnalysis, isAnalyzing } = useAOIStore();

  return (
    <div className="w-80 bg-[#0B1726]/95 border-r border-gray-800 flex flex-col z-20 shrink-0 backdrop-blur-md select-none font-mono text-xs">
      {/* Top Header Tabs (Image 3 style) */}
      <div className="p-2 border-b border-gray-800 bg-[#06111F] flex space-x-1">
        {(['LAYERS', 'HOTSPOT', 'DISCOVERY'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded text-[11px] font-bold transition-all ${
              activeTab === tab
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-glow-cyan'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#101F31]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'HOTSPOT' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Upload Data Button */}
          <button className="w-full py-2 px-3 rounded-lg bg-[#101F31] border border-dashed border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-300 transition-all flex items-center justify-center space-x-2 text-xs">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>+ Upload Forest Fire Data</span>
          </button>

          {/* Satellite Source Selection */}
          <div className="space-y-2">
            <span className="text-[11px] text-gray-300 uppercase font-bold block">Satellite Sensor Source</span>
            <div className="space-y-1 bg-[#06111F] p-2.5 rounded-lg border border-gray-800">
              {[
                { id: 'MODIS', name: 'MODIS (Terra & Aqua)' },
                { id: 'VIIRS', name: 'VIIRS (Suomi NPP)' },
                { id: 'HIMAWARI', name: 'HIMAWARI-9 Geostationary' },
              ].map((s) => (
                <label key={s.id} className="flex items-center space-x-2 cursor-pointer py-1 text-gray-300 hover:text-cyan-300">
                  <input
                    type="radio"
                    name="hotspotSource"
                    checked={source === s.id}
                    onChange={() => setSource(s.id as any)}
                    className="accent-cyan-400"
                  />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Target Place Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-gray-300 uppercase font-bold block">Select Target Region (ADI)</span>
            <select className="w-full bg-[#06111F] border border-gray-800 rounded-lg p-2 text-gray-200 focus:border-cyan-500 outline-none">
              <option value="simlipal">Simlipal Forest Reserve, Odisha</option>
              <option value="bandipur">Bandipur Tiger Reserve, KA</option>
              <option value="kaziranga">Kaziranga National Park, Assam</option>
              <option value="custom">+ Create New ADI Region</option>
            </select>
          </div>

          {/* Time Range Filter */}
          <div className="space-y-2">
            <span className="text-[11px] text-gray-300 uppercase font-bold block">Time Horizon</span>
            <div className="flex space-x-1">
              {[
                { id: '24h', label: '24h' },
                { id: '7d', label: 'Last 7 days' },
                { id: 'custom', label: 'Custom' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeRange(t.id as any)}
                  className={`flex-1 py-1 rounded border text-[11px] ${
                    timeRange === t.id
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-[#06111F] text-gray-400 border-gray-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-black font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-glow-amber"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>{isAnalyzing ? 'FETCHING HOTSPOTS...' : 'GET HOTSPOT DATA'}</span>
          </button>

          {/* Statistics Counters (Image 3 style) */}
          <div className="pt-2 border-t border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300 font-bold uppercase text-[11px]">Hotspot Statistics</span>
              <span className="text-cyan-400 font-bold">Total: 3</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-[#06111F] border border-gray-800">
                <Flame className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-emerald-400 block">0</span>
                <span className="text-[9px] text-gray-400">Low</span>
              </div>
              <div className="p-2 rounded bg-[#06111F] border border-amber-800/80 shadow-glow-amber">
                <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1 animate-bounce" />
                <span className="text-lg font-bold text-amber-400 block">3</span>
                <span className="text-[9px] text-amber-300">Moderate</span>
              </div>
              <div className="p-2 rounded bg-[#06111F] border border-gray-800">
                <Flame className="w-4 h-4 text-red-400 mx-auto mb-1" />
                <span className="text-lg font-bold text-red-400 block">0</span>
                <span className="text-[9px] text-gray-400">High</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'LAYERS' && (
        <div className="p-4 space-y-3 text-gray-300">
          <span className="font-bold text-xs uppercase text-cyan-400 block">Active Layer Stack</span>
          {['MODIS Thermal Anomalies', 'Sentinel-2 RGB Base', 'Boundary Footprint Polygons', 'NDVI Vegetation Stress Index'].map((layer, idx) => (
            <div key={idx} className="p-2.5 rounded bg-[#06111F] border border-gray-800 flex items-center justify-between">
              <span>{layer}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'DISCOVERY' && (
        <div className="p-4 text-gray-400 text-xs">
          Search satellite catalog for archived historical thermal hotspot data (2020-2026).
        </div>
      )}
    </div>
  );
};
