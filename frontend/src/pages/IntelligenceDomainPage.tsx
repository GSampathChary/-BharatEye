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
      <div className="h-10 bg-[#0B1726] border-b border-gray-800 px-4 flex items-center justify-between z-20 shrink-0 font-mono text-xs select-none">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 ${domainInfo.color}`} />
          <h2 className="font-bold text-white uppercase tracking-wider">{domainInfo.title}</h2>
        </div>
        <span className="text-[10px] text-gray-400">DOMAIN-SPECIFIC DECK.GL VISUALIZATION</span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        <EventFeed />
        <div className="flex-1 relative overflow-hidden">
          <IndiaMap />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};
