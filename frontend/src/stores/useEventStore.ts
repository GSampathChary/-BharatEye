import { create } from 'zustand';
import { IntelligenceEvent, EventType, EventSeverity } from '../types/event';

const INITIAL_EVENTS: IntelligenceEvent[] = [
  {
    id: 'EVT-FL001',
    type: 'FLOOD',
    severity: 'CRITICAL',
    title: 'Brahmaputra Basin Flash Flood',
    location: 'Kaziranga, Assam',
    state: 'Assam',
    latitude: 26.58,
    longitude: 93.17,
    confidence: 97,
    area_km2: 310,
    source: 'SIMULATED_EO',
    model: 'FloodNet-Demo',
    inference_ms: 82,
    timestamp: '2 minutes ago',
    riskFactors: [
      { factor: 'River Surge Rate', level: 'Critical' },
      { factor: 'Historical Vulnerability', level: 'High' },
      { factor: 'Agricultural Exposure', level: 'Critical' },
    ],
    description: 'Rapid inundation detected across Brahmaputra basin affecting sanctuary areas and low-lying agricultural zones.'
  },
  {
    id: 'EVT-FL002',
    type: 'FLOOD',
    severity: 'HIGH',
    title: 'Krishna Delta Inundation',
    location: 'Krishna Delta, Andhra Pradesh',
    state: 'Andhra Pradesh',
    latitude: 16.32,
    longitude: 80.51,
    confidence: 94,
    area_km2: 128,
    source: 'SIMULATED_EO',
    model: 'FloodNet-Demo',
    inference_ms: 78,
    timestamp: '8 minutes ago',
    riskFactors: [
      { factor: 'Water Expansion', level: 'High' },
      { factor: 'Population Exposure', level: 'High' },
      { factor: 'Paddy Crop Impact', level: 'Medium' },
    ],
    description: 'Monsoon discharge leading to elevated water levels in agricultural canals.'
  },
  {
    id: 'EVT-FR001',
    type: 'FIRE',
    severity: 'HIGH',
    title: 'Simlipal Forest Fire Event',
    location: 'Mayurbhanj, Odisha',
    state: 'Odisha',
    latitude: 21.88,
    longitude: 86.35,
    confidence: 91,
    area_km2: 45,
    source: 'SIMULATED_THERMAL',
    model: 'FireDetect-Demo',
    inference_ms: 64,
    timestamp: '15 minutes ago',
    riskFactors: [
      { factor: 'Thermal Anomaly Density', level: 'High' },
      { factor: 'Wind Velocity', level: 'Medium' },
    ],
    description: 'Active thermal hotspots detected via simulated IR satellite sensors.'
  },
  {
    id: 'EVT-CS001',
    type: 'CROP_STRESS',
    severity: 'MEDIUM',
    title: 'Telangana NDVI Deficit Zone',
    location: 'Nalgonda, Telangana',
    state: 'Telangana',
    latitude: 17.05,
    longitude: 79.26,
    confidence: 87,
    area_km2: 215,
    source: 'SIMULATED_MULTISPECTRAL',
    model: 'CropStress-Demo',
    inference_ms: 95,
    timestamp: '22 minutes ago',
    riskFactors: [
      { factor: 'Moisture Stress Index', level: 'Medium' },
      { factor: 'Chlorophyll Deficit', level: 'Medium' },
    ],
    description: 'Multispectral analysis indicates 18% reduction in mean NDVI relative to baseline.'
  },
  {
    id: 'EVT-MR001',
    type: 'MARITIME',
    severity: 'HIGH',
    title: 'Arabian Sea Vessel Anomaly',
    location: 'Offshore Mumbai, Maharashtra',
    state: 'Maharashtra',
    latitude: 18.72,
    longitude: 71.85,
    confidence: 88,
    area_km2: 12,
    source: 'SIMULATED_SAR',
    model: 'VesselDetect-Demo',
    inference_ms: 110,
    timestamp: '30 minutes ago',
    riskFactors: [
      { factor: 'AIS Telemetry Mismatch', level: 'High' },
      { factor: 'SAR Footprint Correlation', level: 'High' },
    ],
    description: 'SAR radar returns confirm unflagged vessel track deviating from shipping lanes.'
  },
  {
    id: 'EVT-PC001',
    type: 'PORT_CONGESTION',
    severity: 'MEDIUM',
    title: 'JNPA Outer Anchorage Congestion',
    location: 'Jawaharlal Nehru Port, Maharashtra',
    state: 'Maharashtra',
    latitude: 18.95,
    longitude: 72.95,
    confidence: 90,
    area_km2: 38,
    source: 'SIMULATED_OPTICAL',
    model: 'PortIntel-Demo',
    inference_ms: 55,
    timestamp: '45 minutes ago',
    riskFactors: [
      { factor: 'Container Vessel Density', level: 'High' },
      { factor: 'Dwell Time Increase', level: 'Medium' },
    ],
    description: '412 vessels detected in outer anchorage area; 89% berth occupancy.'
  }
];

interface EventState {
  events: IntelligenceEvent[];
  selectedEvent: IntelligenceEvent | null;
  activeTypeFilter: EventType | 'ALL';
  activeSeverityFilter: EventSeverity | 'ALL';
  searchQuery: string;
  isStreaming: boolean;
  addEvent: (event: IntelligenceEvent) => void;
  selectEvent: (event: IntelligenceEvent | null) => void;
  setTypeFilter: (type: EventType | 'ALL') => void;
  setSeverityFilter: (severity: EventSeverity | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: INITIAL_EVENTS,
  selectedEvent: INITIAL_EVENTS[0], // default to first critical event
  activeTypeFilter: 'ALL',
  activeSeverityFilter: 'ALL',
  searchQuery: '',
  isStreaming: true,
  addEvent: (newEvent) =>
    set((state) => ({
      events: [newEvent, ...state.events.slice(0, 499)], // keep top 500
    })),
  selectEvent: (selectedEvent) => set({ selectedEvent }),
  setTypeFilter: (activeTypeFilter) => set({ activeTypeFilter }),
  setSeverityFilter: (activeSeverityFilter) => set({ activeSeverityFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}));
