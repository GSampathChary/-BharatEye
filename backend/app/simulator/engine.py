import random
import time
from typing import List, Dict, Any

class GeoSimulationEngine:
    def __init__(self):
        self.total_entities = 10842
        self.geojson_features_count = 100000

    def generate_events(self, count: int = 50) -> List[Dict[str, Any]]:
        types = ['FLOOD', 'FIRE', 'CROP_STRESS', 'MARITIME', 'PORT_CONGESTION', 'INFRASTRUCTURE_CHANGE']
        severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
        locations = [
            ("Krishna Delta", 16.32, 80.51, "Andhra Pradesh"),
            ("Brahmaputra Basin", 26.58, 93.17, "Assam"),
            ("Simlipal Forest", 21.88, 86.35, "Odisha"),
            ("Nalgonda Agriculture Zone", 17.05, 79.26, "Telangana"),
            ("Mumbai Offshore", 18.72, 71.85, "Maharashtra"),
            ("JNPA Anchorage", 18.95, 72.95, "Maharashtra"),
            ("Kuttanad Waterway", 9.49, 76.33, "Kerala"),
            ("Gulf of Khambhat", 21.75, 72.25, "Gujarat"),
            ("Pamba River Zone", 9.35, 76.55, "Kerala"),
            ("Cauvery Delta", 10.78, 79.83, "Tamil Nadu")
        ]

        events = []
        for i in range(1, count + 1):
            loc_name, lat, lng, state = random.choice(locations)
            # Add slight jitter
            jitter_lat = lat + random.uniform(-0.15, 0.15)
            jitter_lng = lng + random.uniform(-0.15, 0.15)
            evt_type = random.choice(types)
            severity = random.choice(severities)

            events.append({
                "id": f"EVT-SIM-{i:04d}",
                "type": evt_type,
                "severity": severity,
                "title": f"Simulated {evt_type.replace('_', ' ').title()} Event",
                "location": f"{loc_name}, {state}",
                "state": state,
                "latitude": round(jitter_lat, 4),
                "longitude": round(jitter_lng, 4),
                "confidence": random.randint(82, 98),
                "area_km2": random.randint(15, 450),
                "source": "SIMULATED_EO",
                "model": "GeoAI-Sim-v2",
                "inference_ms": random.randint(45, 120),
                "timestamp": f"{random.randint(1, 50)} minutes ago",
                "riskFactors": [
                    {"factor": "Spatial Exposure", "level": random.choice(["Medium", "High", "Critical"])},
                    {"factor": "Model Uncertainty", "level": random.choice(["Low", "Medium"])}
                ]
            })
        return events

sim_engine = GeoSimulationEngine()
