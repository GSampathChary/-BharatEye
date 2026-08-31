import React from 'react';
import { X, MapPin, ShieldAlert, Clock, Sparkles, AlertTriangle, ExternalLink, CheckCircle2, PieChart, BarChart2 } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { useMapStore } from '../../stores/useMapStore';
import { useUIStore } from '../../stores/useUIStore';

export const RightPanel: React.FC = () => {
  const { selectedEvent } = useEventStore();
  const { flyTo, setSelectedEntityId } = useMapStore();
  const { rightPanelOpen, setRightPanelOpen } = useUIStore();

  return (
    <aside className="w-80 bg-[#EFF4F9] border-l border-slate-300 flex flex-col shrink-0 select-none shadow-lg text-xs font-sans">
      {/* Panel Header (Sachet Navy #0B2545) */}
      <div className="p-3 bg-[#0B2545] border-b border-blue-950 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-sans text-white">
            NATIONAL ANALYTICS & WIDGETS
          </h2>
        </div>
        {setRightPanelOpen && (
          <button
            onClick={() => setRightPanelOpen(false)}
            className="p-1 rounded text-gray-300 hover:text-white hover:bg-blue-900"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* Toast Alert Banner (Image 801 Orange Banner Style) */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md flex items-start justify-between space-x-2">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-white shrink-0 mt-0.5 animate-pulse" />
            <div>
              <strong className="block font-bold text-xs">Live Warning Alert</strong>
              <p className="text-[11px] font-medium leading-snug">
                Thunderstorm with Lightning warning received from IMD Patna over patna.
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 shrink-0 text-white cursor-pointer hover:opacity-80" />
        </div>

        {/* Widget 1: Ticket Summary (Image 801 Style) */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
            <span className="font-bold text-slate-800 uppercase text-[11px] flex items-center gap-1">
              <PieChart className="w-3.5 h-3.5 text-[#0052CC]" /> Ticket Summary
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">One Day</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full border-4 border-[#0052CC] mx-auto mb-1 flex items-center justify-center font-bold text-slate-800">
                100%
              </div>
              <span className="text-slate-600 font-semibold block">T-State</span>
              <span className="text-emerald-600 font-bold">Resolved</span>
            </div>

            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-full border-4 border-cyan-500 mx-auto mb-1 flex items-center justify-center font-bold text-slate-800">
                98%
              </div>
              <span className="text-slate-600 font-semibold block">SLA</span>
              <span className="text-[#0052CC] font-bold">Achieved</span>
            </div>
          </div>
        </div>

        {/* Widget 2: MHRD Compliance SMS (Image 801 Style) */}
        <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
            <span className="font-bold text-slate-800 uppercase text-[11px] flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-[#0052CC]" /> MHRD Compliance SMS
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">One Day</span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-600 mb-0.5 font-semibold">
                <span>Airtel</span>
                <span className="text-[#0052CC]">100%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0052CC] h-full w-[100%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5 font-semibold">
                <span>BSNL</span>
                <span className="text-[#0052CC]">96%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[96%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5 font-semibold">
                <span>Reliance Jio</span>
                <span className="text-[#0052CC]">99%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0052CC] h-full w-[99%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-0.5 font-semibold">
                <span>Vi</span>
                <span className="text-[#0052CC]">94%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[94%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Event Details (If Any) */}
        {selectedEvent && (
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                {selectedEvent.severity}
              </span>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3" /> {selectedEvent.timestamp}
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-900 mb-1">{selectedEvent.title}</h3>
            <div className="flex items-center text-[#0052CC] text-xs font-semibold gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedEvent.location}</span>
            </div>
          </div>
        )}
      </div>

      {/* Locate Button */}
      <div className="p-3 border-t border-slate-300 bg-slate-100">
        <button
          onClick={() => selectedEvent && flyTo(selectedEvent.latitude, selectedEvent.longitude, 9.5)}
          className="w-full py-2.5 px-3 rounded-lg bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
        >
          <MapPin className="w-3.5 h-3.5 text-white" />
          <span>LOCATE EVENT ON MAP</span>
        </button>
      </div>
    </aside>
  );
};
