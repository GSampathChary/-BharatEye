import React from 'react';
import { Target, Layers, Play, CheckCircle2, RefreshCw, Cpu, Sparkles, MapPin } from 'lucide-react';
import { useAOIStore } from '../../stores/useAOIStore';
import { SensorType, AnalysisType } from '../../types/aoi';
import { useMapStore } from '../../stores/useMapStore';

export const AOIDrawer: React.FC = () => {
  const { currentAOI, selectedSensor, setSensor, selectedAnalysis, setAnalysis, startAnalysis, isAnalyzing, setAOI } = useAOIStore();
  const { flyTo } = useMapStore();

  const sensors: { type: SensorType; label: string; sub: string }[] = [
    { type: 'SAR', label: 'SAR Radar', sub: 'All-weather, day/night' },
    { type: 'OPTICAL', label: 'Optical High-Res', sub: 'Visible RGB spectrum' },
    { type: 'MULTISPECTRAL', label: 'Multispectral', sub: 'NDVI & Vegetation' },
    { type: 'THERMAL', label: 'Thermal IR', sub: 'Heat & Fire hotspots' },
  ];

  const analyses: { type: AnalysisType; label: string; desc: string }[] = [
    { type: 'FLOOD', label: 'Flood & Inundation', desc: 'Detect surface water expansion' },
    { type: 'CROP_STRESS', label: 'Crop Stress (NDVI)', desc: 'Vegetation health index deficit' },
    { type: 'FIRE', label: 'Forest Fire Detection', desc: 'Thermal anomaly clustering' },
    { type: 'INFRASTRUCTURE', label: 'Infra & Road Change', desc: 'Construction progress tracking' },
    { type: 'VESSEL', label: 'Maritime Vessel Detect', desc: 'SAR vessel footprint extraction' },
  ];

  const handlePresetSelect = (region: string, lat: number, lng: number, areaKm2: number) => {
    flyTo(lat, lng, 9);
    setAOI({
      id: `AOI-${region.toUpperCase().replace(/\s+/g, '-')}`,
      regionName: `${region} AOI`,
      areaKm2,
      coordinates: [
        [
          [lng - 0.5, lat - 0.4],
          [lng + 0.5, lat - 0.4],
          [lng + 0.5, lat + 0.4],
          [lng - 0.5, lat + 0.4],
          [lng - 0.5, lat - 0.4],
        ]
      ],
      bbox: [lng - 0.5, lat - 0.4, lng + 0.5, lat + 0.4]
    });
  };

  return (
    <div className="w-full md:w-96 max-h-[70vh] md:max-h-none bg-[#0B1726]/95 border-l border-gray-800 flex flex-col z-20 shrink-0 backdrop-blur-md select-none overflow-y-auto p-4 space-y-4 text-xs">
      {/* Header */}
      <div className="border-b border-gray-800 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              AOI GEOAI ANALYSIS
            </h2>
            <p className="text-[10px] text-gray-400">Target Region & Sensor Selection</p>
          </div>
        </div>
      </div>

      {/* Preset AOI Region Selection */}
      <div>
        <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider block mb-2">
          Select Area of Interest (AOI)
        </span>
        <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
          {[
            { name: 'Krishna Delta', lat: 16.32, lng: 80.51, area: 4820 },
            { name: 'Brahmaputra Basin', lat: 26.58, lng: 93.17, area: 6200 },
            { name: 'JNPA Offshore', lat: 18.95, lng: 72.95, area: 1250 },
            { name: 'Odisha Simlipal', lat: 21.88, lng: 86.35, area: 3400 },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset.name, preset.lat, preset.lng, preset.area)}
              className="p-2 rounded bg-[#101F31] border border-gray-800 hover:border-cyan-500/50 hover:text-cyan-300 text-left transition-all text-gray-300 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-[11px]">{preset.name}</div>
                <div className="text-[9px] text-gray-500">{preset.area} km²</div>
              </div>
              <MapPin className="w-3 h-3 text-cyan-400" />
            </button>
          ))}
        </div>
      </div>

      {/* AOI Details Card */}
      {currentAOI && (
        <div className="p-3 rounded-lg bg-[#101F31] border border-cyan-500/40 space-y-1.5 font-mono">
          <div className="flex justify-between items-center text-cyan-400 font-bold">
            <span>{currentAOI.regionName}</span>
            <span className="text-white bg-cyan-950 px-2 py-0.5 rounded text-[10px] border border-cyan-800">
              {currentAOI.areaKm2} km²
            </span>
          </div>
          <div className="text-[10px] text-gray-400">
            Bounding Box: [{currentAOI.bbox[0].toFixed(2)}, {currentAOI.bbox[1].toFixed(2)}, {currentAOI.bbox[2].toFixed(2)}, {currentAOI.bbox[3].toFixed(2)}]
          </div>
        </div>
      )}

      {/* Sensor Selection */}
      <div>
        <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider block mb-2">
          Select Satellite Sensor
        </span>
        <div className="space-y-1.5">
          {sensors.map((s) => (
            <button
              key={s.type}
              onClick={() => setSensor(s.type)}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                selectedSensor === s.type
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-glow-cyan font-bold'
                  : 'bg-[#101F31] border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div>
                <div className="text-xs font-mono">{s.label}</div>
                <div className="text-[10px] text-gray-500 font-sans">{s.sub}</div>
              </div>
              {selectedSensor === s.type && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* GeoAI Model Selection */}
      <div>
        <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider block mb-2">
          Select GeoAI Pipeline
        </span>
        <div className="space-y-1.5">
          {analyses.map((a) => (
            <button
              key={a.type}
              onClick={() => setAnalysis(a.type)}
              className={`w-full p-2.5 rounded-lg border text-left transition-all ${
                selectedAnalysis === a.type
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-glow-cyan font-bold'
                  : 'bg-[#101F31] border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="text-xs font-mono">{a.label}</div>
              <div className="text-[10px] text-gray-500 font-sans">{a.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Run GeoAI Button */}
      <div className="pt-2">
        <button
          onClick={startAnalysis}
          disabled={isAnalyzing || !currentAOI}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-mono text-xs uppercase tracking-wider shadow-glow-cyan flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>RUNNING INFERENCE...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-black" />
              <span>RUN GEOAI ANALYSIS</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Disclaimer */}
      <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-800/60 text-[10px] text-cyan-300 font-mono flex items-center space-x-2">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>DEMO / SIMULATED INFERENCE PIPELINE</span>
      </div>
    </div>
  );
};
