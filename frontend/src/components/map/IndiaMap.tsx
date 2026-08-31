import React, { useEffect, useRef, useState } from 'react';
import DeckGL from '@deck.gl/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '../../stores/useMapStore';
import { renderDeckGLLayers } from './DeckGLLayers';
import { MapControls } from './MapControls';
import { PerformanceMonitor } from './PerformanceMonitor';
import { MapLegendOverlay } from './MapLegendOverlay';
import { useEventStore } from '../../stores/useEventStore';
import { useAOIStore } from '../../stores/useAOIStore';
import { useSatelliteStore } from '../../stores/useSatelliteStore';
import { useUIStore } from '../../stores/useUIStore';
import { QGIS_BASEMAPS } from '../../utils/QGISBasemapProvider';
import { Plus, Minus, Layers } from 'lucide-react';

export const IndiaMap: React.FC<{ splitView?: boolean }> = ({ splitView = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const { viewState, setViewState, baseMapStyle, layers, selectedEntityId } = useMapStore();
  const { events, selectEvent } = useEventStore();
  const { currentAOI } = useAOIStore();
  const { satellites } = useSatelliteStore();
  const { performanceMonitorOpen } = useUIStore();

  const [activeCategory, setActiveCategory] = useState<'FLOOD' | 'FIRE'>('FLOOD');
  const [showLegend, setShowLegend] = useState(true);

  // Select Tile URL based on style
  const getTileUrl = (style: string) => {
    switch (style) {
      case 'satellite':
        return QGIS_BASEMAPS.qgis_satellite.url;
      case 'dark':
        return QGIS_BASEMAPS.qgis_dark.url;
      case 'street':
      case 'light':
      default:
        return QGIS_BASEMAPS.qgis_street.url;
    }
  };

  // Initialize Leaflet Map Engine with Native Overzooming (maxNativeZoom 18, maxZoom 22)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (leafletMapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [viewState.latitude, viewState.longitude],
      zoom: viewState.zoom,
      maxZoom: 22,
      minZoom: 2,
      zoomControl: false,
      attributionControl: false,
    });

    const tileLayer = L.tileLayer(getTileUrl(baseMapStyle), {
      maxNativeZoom: 18, // Tile server max zoom limit
      maxZoom: 22,       // Allows smooth browser overzooming up to zoom 22!
      tileSize: 256,
      subdomains: 'abc',
    }).addTo(map);

    map.on('move', () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setViewState({
        ...viewState,
        latitude: center.lat,
        longitude: center.lng,
        zoom: zoom,
      });
    });

    leafletMapRef.current = map;
    tileLayerRef.current = tileLayer;

    return () => {
      map.remove();
      leafletMapRef.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  // Update tile URL when baseMapStyle changes
  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(getTileUrl(baseMapStyle));
    }
  }, [baseMapStyle]);

  // Sync Leaflet camera when flyTo or viewState changes externally
  useEffect(() => {
    if (leafletMapRef.current) {
      const currentCenter = leafletMapRef.current.getCenter();
      const currentZoom = leafletMapRef.current.getZoom();
      if (
        Math.abs(currentCenter.lat - viewState.latitude) > 0.001 ||
        Math.abs(currentCenter.lng - viewState.longitude) > 0.001 ||
        Math.abs(currentZoom - viewState.zoom) > 0.1
      ) {
        leafletMapRef.current.setView([viewState.latitude, viewState.longitude], viewState.zoom, { animate: true });
      }
    }
  }, [viewState.latitude, viewState.longitude, viewState.zoom]);

  // Render Deck.gl GPU-accelerated event & intelligence layers
  const customDeckLayers = renderDeckGLLayers({
    layersConfig: layers,
    events,
    currentAOI,
    satellites,
    selectedEntityId,
    onEventClick: (evt: any) => {
      selectEvent(evt);
    },
  });

  const handleZoomIn = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#EAF0F6] overflow-hidden select-none font-sans rounded-xl border border-slate-200 shadow-sm">
      {/* Leaflet HTML5 Map Canvas (Leaflet Engine - 100% Guaranteed Zero Missing Zoom Tiles) */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Top Header Strip (Smart Disaster AI Image 840 Style) */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-xs backdrop-blur-md pointer-events-auto">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-bold text-slate-800 tracking-wide font-sans">
            Disaster Map
          </h2>
        </div>

        {/* Category Toggles (Image 840 Style) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveCategory('FLOOD')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
              activeCategory === 'FLOOD'
                ? 'bg-[#0052CC] text-white border border-[#0052CC]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <span>🌊 Floods</span>
          </button>
          <button
            onClick={() => setActiveCategory('FIRE')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
              activeCategory === 'FIRE'
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <span>🔥 Fires</span>
          </button>
        </div>
      </div>

      {/* Zoom Controls (+) (-) (Image 840 Style Top Left) */}
      <div className="absolute top-14 left-3 z-20 flex flex-col space-y-1 bg-white border border-slate-300 rounded-md shadow-md pointer-events-auto">
        <button
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-slate-100 text-slate-800 font-bold border-b border-slate-200 transition-all rounded-t-md cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-slate-100 text-slate-800 font-bold transition-all rounded-b-md cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Deck.gl GPU Overlay (Events, Hotspots, AOIs, Satellites) */}
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        controller={false}
        layers={customDeckLayers}
        getCursor={({ isHovering }: { isHovering: boolean }) => (isHovering ? 'pointer' : 'default')}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />

      {/* Floating Map Controls overlay */}
      <MapControls />

      {/* ISRO Bhuvan / National Dashboard NDVI & Legend Overlay */}
      {showLegend && <MapLegendOverlay />}

      {/* Bottom Right Leaflet Attribution (Image 840 Style) */}
      <div className="absolute bottom-2 right-2 bg-white/90 border border-slate-300 px-2 py-0.5 rounded text-[10px] font-sans text-slate-600 z-10 flex items-center space-x-1 shadow-xs backdrop-blur-md">
        <span className="w-3 h-2 bg-[#0052CC] inline-block rounded-xs" />
        <span className="font-semibold text-slate-800">Leaflet</span>
        <span className="text-slate-400">| Esri World Street</span>
      </div>

      {/* Map Scale & Centroid Coordinates */}
      <div className="absolute bottom-2 left-3 bg-white/90 border border-slate-300 px-3 py-1 rounded text-[10px] font-mono text-slate-700 space-x-3 pointer-events-none z-10 flex items-center shadow-xs backdrop-blur-md">
        <span>CENTROID: <strong className="text-[#0052CC]">{viewState.latitude.toFixed(4)}°N, {viewState.longitude.toFixed(4)}°E</strong></span>
        <span>ZOOM: <strong className="text-slate-900">{viewState.zoom.toFixed(1)}</strong></span>
        <span>ENGINE: <strong className="text-emerald-700 font-bold">Leaflet JS (0-22 Zoom)</strong></span>
      </div>
    </div>
  );
};
