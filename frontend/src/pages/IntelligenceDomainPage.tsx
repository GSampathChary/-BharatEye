import React from 'react';
import { useParams } from 'react-router-dom';
import { IndiaMap } from '../components/map/IndiaMap';
import { EventFeed } from '../components/events/EventFeed';
import { RightPanel } from '../components/layout/RightPanel';
import { Droplets, Wheat, Flame, Building2, Anchor } from 'lucide-react';

export const IntelligenceDomainPage: React.FC = () => {
  const { domain } = useParams<{ domain: string }>();

  const getDomainTitle = (d?: string) => {
    switch (d) {
      case 'flood':
        return { title: 'Flood & Inundation Intelligence', icon: Droplets, color: 'text-cyan-400' };
      case 'agriculture':
        return { title: 'Agriculture & Crop Stress Monitor', icon: Wheat, color: 'text-amber-400' };
      case 'fire':
        return { title: 'Forest Fire & Thermal Hotspots', icon: Flame, color: 'text-red-400' };
      case 'infrastructure':
        return { title: 'Infrastructure Change Detection', icon: Building2, color: 'text-blue-400' };
      case 'maritime':
        return { title: 'Maritime & Port Intelligence', icon: Anchor, color: 'text-purple-400' };
      default:
        return { title: 'Geospatial Intelligence Domain', icon: Droplets, color: 'text-cyan-400' };
    }
  };

  const domainInfo = getDomainTitle(domain);
  const Icon = domainInfo.icon;

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* Domain Header Sub-bar */}
      <div className="min-h-10 bg-[#0B1726] border-b border-gray-800 px-3 md:px-4 py-2 md:py-0 flex items-center justify-between gap-2 z-20 shrink-0 font-mono text-xs select-none">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 ${domainInfo.color}`} />
          <h2 className="font-bold text-white uppercase tracking-wider leading-tight">{domainInfo.title}</h2>
        </div>
        <span className="hidden sm:block text-[10px] text-gray-400 text-right">DOMAIN-SPECIFIC DECK.GL VISUALIZATION</span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative">
        <EventFeed />
        <div className="flex-1 min-h-[24rem] md:min-h-0 relative overflow-hidden">
          <IndiaMap />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};
