export type SensorType = 'OPTICAL' | 'SAR' | 'MULTISPECTRAL' | 'THERMAL';

export type AnalysisType = 'FLOOD' | 'CROP_STRESS' | 'FIRE' | 'INFRASTRUCTURE' | 'VESSEL';

export interface GeoAIResult {
  confidence: number;
  affectedAreaKm2: number;
  detectedRegionsCount: number;
  processingTimeSec: number;
  features: any[]; // GeoJSON features
  riskFactors: { factor: string; level: 'Low' | 'Medium' | 'High' | 'Critical' }[];
  isSimulated: true;
}

export interface AOISelection {
  id: string;
  regionName: string;
  coordinates: number[][][]; // GeoJSON polygon coordinates
  areaKm2: number;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}
