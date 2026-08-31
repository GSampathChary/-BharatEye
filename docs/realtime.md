# 📡 Real-time Streaming & WebSocket Architecture

## Overview
BharatEye implements a real-time event pipeline streaming live Earth Observation events, telemetry updates, and satellite inference notifications.

## WebSocket Endpoint (`/ws/events`)
- **Protocol**: Standard WebSockets (`ws://`)
- **Backend Service**: `app.realtime.websocket.ConnectionManager`
- **Streaming Rate**: 3-second heartbeat broadcast updates
- **Client Handling**: Batched state dispatching to avoid React UI re-render thrashing.

### Example Frame Payload
```json
{
  "event": "INTELLIGENCE_UPDATE",
  "type": "FLOOD",
  "severity": "HIGH",
  "lat": 16.32,
  "lng": 80.51,
  "confidence": 94,
  "disclaimer": "SIMULATED_WS_STREAM"
}
```
