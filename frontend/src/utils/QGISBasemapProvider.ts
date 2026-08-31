/**
 * Fast Watermark-Free Open-Source Tile Providers
 * Support full zoom levels 0 through 19+ with refinement strategy for zero blank tiles.
 */

export interface QGISBasemap {
  id: string;
  name: string;
  url: string;
  maxZoom: number;
  attribution: string;
  styleType: 'dark' | 'light' | 'satellite' | 'street';
}

export const QGIS_BASEMAPS: Record<string, QGISBasemap> = {
  qgis_street: {
    id: 'qgis_street',
    name: 'Sachet National Street & Terrain Map (Image 801 Style)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    styleType: 'street',
  },
  qgis_osm: {
    id: 'qgis_osm',
    name: 'OpenStreetMap Standard (Fast 0-19 Zoom)',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    styleType: 'street',
  },
  qgis_topo: {
    id: 'qgis_topo',
    name: 'Esri World Topo Terrain Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong)',
    styleType: 'light',
  },
  qgis_dark: {
    id: 'qgis_dark',
    name: 'Esri World Dark Gray Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    styleType: 'dark',
  },
  qgis_satellite: {
    id: 'qgis_satellite',
    name: 'Esri World Imagery (High-Res Satellite)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP',
    styleType: 'satellite',
  },
};
