export interface SatelliteEntity {
  id: string;
  name: string;
  code: string;
  status: 'ONLINE' | 'PROCESSING' | 'OFFLINE';
  sensor: 'SAR Radar' | 'Pan-Multispectral' | 'Multispectral AWiFS' | 'Thermal OCM' | 'Imager & Sounder';
  currentAOI?: string;
  model: string; // e.g. 'FloodNet-Demo'
  inferenceMs: number;
  cpuPct: number;
  memoryPct: number;
  downlinkKbps: number;
  lastObservationTime: string;
  latitude: number;
  longitude: number;
}

export interface EdgeAIModel {
  name: string;
  version: string;
  task: string;
  precision: string;
  avgLatencyMs: number;
  accuracy: number;
}
