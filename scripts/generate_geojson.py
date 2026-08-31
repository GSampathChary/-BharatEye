import os
import json
import math
import random

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

# 1. Major Indian States Boundaries (simplified polygon centroids & boundaries)
INDIAN_STATES = [
    {"name": "Telangana", "code": "TS", "lat": 17.8496, "lng": 79.1151, "type": "State"},
    {"name": "Andhra Pradesh", "code": "AP", "lat": 15.9129, "lng": 79.7400, "type": "State"},
    {"name": "Odisha", "code": "OD", "lat": 20.9517, "lng": 85.0985, "type": "State"},
    {"name": "Kerala", "code": "KL", "lat": 10.8505, "lng": 76.2711, "type": "State"},
    {"name": "Maharashtra", "code": "MH", "lat": 19.7515, "lng": 75.7139, "type": "State"},
    {"name": "Gujarat", "code": "GJ", "lat": 22.2587, "lng": 71.1924, "type": "State"},
    {"name": "Tamil Nadu", "code": "TN", "lat": 11.1271, "lng": 78.6569, "type": "State"},
    {"name": "Karnataka", "code": "KA", "lat": 15.3173, "lng": 75.7139, "type": "State"},
    {"name": "Punjab", "code": "PB", "lat": 31.1471, "lng": 75.3412, "type": "State"},
    {"name": "Assam", "code": "AS", "lat": 26.2006, "lng": 92.9376, "type": "State"},
    {"name": "West Bengal", "code": "WB", "lat": 22.9868, "lng": 87.8550, "type": "State"},
    {"name": "Uttar Pradesh", "code": "UP", "lat": 26.8467, "lng": 80.9462, "type": "State"},
    {"name": "Rajasthan", "code": "RJ", "lat": 27.0238, "lng": 74.2179, "type": "State"},
    {"name": "Madhya Pradesh", "code": "MP", "lat": 22.9734, "lng": 78.6569, "type": "State"},
    {"name": "Uttarakhand", "code": "UK", "lat": 30.0668, "lng": 79.0193, "type": "State"}
]

# Create State Polygons GeoJSON
def generate_states_geojson():
    features = []
    for state in INDIAN_STATES:
        lat, lng = state["lat"], state["lng"]
        # Generate approximate polygon boundary around centroid
        r = 1.2
        coords = [
            [lng - r, lat - r],
            [lng + r, lat - r],
            [lng + r + 0.3, lat + r],
            [lng - r + 0.2, lat + r + 0.4],
            [lng - r, lat - r]
        ]
        features.append({
            "type": "Feature",
            "properties": {
                "id": f"ST-{state['code']}",
                "name": state["name"],
                "code": state["code"],
                "risk_score": random.randint(35, 95),
                "active_events": random.randint(2, 28)
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [coords]
            }
        })
    return {"type": "FeatureCollection", "features": features}

# 2. Major Ports GeoJSON
MAJOR_PORTS = [
    {"name": "Deendayal (Kandla)", "code": "IXK", "lat": 23.0033, "lng": 70.2167, "state": "Gujarat", "vessels": 142, "congestion": 68},
    {"name": "Mumbai Port", "code": "BOM", "lat": 18.9438, "lng": 72.8358, "state": "Maharashtra", "vessels": 210, "congestion": 74},
    {"name": "Jawaharlal Nehru Port (JNPA)", "code": "JNP", "lat": 18.9500, "lng": 72.9500, "state": "Maharashtra", "vessels": 412, "congestion": 89},
    {"name": "Mormugao Port", "code": "MRG", "lat": 15.4167, "lng": 73.8000, "state": "Goa", "vessels": 85, "congestion": 45},
    {"name": "New Mangalore Port", "code": "NML", "lat": 12.9333, "lng": 74.8000, "state": "Karnataka", "vessels": 118, "congestion": 52},
    {"name": "Cochin Port", "code": "COK", "lat": 9.9667, "lng": 76.2667, "state": "Kerala", "vessels": 175, "congestion": 61},
    {"name": "V.O. Chidambaranar (Tuticorin)", "code": "TUT", "lat": 8.7500, "lng": 78.1833, "state": "Tamil Nadu", "vessels": 130, "congestion": 58},
    {"name": "Chennai Port", "code": "MAA", "lat": 13.0833, "lng": 80.3000, "state": "Tamil Nadu", "vessels": 320, "congestion": 82},
    {"name": "Kamarajar (Ennore)", "code": "ENR", "lat": 13.2667, "lng": 80.3333, "state": "Tamil Nadu", "vessels": 98, "congestion": 49},
    {"name": "Visakhapatnam Port", "code": "VTZ", "lat": 17.6833, "lng": 83.2833, "state": "Andhra Pradesh", "vessels": 290, "congestion": 76},
    {"name": "Paradip Port", "code": "PRD", "lat": 20.2667, "lng": 86.6667, "state": "Odisha", "vessels": 245, "congestion": 81},
    {"name": "Syama Prasad Mookerjee (Kolkata)", "code": "CCU", "lat": 22.5500, "lng": 88.3167, "state": "West Bengal", "vessels": 189, "congestion": 70}
]

def generate_ports_geojson():
    features = []
    for port in MAJOR_PORTS:
        features.append({
            "type": "Feature",
            "properties": port,
            "geometry": {
                "type": "Point",
                "coordinates": [port["lng"], port["lat"]]
            }
        })
    return {"type": "FeatureCollection", "features": features}

# 3. Simulated Events & Geometries (Floods, Fires, Crop Stress, Infra, Vessels)
def generate_disasters_geojson():
    floods = [
        {"id": "EVT-FL01", "name": "Krishna Delta Inundation", "location": "Krishna Delta, AP", "severity": "HIGH", "confidence": 94, "area_km2": 128, "lat": 16.32, "lng": 80.51},
        {"id": "EVT-FL02", "name": "Brahmaputra Overflow Zone", "location": "Kaziranga, Assam", "severity": "CRITICAL", "confidence": 97, "area_km2": 310, "lat": 26.58, "lng": 93.17},
        {"id": "EVT-FL03", "name": "Mahanadi Basin Flood", "location": "Cuttack, Odisha", "severity": "HIGH", "confidence": 91, "area_km2": 184, "lat": 20.46, "lng": 85.88},
        {"id": "EVT-FL04", "name": "Kuttanad Waterway Surge", "location": "Alappuzha, Kerala", "severity": "MEDIUM", "confidence": 88, "area_km2": 64, "lat": 9.49, "lng": 76.33}
    ]
    features = []
    for fl in floods:
        lat, lng = fl["lat"], fl["lng"]
        r = 0.2
        coords = [
            [lng - r, lat - r * 0.8],
            [lng + r * 1.2, lat - r],
            [lng + r, lat + r * 1.1],
            [lng - r * 0.8, lat + r * 0.9],
            [lng - r, lat - r * 0.8]
        ]
        features.append({
            "type": "Feature",
            "properties": {**fl, "type": "FLOOD", "source": "SIMULATED_EO", "model": "FloodNet-Demo", "inference_ms": 82},
            "geometry": {"type": "Polygon", "coordinates": [coords]}
        })
    return {"type": "FeatureCollection", "features": features}

# 4. Satellite Footprints GeoJSON
def generate_satellites_geojson():
    sats = [
        {"id": "SAT-01", "name": "EOS-04 (RISAT-1A)", "status": "ONLINE", "sensor": "SAR Radar", "lat": 18.5, "lng": 78.5, "model": "FloodNet-Demo", "cpu": 62, "memory": 48},
        {"id": "SAT-02", "name": "Cartosat-3", "status": "ONLINE", "sensor": "Pan-Multispectral", "lat": 22.1, "lng": 82.3, "model": "ChangeDetect-Demo", "cpu": 74, "memory": 61},
        {"id": "SAT-03", "name": "Resourcesat-2A", "status": "PROCESSING", "sensor": "Multispectral AWiFS", "lat": 16.3, "lng": 80.5, "model": "CropStress-Demo", "cpu": 88, "memory": 79},
        {"id": "SAT-04", "name": "Oceansat-3", "status": "OFFLINE", "sensor": "Thermal OCM", "lat": 12.4, "lng": 74.2, "model": "VesselDetect-Demo", "cpu": 0, "memory": 12},
        {"id": "SAT-05", "name": "INSAT-3DR", "status": "ONLINE", "sensor": "Imager & Sounder", "lat": 24.8, "lng": 73.1, "model": "FireDetect-Demo", "cpu": 45, "memory": 52}
    ]
    features = []
    for sat in sats:
        lat, lng = sat["lat"], sat["lng"]
        w, h = 3.0, 2.0
        coords = [
            [lng - w, lat - h],
            [lng + w, lat - h],
            [lng + w * 0.8, lat + h],
            [lng - w * 0.8, lat + h],
            [lng - w, lat - h]
        ]
        features.append({
            "type": "Feature",
            "properties": {**sat, "source": "SIMULATED_TELEMETRY"},
            "geometry": {"type": "Polygon", "coordinates": [coords]}
        })
    return {"type": "FeatureCollection", "features": features}

def main():
    ensure_dir("data/india")
    ensure_dir("data/ports")
    ensure_dir("data/disasters")
    ensure_dir("data/agriculture")
    ensure_dir("data/fire")
    ensure_dir("data/maritime")
    ensure_dir("data/satellites")

    with open("data/india/states.geojson", "w") as f:
        json.dump(generate_states_geojson(), f, indent=2)

    with open("data/ports/major_ports.geojson", "w") as f:
        json.dump(generate_ports_geojson(), f, indent=2)

    with open("data/disasters/floods.geojson", "w") as f:
        json.dump(generate_disasters_geojson(), f, indent=2)

    with open("data/satellites/footprints.geojson", "w") as f:
        json.dump(generate_satellites_geojson(), f, indent=2)

    print("GeoJSON datasets generated successfully!")

if __name__ == "__main__":
    main()
