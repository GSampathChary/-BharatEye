import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Minus, 
  RotateCcw, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Activity, 
  Flame, 
  ShieldAlert, 
  Target, 
  Satellite, 
  Anchor, 
  Navigation 
} from 'lucide-react';
import { useMapStore } from '../../stores/useMapStore';
import { BaseMapStyle, MapLayersToggle } from '../../types/geo';

export const MapControls: React.FC = () => {
  const { viewState, setViewState, flyTo, baseMapStyle, setBaseMapStyle, layers, toggleLayer } = useMapStore();
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);

  const handleZoomIn = () => setViewState({ ...viewState, zoom: Math.min(viewState.zoom + 0.8, 16) });
  const handleZoomOut = () => setViewState({ ...viewState, zoom: Math.max(viewState.zoom - 0.8, 3) });
  const handleReset = () => flyTo(20.5937, 78.9629, 4.8);

  const layerItems: { key: keyof MapLayersToggle; label: string; icon: any }[] = [
    { key: 'events', label: 'Intelligence Events', icon: Activity },
    { key: 'heatmap', label: 'Density Heatmap', icon: Flame },
    { key: 'risk', label: 'Regional Risk Zones', icon: ShieldAlert },
    { key: 'aoi', label: 'Areas of Interest', icon: Target },
    { key: 'satelliteFootprints', label: 'Satellite Coverage', icon: Satellite },
    { key: 'vessels', label: 'Maritime Observations', icon: Anchor },
    { key: 'tracks', label: 'Movement Tracks', icon: Navigation },
  ];

  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 select-none">
      {/* Layer Visibility Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setLayersMenuOpen(!layersMenuOpen)}
          className={`p-2.5 rounded-lg border shadow-panel transition-all flex items-center space-x-2 text-xs font-mono font-semibold ${
            layersMenuOpen
              ? 'bg-cyan-950/90 border-cyan-500 text-cyan-300 shadow-glow-cyan'
              : 'bg-[#0B1726]/90 border-gray-800 text-gray-300 hover:bg-[#101F31]'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">LAYERS</span>
        </button>

        {/* Layers Control Menu Drawer */}
        {layersMenuOpen && (
          <div className="absolute right-0 top-11 w-64 bg-[#0B1726]/95 border border-gray-800 rounded-lg shadow-2xl p-3 z-30 space-y-3 backdrop-blur-md">
            {/* Base Map Selector */}
            <div>
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                Base Map Style
              </span>
              <div className="grid grid-cols-3 gap-1 font-mono text-[11px]">
                {(['dark', 'satellite', 'light'] as BaseMapStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setBaseMapStyle(style)}
                    className={`py-1 px-2 rounded border uppercase text-center transition-all ${
                      baseMapStyle === style
                        ? 'bg-cyan-900/70 text-cyan-300 border-cyan-500 font-bold'
                        : 'bg-[#101F31] text-gray-400 border-gray-800 hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-gray-800" />

            {/* Feature Layers Toggles */}
            <div>
              <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                GPU Map Layers
              </span>
              <div className="space-y-1">
                {layerItems.map((item) => {
                  const Icon = item.icon;
                  const active = layers[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleLayer(item.key)}
                      className={`w-full flex items-center justify-between p-2 rounded text-xs font-mono transition-all ${
                        active
                          ? 'bg-[#101F31] text-white border border-gray-700/60'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-[#101F31]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-gray-500'}`} />
                        <span>{item.label}</span>
                      </div>
                      {active ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-gray-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons: Zoom In, Zoom Out, Reset, Fullscreen */}
      <div className="flex flex-col rounded-lg bg-[#0B1726]/90 border border-gray-800 shadow-panel overflow-hidden">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2.5 text-gray-300 hover:text-white hover:bg-[#101F31] transition-colors border-b border-gray-800"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2.5 text-gray-300 hover:text-white hover:bg-[#101F31] transition-colors border-b border-gray-800"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          title="Reset View to India Centroid"
          className="p-2.5 text-gray-300 hover:text-cyan-400 hover:bg-[#101F31] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
