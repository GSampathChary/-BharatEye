from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/analytics", tags=["analytics"])

@router.get("")
def get_analytics():
    """Retrieve platform aggregate statistics for charts."""
    return {
        "event_volume": [
            {"time": "00:00", "count": 12},
            {"time": "03:00", "count": 18},
            {"time": "06:00", "count": 42},
            {"time": "09:00", "count": 68},
            {"time": "12:00", "count": 55},
            {"time": "15:00", "count": 84},
            {"time": "18:00", "count": 91},
            {"time": "21:00", "count": 108}
        ],
        "categories": {
            "flood": 34,
            "crop_stress": 28,
            "fire": 18,
            "maritime": 12,
            "port_congestion": 8
        },
        "regional_risk": [
            {"state": "Assam", "score": 94},
            {"state": "Odisha", "score": 88},
            {"state": "Andhra Pradesh", "score": 85},
            {"state": "Telangana", "score": 78},
            {"state": "Kerala", "score": 72},
            {"state": "Maharashtra", "score": 65},
            {"state": "Gujarat", "score": 58}
        ]
    }
