import React from 'react';
import { IndiaMap } from '../components/map/IndiaMap';
import { AOIDrawer } from '../components/aoi/AOIDrawer';
import { GeoAIModal } from '../components/aoi/GeoAIModal';
import { HotspotPanel } from '../components/aoi/HotspotPanel';

export const AOIAnalysisPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative">
      {/* Hotspot & ADI Intelligence Panel (Image 3 layout style) */}
      <HotspotPanel />

      {/* Main Map Canvas */}
      <div className="flex-1 min-h-[24rem] md:min-h-0 relative overflow-hidden">
        <IndiaMap />
      </div>

      {/* Target AOI Drawer */}
      <AOIDrawer />

      {/* GeoAI Execution Pipeline Modal */}
      <GeoAIModal />
    </div>
  );
};
