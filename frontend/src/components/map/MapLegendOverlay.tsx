import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Info, Eye } from 'lucide-react';

export const MapLegendOverlay: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const legendItems = [
    { label: 'Critical Flood Inundation', color: '#EF4444' },
    { label: 'Moderate Inundation (0.5m-1.5m)', color: '#F97316' },
    { label: 'Crop Stress Deficit (NDVI < 0.2)', color: '#F59E0B' },
    { label: 'Healthy Vegetation (NDVI > 0.6)', color: '#10B981' },
    { label: 'Active Thermal Hotspot (Fire)', color: '#EC4899' },
    { label: 'Maritime Vessel Track', color: '#3B82F6' },
  ];

  return (
    <div className="absolute top-4 right-4 z-20 select-none font-mono text-xs max-w-xs">
      <div className="bg-[#0B1726]/90 border border-cyan-500/40 rounded-xl shadow-glow-cyan overflow-hidden backdrop-blur-md">
        {/* Header bar */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="p-2.5 bg-[#101F31] border-b border-gray-800 flex items-center justify-between cursor-pointer text-cyan-400 hover:text-white transition-all"
        >
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider text-[11px]">ISRO / EO MAP LEGEND</span>
          </div>
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>

        {!collapsed && (
          <div className="p-3 space-y-2 text-[11px]">
            {/* Color spectrum bar */}
            <div className="space-y-1.5">
              {legendItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between space-x-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-3.5 h-3.5 rounded border border-white/20 shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 font-sans">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Vegetation Index Scale Bar (NDVI) */}
            <div className="pt-2 border-t border-gray-800/80">
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>NDVI Index Scale</span>
                <span className="text-emerald-400 font-bold">-0.2 to +0.8</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500" />
            </div>

            <div className="text-[9px] text-gray-500 flex items-center gap-1 pt-1 font-sans">
              <Info className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>ISRO Bhuvan & Sentinel-2 Multispectral Overlay Data</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
