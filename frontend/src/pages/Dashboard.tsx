import React, { useState } from 'react';
import { EventFeed } from '../components/events/EventFeed';
import { MultiMapContainer } from '../components/map/MultiMapContainer';
import { RightPanel } from '../components/layout/RightPanel';
import { SmartAIDetector } from '../components/aoi/SmartAIDetector';

export const Dashboard: React.FC = () => {
  const [splitView, setSplitView] = useState(false);

  return (
    <div className="flex-1 flex overflow-hidden relative bg-[#EFF4F9]">
      {/* Real-time Event Feed Sidebar */}
      <EventFeed />

      {/* Main Center Map (Single vs Multi-Map Split View - Image 840 Light Theme) */}
      <div className="flex-1 p-2 flex flex-col min-w-0 overflow-hidden">
        <MultiMapContainer
          splitView={splitView}
          onToggleSplit={() => setSplitView(!splitView)}
        />
      </div>

      {/* Right Dynamic Event Details Panel + Smart AI Detector (Image 840 Light Style) */}
      <div className="flex flex-col z-20 shrink-0 border-l border-slate-300 bg-[#EFF4F9] overflow-y-auto w-80">
        <RightPanel />
        <div className="p-3 border-t border-slate-300">
          <SmartAIDetector />
        </div>
      </div>
    </div>
  );
};
