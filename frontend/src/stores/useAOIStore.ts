import { create } from 'zustand';
import { AOISelection, SensorType, AnalysisType, GeoAIResult } from '../types/aoi';

interface AOIState {
  currentAOI: AOISelection | null;
  selectedSensor: SensorType;
  selectedAnalysis: AnalysisType;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisStepsText: string[];
  lastResult: GeoAIResult | null;
  setAOI: (aoi: AOISelection | null) => void;
  setSensor: (sensor: SensorType) => void;
  setAnalysis: (analysis: AnalysisType) => void;
  startAnalysis: () => void;
  setAnalysisStep: (step: number) => void;
  setAnalysisResult: (result: GeoAIResult) => void;
  resetAOI: () => void;
}

const DEFAULT_AOI: AOISelection = {
  id: 'AOI-KRISHNA-01',
  regionName: 'Krishna Delta Inundation Zone',
  areaKm2: 4820,
  coordinates: [
    [
      [80.1, 15.9],
      [81.2, 15.9],
      [81.2, 16.8],
      [80.1, 16.8],
      [80.1, 15.9],
    ],
  ],
  bbox: [80.1, 15.9, 81.2, 16.8],
};

export const useAOIStore = create<AOIState>((set) => ({
  currentAOI: DEFAULT_AOI,
  selectedSensor: 'SAR',
  selectedAnalysis: 'FLOOD',
  isAnalyzing: false,
  analysisStep: 0,
  analysisStepsText: [
    'AOI geometry validated',
    'Sensor telemetry & orbit data acquired',
    'Pre-processing & calibration complete',
    'Feature extraction & cloud masking',
    'GeoAI neural inference running',
    'Polygons & risk metrics generated',
  ],
  lastResult: {
    confidence: 94,
    affectedAreaKm2: 128,
    detectedRegionsCount: 17,
    processingTimeSec: 18.4,
    features: [],
    riskFactors: [
      { factor: 'Water Expansion Rate', level: 'High' },
      { factor: 'Historical Flood Plain', level: 'Medium' },
      { factor: 'Population Exposure', level: 'High' },
    ],
    isSimulated: true,
  },
  setAOI: (currentAOI) => set({ currentAOI }),
  setSensor: (selectedSensor) => set({ selectedSensor }),
  setAnalysis: (selectedAnalysis) => set({ selectedAnalysis }),
  startAnalysis: () => set({ isAnalyzing: true, analysisStep: 0 }),
  setAnalysisStep: (analysisStep) => set({ analysisStep }),
  setAnalysisResult: (lastResult) => set({ isAnalyzing: false, lastResult }),
  resetAOI: () => set({ currentAOI: null, lastResult: null, isAnalyzing: false }),
}));
