import React from 'react';
import { Activity, Target, Satellite, AlertTriangle, Cpu } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { useSatelliteStore } from '../../stores/useSatelliteStore';

export const BottomMetrics: React.FC = () => {
  const { events } = useEventStore();
  const { satellites } = useSatelliteStore();

  const criticalCount = events.filter((e) => e.severity === 'CRITICAL' || e.severity === 'HIGH').length;
  const onlineSatellites = satellites.filter((s) => s.status === 'ONLINE' || s.status === 'PROCESSING').length;

  const metrics = [
    { label: 'Active Events', value: events.length, sub: '12 added today', icon: Activity, color: 'text-cyan-400' },
    { label: 'Active AOIs', value: 14, sub: 'Krishna, Brahmaputra...', icon: Target, color: 'text-blue-400' },
    { label: 'Satellites', value: `${onlineSatellites}/${satellites.length}`, sub: '4 telemetry feeds', icon: Satellite, color: 'text-emerald-400' },
    { label: 'High Risk Zones', value: criticalCount, sub: 'Requires immediate EO', icon: AlertTriangle, color: 'text-amber-400' },
    { label: 'Inferences', value: '10.8k/s', sub: 'Sub-100ms latency', icon: Cpu, color: 'text-purple-400' },
  ];

  return (
    <div className="h-14 bg-[#06111F]/95 border-t border-gray-800/80 px-4 flex items-center justify-between z-20 shrink-0 backdrop-blur-md overflow-x-auto">
      <div className="flex items-center space-x-6 w-full justify-around">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 text-xs">
              <div className={`p-2 rounded-md bg-[#0B1726] border border-gray-800 ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 font-sans text-[11px]">{m.label}:</span>
                  <span className="font-bold font-mono text-white text-sm">{m.value}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{m.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
