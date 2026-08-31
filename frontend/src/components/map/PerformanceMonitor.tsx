import React, { useEffect, useState } from 'react';
import { Cpu, Activity, Zap, Layers, Sparkles, X } from 'lucide-react';
import { useMapStore } from '../../stores/useMapStore';
import { useUIStore } from '../../stores/useUIStore';

export const PerformanceMonitor: React.FC = () => {
  const { performanceMetrics, updatePerformanceMetrics } = useMapStore();
  const { togglePerformanceMonitor } = useUIStore();
  const [realFps, setRealFps] = useState(60);

  // Measure actual browser FPS using requestAnimationFrame
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setRealFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute top-16 left-4 z-30 w-72 bg-[#0B1726]/95 border border-cyan-500/40 rounded-lg shadow-glow-cyan p-3 select-none backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span>PERFORMANCE MONITOR</span>
        </div>
        <button
          onClick={togglePerformanceMonitor}
          className="text-gray-400 hover:text-white p-0.5 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Metrics List */}
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between items-center bg-[#101F31] p-2 rounded border border-gray-800">
          <span className="text-gray-400">Total Entities:</span>
          <strong className="text-white font-bold">{performanceMetrics.totalEntities.toLocaleString()}</strong>
        </div>

        <div className="flex justify-between items-center bg-[#101F31] p-2 rounded border border-gray-800">
          <span className="text-gray-400">Visible Entities:</span>
          <strong className="text-cyan-400 font-bold">{performanceMetrics.visibleEntities.toLocaleString()}</strong>
        </div>

        <div className="flex justify-between items-center bg-[#101F31] p-2 rounded border border-gray-800">
          <span className="text-gray-400">Browser Render FPS:</span>
          <strong className={`font-bold ${realFps >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {realFps} FPS
          </strong>
        </div>

        <div className="flex justify-between items-center bg-[#101F31] p-2 rounded border border-gray-800">
          <span className="text-gray-400">WS Messages/sec:</span>
          <strong className="text-purple-400 font-bold">{performanceMetrics.updatesPerSec.toLocaleString()} msg/s</strong>
        </div>

        <div className="flex justify-between items-center bg-[#101F31] p-2 rounded border border-gray-800">
          <span className="text-gray-400">Deck.gl Render Time:</span>
          <strong className="text-emerald-400 font-bold">{performanceMetrics.lastRenderTimeMs} ms</strong>
        </div>
      </div>

      {/* Explicit Simulation Label required by Prompt section 10 */}
      <div className="mt-3 p-2 rounded bg-cyan-950/40 border border-cyan-800/60 text-[10px] text-cyan-300 font-mono flex items-center space-x-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>SIMULATED BENCHMARK DATASET</span>
      </div>
    </div>
  );
};
