import asyncio
import json
import random
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["websocket"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                pass

manager = ConnectionManager()

@router.websocket("/ws/events")
async def websocket_events_endpoint(websocket: WebSocket):
    """WebSocket endpoint streaming real-time event updates to client."""
    await manager.connect(websocket)
    try:
        while True:
            # Simulate high-frequency event stream every 3 seconds
            await asyncio.sleep(3)
            sample_event = {
                "event": "INTELLIGENCE_UPDATE",
                "type": random.choice(["FLOOD", "FIRE", "CROP_STRESS", "MARITIME"]),
                "severity": random.choice(["MEDIUM", "HIGH", "CRITICAL"]),
                "lat": round(16.32 + random.uniform(-0.5, 0.5), 4),
                "lng": round(80.51 + random.uniform(-0.5, 0.5), 4),
                "confidence": random.randint(88, 98),
                "disclaimer": "SIMULATED_WS_STREAM"
            }
            await websocket.send_text(json.dumps(sample_event))
    except WebSocketDisconnect:
        manager.disconnect(websocket)
