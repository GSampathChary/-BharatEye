from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

class AOIRequest(BaseModel):
    region_name: str
    sensor: str  # e.g. SAR, OPTICAL, MULTISPECTRAL, THERMAL
    analysis_type: str  # e.g. FLOOD, CROP_STRESS, FIRE, INFRASTRUCTURE, VESSEL
    coordinates: List[List[List[float]]]

router = APIRouter(prefix="/api/v1/aoi", tags=["aoi"])

@router.post("/analyze")
def analyze_aoi(payload: AOIRequest):
    """Run simulated GeoAI inference over an Area of Interest."""
    return {
        "status": "COMPLETED",
        "region_name": payload.region_name,
        "sensor": payload.sensor,
        "analysis_type": payload.analysis_type,
        "confidence": 94,
        "affected_area_km2": 128,
        "detected_polygons_count": 17,
        "processing_time_sec": 18.4,
        "risk_factors": [
            {"factor": "Water expansion rate", "level": "High"},
            {"factor": "Historical flood plain", "level": "Medium"},
            {"factor": "Population exposure", "level": "High"}
        ],
        "disclaimer": "DEMO / SIMULATED INFERENCE"
    }
