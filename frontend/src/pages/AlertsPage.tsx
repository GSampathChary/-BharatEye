import React, { useState } from 'react';
import { Bell, Check, MapPin, ShieldAlert } from 'lucide-react';
import { useEventStore } from '../stores/useEventStore';
import { useMapStore } from '../stores/useMapStore';
import { useUIStore } from '../stores/useUIStore';
import { useNavigate } from 'react-router-dom';

export const AlertsPage: React.FC = () => {
  const { events, selectEvent } = useEventStore();
  const { flyTo, setSelectedEntityId } = useMapStore();
  const { setRightPanelOpen } = useUIStore();
  const navigate = useNavigate();

  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredEvents = events.filter((evt) => {
    if (severityFilter === 'ALL') return true;
    return evt.severity === severityFilter;
  });

  const handleAcknowledge = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!acknowledgedIds.includes(id)) {
      setAcknowledgedIds([...acknowledgedIds, id]);
    }
  };

  const handleOpenOnMap = (evt: any) => {
    selectEvent(evt);
    setRightPanelOpen(true);
    flyTo(evt.latitude, evt.longitude, 9.5);
    setSelectedEntityId(evt.id);
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-[#EFF4F9] space-y-6 select-none font-sans">
      {/* Header (Image 1 Sachet Navy Header Theme) */}
      <div className="p-4 rounded-xl bg-[#0B2545] border border-blue-900 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-red-600 text-white border border-red-400/40 shadow-sm">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base font-bold text-amber-400 uppercase tracking-wide">
              REAL-TIME ALERTS HUB & DISASTER TRIAGE
            </h1>
            <p className="text-xs text-gray-200">
              National Disaster Warning Stream • Severity Triage • One-Click Map Navigation
            </p>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex space-x-1.5 font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                severityFilter === sev
                  ? 'bg-[#0052CC] text-white border border-blue-400 shadow-sm'
                  : 'bg-[#102A4C] text-gray-300 border border-blue-800 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Table / Cards */}
      <div className="space-y-2.5">
        {filteredEvents.map((evt) => {
          const isAcked = acknowledgedIds.includes(evt.id);
          return (
            <div
              key={evt.id}
              onClick={() => handleOpenOnMap(evt)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer shadow-sm ${
                isAcked
                  ? 'bg-white/60 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 hover:border-[#0052CC] hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2.5 rounded-lg border ${
                  evt.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm font-sans">{evt.title}</span>
                    <span className="text-[10px] text-[#0052CC] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">
                      {evt.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-600 font-sans">
                    <span className="flex items-center gap-1 text-[#0052CC] font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#0052CC]" /> {evt.location}
                    </span>
                    <span>Confidence: <strong className="text-slate-900 font-mono">{evt.confidence}%</strong></span>
                    <span>Area: <strong className="text-slate-900 font-mono">{evt.area_km2} km²</strong></span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={(e) => handleAcknowledge(evt.id, e)}
                  disabled={isAcked}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm ${
                    isAcked
                      ? 'bg-slate-200 text-slate-500 border border-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{isAcked ? 'ACKNOWLEDGED' : 'ACKNOWLEDGE'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
