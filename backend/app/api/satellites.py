from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/satellites", tags=["satellites"])

@router.get("")
def get_satellites():
    """Retrieve simulated Earth Observation satellite constellation telemetry."""
    satellites = [
        {"id": "SAT-01", "name": "EOS-04 (RISAT-1A)", "code": "SAT-01", "status": "ONLINE", "sensor": "SAR Radar", "currentAOI": "Krishna Delta, AP", "model": "FloodNet-Demo", "inferenceMs": 82, "cpuPct": 68, "memoryPct": 54, "downlinkKbps": 237, "latitude": 18.5, "longitude": 78.5},
        {"id": "SAT-02", "name": "Cartosat-3", "code": "SAT-02", "status": "ONLINE", "sensor": "Pan-Multispectral", "currentAOI": "Mayurbhanj, Odisha", "model": "FireDetect-Demo", "inferenceMs": 64, "cpuPct": 74, "memoryPct": 61, "downlinkKbps": 412, "latitude": 22.1, "longitude": 82.3},
        {"id": "SAT-03", "name": "Resourcesat-2A", "code": "SAT-03", "status": "PROCESSING", "sensor": "Multispectral AWiFS", "currentAOI": "Nalgonda, TS", "model": "CropStress-Demo", "inferenceMs": 95, "cpuPct": 88, "memoryPct": 79, "downlinkKbps": 185, "latitude": 16.3, "longitude": 80.5},
        {"id": "SAT-04", "name": "Oceansat-3", "code": "SAT-04", "status": "OFFLINE", "sensor": "Thermal OCM", "currentAOI": "Arabian Sea", "model": "VesselDetect-Demo", "inferenceMs": 0, "cpuPct": 0, "memoryPct": 12, "downlinkKbps": 0, "latitude": 12.4, "longitude": 74.2},
        {"id": "SAT-05", "name": "INSAT-3DR", "code": "SAT-05", "status": "ONLINE", "sensor": "Imager & Sounder", "currentAOI": "JNPA Port, MH", "model": "PortIntel-Demo", "inferenceMs": 55, "cpuPct": 45, "memoryPct": 52, "downlinkKbps": 310, "latitude": 24.8, "longitude": 73.1}
    ]
    return {"total": len(satellites), "satellites": satellites, "disclaimer": "SIMULATED_TELEMETRY"}
