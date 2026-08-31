export type EventType = 'FLOOD' | 'FIRE' | 'CROP_STRESS' | 'INFRASTRUCTURE_CHANGE' | 'MARITIME' | 'PORT_CONGESTION';

export type EventSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface IntelligenceEvent {
  id: string;
  type: EventType;
  severity: EventSeverity;
  title: string;
  location: string;
  state: string;
  latitude: number;
  longitude: number;
  confidence: number; // 0-100%
  area_km2: number;
  source: string; // e.g. 'SIMULATED_EO', 'ISRO_DEMO'
  model?: string; // e.g. 'FloodNet-Demo'
  inference_ms?: number;
  timestamp: string;
  riskFactors?: {
    factor: string;
    level: 'Low' | 'Medium' | 'High' | 'Critical';
  }[];
  description?: string;
}

export interface EventFilter {
  type: EventType | 'ALL';
  severity: EventSeverity | 'ALL';
  searchQuery: string;
}
