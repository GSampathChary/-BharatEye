from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/ports", tags=["ports"])

@router.get("")
def get_ports():
    """Retrieve Indian major ports congestion & traffic telemetry."""
    ports = [
        {"name": "Deendayal (Kandla)", "code": "IXK", "lat": 23.0033, "lng": 70.2167, "state": "Gujarat", "vessels": 142, "congestion": 68},
        {"name": "Mumbai Port", "code": "BOM", "lat": 18.9438, "lng": 72.8358, "state": "Maharashtra", "vessels": 210, "congestion": 74},
        {"name": "Jawaharlal Nehru Port (JNPA)", "code": "JNP", "lat": 18.9500, "lng": 72.9500, "state": "Maharashtra", "vessels": 412, "congestion": 89},
        {"name": "Chennai Port", "code": "MAA", "lat": 13.0833, "lng": 80.3000, "state": "Tamil Nadu", "vessels": 320, "congestion": 82},
        {"name": "Visakhapatnam Port", "code": "VTZ", "lat": 17.6833, "lng": 83.2833, "state": "Andhra Pradesh", "vessels": 290, "congestion": 76},
        {"name": "Paradip Port", "code": "PRD", "lat": 20.2667, "lng": 86.6667, "state": "Odisha", "vessels": 245, "congestion": 81}
    ]
    return {"total": len(ports), "ports": ports}
