export type BaseMapStyle = 'dark' | 'satellite' | 'light' | 'street';

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface MapLayersToggle {
  events: boolean;
  heatmap: boolean;
  risk: boolean;
  aoi: boolean;
  satelliteFootprints: boolean;
  vessels: boolean;
  tracks: boolean;
}

export interface PortEntity {
  name: string;
  code: string;
  lat: number;
  lng: number;
  state: string;
  vessels: number;
  congestion: number;
}
