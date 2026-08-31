import { create } from 'zustand';
import { SatelliteEntity } from '../types/satellite';

const INITIAL_SATELLITES: SatelliteEntity[] = [
  {
    id: 'SAT-01',
    name: 'EOS-04 (RISAT-1A)',
    code: 'SAT-01',
    status: 'ONLINE',
    sensor: 'SAR Radar',
    currentAOI: 'Krishna Delta, AP',
    model: 'FloodNet-Demo',
    inferenceMs: 82,
    cpuPct: 68,
    memoryPct: 54,
    downlinkKbps: 237,
    lastObservationTime: '30s ago',
    latitude: 18.5,
    longitude: 78.5,
  },
  {
    id: 'SAT-02',
    name: 'Cartosat-3',
    code: 'SAT-02',
    status: 'ONLINE',
    sensor: 'Pan-Multispectral',
    currentAOI: 'Mayurbhanj, Odisha',
    model: 'FireDetect-Demo',
    inferenceMs: 64,
    cpuPct: 74,
    memoryPct: 61,
    downlinkKbps: 412,
    lastObservationTime: '1m ago',
    latitude: 22.1,
    longitude: 82.3,
  },
  {
    id: 'SAT-03',
    name: 'Resourcesat-2A',
    code: 'SAT-03',
    status: 'PROCESSING',
    sensor: 'Multispectral AWiFS',
    currentAOI: 'Nalgonda, TS',
    model: 'CropStress-Demo',
    inferenceMs: 95,
    cpuPct: 88,
    memoryPct: 79,
    downlinkKbps: 185,
    lastObservationTime: '12s ago',
    latitude: 16.3,
    longitude: 80.5,
  },
  {
    id: 'SAT-04',
    name: 'Oceansat-3',
    code: 'SAT-04',
    status: 'OFFLINE',
    sensor: 'Thermal OCM',
    currentAOI: 'Arabian Sea',
    model: 'VesselDetect-Demo',
    inferenceMs: 0,
    cpuPct: 0,
    memoryPct: 12,
    downlinkKbps: 0,
    lastObservationTime: '4h ago',
    latitude: 12.4,
    longitude: 74.2,
  },
  {
    id: 'SAT-05',
    name: 'INSAT-3DR',
    code: 'SAT-05',
    status: 'ONLINE',
    sensor: 'Imager & Sounder',
    currentAOI: 'JNPA Port, MH',
    model: 'PortIntel-Demo',
    inferenceMs: 55,
    cpuPct: 45,
    memoryPct: 52,
    downlinkKbps: 310,
    lastObservationTime: '2m ago',
    latitude: 24.8,
    longitude: 73.1,
  },
];

interface SatelliteState {
  satellites: SatelliteEntity[];
  selectedSatellite: SatelliteEntity | null;
  selectSatellite: (sat: SatelliteEntity | null) => void;
  updateTelemetry: (id: string, telemetry: Partial<SatelliteEntity>) => void;
}

export const useSatelliteStore = create<SatelliteState>((set) => ({
  satellites: INITIAL_SATELLITES,
  selectedSatellite: INITIAL_SATELLITES[2], // default SAT-03
  selectSatellite: (selectedSatellite) => set({ selectedSatellite }),
  updateTelemetry: (id, telemetry) =>
    set((state) => ({
      satellites: state.satellites.map((sat) =>
        sat.id === id ? { ...sat, ...telemetry } : sat
      ),
    })),
}));
