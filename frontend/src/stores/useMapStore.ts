import { create } from 'zustand';
import { ViewState, BaseMapStyle, MapLayersToggle } from '../types/geo';

interface MapState {
  viewState: ViewState;
  baseMapStyle: BaseMapStyle;
  layers: MapLayersToggle;
  selectedEntityId: string | null;
  performanceMetrics: {
    totalEntities: number;
    visibleEntities: number;
    fps: number;
    updatesPerSec: number;
    lastRenderTimeMs: number;
  };
  setViewState: (viewState: ViewState) => void;
  flyTo: (lat: number, lng: number, zoom?: number) => void;
  setBaseMapStyle: (style: BaseMapStyle) => void;
  toggleLayer: (layerName: keyof MapLayersToggle) => void;
  setSelectedEntityId: (id: string | null) => void;
  updatePerformanceMetrics: (metrics: Partial<MapState['performanceMetrics']>) => void;
}

export const useMapStore = create<MapState>((set) => ({
  viewState: {
    longitude: 78.9629,
    latitude: 20.5937, // Centered on India
    zoom: 5.2,
    pitch: 0,
    bearing: 0,
  },
  baseMapStyle: 'street', // Default to Smart Disaster AI Light Street Map
  layers: {
    events: true,
    heatmap: true,
    risk: true,
    aoi: true,
    satelliteFootprints: true,
    vessels: true,
    tracks: false,
  },
  selectedEntityId: null,
  performanceMetrics: {
    totalEntities: 10842,
    visibleEntities: 3418,
    fps: 60,
    updatesPerSec: 1240,
    lastRenderTimeMs: 12.1,
  },
  setViewState: (viewState) => set({ viewState }),
  flyTo: (latitude, longitude, zoom = 9) =>
    set((state) => ({
      viewState: {
        ...state.viewState,
        latitude,
        longitude,
        zoom,
        pitch: 0,
      },
    })),
  setBaseMapStyle: (baseMapStyle) => set({ baseMapStyle }),
  toggleLayer: (layerName) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layerName]: !state.layers[layerName],
      },
    })),
  setSelectedEntityId: (selectedEntityId) => set({ selectedEntityId }),
  updatePerformanceMetrics: (metrics) =>
    set((state) => ({
      performanceMetrics: {
        ...state.performanceMetrics,
        ...metrics,
      },
    })),
}));
