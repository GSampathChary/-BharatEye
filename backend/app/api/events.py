from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.simulator.engine import sim_engine

router = APIRouter(prefix="/api/v1/events", tags=["events"])

@router.get("")
def get_events(
    type: Optional[str] = Query(None, description="Filter by event type"),
    severity: Optional[str] = Query(None, description="Filter by severity"),
    limit: int = Query(50, ge=1, le=500)
):
    """Retrieve simulated intelligence events around India."""
    events = sim_engine.generate_events(count=limit)
    if type and type != 'ALL':
        events = [e for e in events if e["type"] == type]
    if severity and severity != 'ALL':
        events = [e for e in events if e["severity"] == severity]
    return {"total": len(events), "events": events, "disclaimer": "SIMULATED_DATA"}

@router.get("/{event_id}")
def get_event_by_id(event_id: str):
    """Retrieve details for a specific intelligence event."""
    events = sim_engine.generate_events(count=10)
    for e in events:
        if e["id"] == event_id:
            return e
    # Return sample match if not found in random batch
    sample = events[0]
    sample["id"] = event_id
    return sample
