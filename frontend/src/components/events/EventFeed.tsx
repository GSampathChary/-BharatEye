import React, { useState } from 'react';
import { 
  RefreshCw, 
  AlertTriangle, 
  Flame, 
  Droplets, 
  Wheat, 
  Building2, 
  Anchor, 
  Clock, 
  ShieldAlert,
  Zap
} from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { IntelligenceEvent } from '../../types/event';

export const EventFeed: React.FC = () => {
  const { events, selectedEvent, selectEvent } = useEventStore();
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Alerts', icon: AlertTriangle },
    { id: 'FLOOD', label: 'Floods', icon: Droplets },
    { id: 'CROP_STRESS', label: 'Crop Stress', icon: Wheat },
    { id: 'FOREST_FIRE', label: 'Fires', icon: Flame },
    { id: 'INFRASTRUCTURE', label: 'Infra', icon: Building2 },
    { id: 'MARITIME', label: 'Maritime', icon: Anchor },
  ];

  const filteredEvents = events.filter((e) => {
    const matchesType = selectedType === 'ALL' || e.type === selectedType;
    const matchesSeverity = filterSeverity === 'ALL' || e.severity === filterSeverity;
    return matchesType && matchesSeverity;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'FLOOD':
        return <Droplets className="w-4 h-4 text-blue-600" />;
      case 'FOREST_FIRE':
        return <Flame className="w-4 h-4 text-red-600" />;
      case 'CROP_STRESS':
        return <Wheat className="w-4 h-4 text-amber-600" />;
      case 'INFRASTRUCTURE':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'MARITIME':
        return <Anchor className="w-4 h-4 text-cyan-600" />;
      default:
        return <Zap className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-red-100 animate-pulse" />;
      case 'HIGH':
        return <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />;
      case 'MEDIUM':
        return <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />;
      default:
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />;
    }
  };

  return (
    <div className="w-80 bg-[#EFF4F9] border-r border-slate-300 flex flex-col z-20 shrink-0 select-none shadow-md font-sans text-xs">
      {/* Feed Header (Image 1 Sachet Live Alerts Header Style) */}
      <div className="p-3 bg-[#0B2545] border-b border-blue-900 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <h2 className="font-bold text-sm tracking-wide font-sans">Live Alerts Stream</h2>
          <span className="bg-amber-400 text-black text-[10px] px-1.5 py-0.5 rounded font-extrabold font-mono">
            {filteredEvents.length}
          </span>
        </div>
        <button
          onClick={() => setSelectedType('ALL')}
          className="p-1 rounded bg-[#102A4C] hover:bg-blue-900 text-gray-200 transition-all border border-blue-700/60"
          title="Refresh Alerts"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills (Image 1 Sachet Filter Style) */}
      <div className="p-2 bg-white border-b border-slate-200 flex space-x-1 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedType === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedType(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                isActive
                  ? 'bg-[#0052CC] text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Severity Filter Strip */}
      <div className="px-3 py-1.5 bg-slate-200/80 border-b border-slate-300 flex justify-between text-[10px] text-slate-700 font-medium">
        <span>Severity:</span>
        <div className="flex space-x-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`hover:underline ${filterSeverity === sev ? 'font-bold text-[#0052CC]' : ''}`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed Cards List (Image 1 Sachet Feed Cards) */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredEvents.map((evt: IntelligenceEvent) => {
          const isSelected = selectedEvent?.id === evt.id;
          return (
            <div
              key={evt.id}
              onClick={() => selectEvent(evt)}
              className={`p-3 rounded-lg border transition-all cursor-pointer shadow-sm relative ${
                isSelected
                  ? 'bg-white border-[#0052CC] ring-2 ring-blue-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
              }`}
            >
              {/* Card Top Line */}
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2 pr-2">
                  <div className="p-1 rounded bg-slate-100 border border-slate-200">
                    {getEventIcon(evt.type)}
                  </div>
                  <span className="font-bold text-slate-900 text-xs leading-tight">
                    {evt.title}
                  </span>
                </div>
                {getSeverityBadge(evt.severity)}
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                {evt.description}
              </p>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-1.5 font-mono">
                <span className="flex items-center gap-1 font-sans font-semibold text-slate-700">
                  📍 {evt.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {evt.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
