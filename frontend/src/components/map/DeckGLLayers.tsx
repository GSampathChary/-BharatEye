import { ScatterplotLayer, GeoJsonLayer, PolygonLayer, PathLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { IntelligenceEvent } from '../../types/event';
import { MapLayersToggle } from '../../types/geo';
import { AOISelection } from '../../types/aoi';
import { SatelliteEntity } from '../../types/satellite';

interface DeckGLLayersProps {
  layersConfig: MapLayersToggle;
  events: IntelligenceEvent[];
  currentAOI: AOISelection | null;
  satellites: SatelliteEntity[];
  selectedEntityId: string | null;
  onEventClick: (event: IntelligenceEvent) => void;
}

export function renderDeckGLLayers({
  layersConfig,
  events,
  currentAOI,
  satellites,
  selectedEntityId,
  onEventClick,
}: DeckGLLayersProps) {
  const deckLayers = [];

  // Helper for event colors
  const getEventColor = (severity: string): [number, number, number, number] => {
    switch (severity) {
      case 'CRITICAL':
        return [239, 68, 68, 220]; // Red
      case 'HIGH':
        return [245, 158, 11, 220]; // Amber
      case 'MEDIUM':
        return [59, 130, 246, 220]; // Blue
      default:
        return [16, 185, 129, 220]; // Green
    }
  };

  // Layer 1 — Events Scatterplot (Deck.gl ScatterplotLayer)
  if (layersConfig.events) {
    deckLayers.push(
      new ScatterplotLayer({
        id: 'events-layer',
        data: events,
        pickable: true,
        opacity: 0.9,
        stroked: true,
        filled: true,
        radiusScale: 100,
        radiusMinPixels: 6,
        radiusMaxPixels: 24,
        lineWidthMinPixels: 2,
        getPosition: (d: IntelligenceEvent) => [d.longitude, d.latitude],
        getRadius: (d: IntelligenceEvent) => (d.severity === 'CRITICAL' ? 300 : 150),
        getFillColor: (d: IntelligenceEvent) => getEventColor(d.severity),
        getLineColor: (d: IntelligenceEvent) =>
          d.id === selectedEntityId ? [0, 242, 254, 255] : [255, 255, 255, 180],
        onClick: (info: any) => {
          if (info.object) {
            onEventClick(info.object as IntelligenceEvent);
          }
        },
      })
    );
  }

  // Layer 2 — Heatmap (Deck.gl HeatmapLayer)
  if (layersConfig.heatmap) {
    deckLayers.push(
      new HeatmapLayer({
        id: 'heatmap-layer',
        data: events,
        pickable: false,
        getPosition: (d: IntelligenceEvent) => [d.longitude, d.latitude],
        getWeight: (d: IntelligenceEvent) => (d.confidence || 80) / 100,
        radiusPixels: 45,
        intensity: 1.5,
        threshold: 0.05,
      })
    );
  }

  // Layer 4 — AOI (GeoJsonLayer)
  if (layersConfig.aoi && currentAOI) {
    deckLayers.push(
      new GeoJsonLayer({
        id: 'aoi-layer',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: currentAOI.regionName },
              geometry: {
                type: 'Polygon',
                coordinates: currentAOI.coordinates,
              },
            },
          ],
        },
        pickable: true,
        stroked: true,
        filled: true,
        lineWidthMinPixels: 2,
        getFillColor: [0, 242, 254, 40], // Cyan transparent
        getLineColor: [0, 242, 254, 255], // Cyan outline
      })
    );
  }

  // Layer 5 — Satellite Footprints (PolygonLayer)
  if (layersConfig.satelliteFootprints) {
    const satelliteFootprintsData = satellites.map((sat) => {
      const w = 2.5;
      const h = 1.5;
      return {
        id: sat.id,
        name: sat.name,
        polygon: [
          [sat.longitude - w, sat.latitude - h],
          [sat.longitude + w, sat.latitude - h],
          [sat.longitude + w * 0.8, sat.latitude + h],
          [sat.longitude - w * 0.8, sat.latitude + h],
          [sat.longitude - w, sat.latitude - h],
        ],
      };
    });

    deckLayers.push(
      new PolygonLayer({
        id: 'satellite-footprints-layer',
        data: satelliteFootprintsData,
        pickable: true,
        stroked: true,
        filled: true,
        extruded: false,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d: any) => d.polygon,
        getFillColor: [59, 130, 246, 25],
        getLineColor: [59, 130, 246, 180],
      })
    );
  }

  // Layer 6 — Vessel observations (ScatterplotLayer)
  if (layersConfig.vessels) {
    const simulatedVessels = [
      { id: 'VSL-01', name: 'MV Southern Star', lat: 18.9, lng: 72.4, speed: 14 },
      { id: 'VSL-02', name: 'Tanker oceania', lat: 15.2, lng: 73.1, speed: 11 },
      { id: 'VSL-03', name: 'Cargo Express', lat: 13.2, lng: 80.6, speed: 16 },
      { id: 'VSL-04', name: 'Fishery Patrol', lat: 9.8, lng: 76.1, speed: 9 },
    ];

    deckLayers.push(
      new ScatterplotLayer({
        id: 'vessels-layer',
        data: simulatedVessels,
        pickable: true,
        opacity: 0.85,
        radiusMinPixels: 5,
        radiusMaxPixels: 10,
        getPosition: (d: any) => [d.lng, d.lat],
        getFillColor: [168, 85, 247, 220], // Purple
        getLineColor: [255, 255, 255, 200],
      })
    );
  }

  // Layer 7 — Tracks (PathLayer)
  if (layersConfig.tracks) {
    const tracksData = [
      {
        path: [
          [72.4, 18.9],
          [72.8, 18.5],
          [73.1, 17.8],
          [73.8, 15.4],
        ],
        name: 'Vessel Track - MV Southern Star',
      },
    ];

    deckLayers.push(
      new PathLayer({
        id: 'tracks-layer',
        data: tracksData,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 2,
        getPath: (d: any) => d.path,
        getColor: [236, 72, 153, 200],
        getWidth: 3,
      })
    );
  }

  return deckLayers;
}
