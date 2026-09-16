import React from 'react';
import { ChartsGrid } from '../components/analytics/ChartsGrid';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-[#EFF4F9] space-y-4 md:space-y-6 select-none font-sans">
      {/* Header Bar (Image 1 Sachet Navy Header Theme) */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#0B2545] border border-blue-900 flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:justify-between text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-[#0052CC] text-white border border-blue-400/40 shadow-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-amber-400 font-sans tracking-wide uppercase">
              GEOSPATIAL INTELLIGENCE ANALYTICS DASHBOARD
            </h1>
            <p className="text-xs text-gray-200 font-sans">
              National ECharts Aggregate Analysis • Disaster Volumes • Regional Risk • Model Latency
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded bg-[#102A4C] border border-blue-700 text-amber-300 font-bold shadow-sm">
            <span>10,842</span> TOTAL ENTITIES
          </div>
          <div className="px-3 py-1.5 rounded bg-emerald-700 text-white font-bold border border-emerald-400/40 shadow-sm">
            100% POSTGIS READY
          </div>
        </div>
      </div>

      {/* Apache ECharts Grid */}
      <ChartsGrid />
    </div>
  );
};
