from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import events, satellites, ports, aoi, analytics
from app.realtime import websocket

app = FastAPI(
    title="🇮🇳 BharatEye GeoAI Intelligence API",
    description="India Earth Observation & GeoAI Simulation Backend Service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router)
app.include_router(satellites.router)
app.include_router(ports.router)
app.include_router(aoi.router)
app.include_router(analytics.router)
app.include_router(websocket.router)

@app.get("/")
def root():
    return {
        "status": "ONLINE",
        "service": "BharatEye GeoAI Intelligence Platform",
        "docs": "/docs",
        "disclaimer": "Simulated Earth Observation & Edge AI backend service"
    }
