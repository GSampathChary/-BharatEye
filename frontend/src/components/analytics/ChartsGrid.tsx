import React from 'react';
import ReactECharts from 'echarts-for-react';

export const ChartsGrid: React.FC = () => {
  // Chart 1: Event Volume Timeline (Line Chart)
  const timelineOption = {
    backgroundColor: 'transparent',
    title: { text: '24-Hour GeoAI Event Volume Stream', textStyle: { color: '#00F2FE', fontSize: 13, fontFamily: 'monospace' } },
    tooltip: { trigger: 'axis', backgroundColor: '#0B1726', borderColor: '#00F2FE', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    series: [
      {
        name: 'Events',
        type: 'line',
        smooth: true,
        data: [12, 18, 42, 68, 55, 84, 91, 108],
        lineStyle: { color: '#00F2FE', width: 3 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 242, 254, 0.4)' },
              { offset: 1, color: 'rgba(0, 242, 254, 0.0)' }
            ]
          }
        }
      }
    ]
  };

  // Chart 2: Event Category Distribution (Pie/Donut Chart)
  const categoryOption = {
    backgroundColor: 'transparent',
    title: { text: 'Intelligence Event Categories', textStyle: { color: '#00F2FE', fontSize: 13, fontFamily: 'monospace' } },
    tooltip: { trigger: 'item', backgroundColor: '#0B1726', borderColor: '#00F2FE', textStyle: { color: '#fff' } },
    series: [
      {
        name: 'Event Category',
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        label: { show: true, color: '#94A3B8', fontFamily: 'monospace' },
        data: [
          { value: 34, name: 'Flood & Inundation', itemStyle: { color: '#EF4444' } },
          { value: 28, name: 'Crop Stress (NDVI)', itemStyle: { color: '#F59E0B' } },
          { value: 18, name: 'Forest Fire', itemStyle: { color: '#F97316' } },
          { value: 12, name: 'Maritime Anomaly', itemStyle: { color: '#3B82F6' } },
          { value: 8, name: 'Port Congestion', itemStyle: { color: '#A855F7' } }
        ]
      }
    ]
  };

  // Chart 3: Regional Risk Distribution (Bar Chart)
  const regionalOption = {
    backgroundColor: 'transparent',
    title: { text: 'State-level Risk Index Distribution', textStyle: { color: '#00F2FE', fontSize: 13, fontFamily: 'monospace' } },
    tooltip: { trigger: 'axis', backgroundColor: '#0B1726', borderColor: '#00F2FE', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    yAxis: {
      type: 'category',
      data: ['Assam', 'Odisha', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Maharashtra', 'Gujarat'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    series: [
      {
        name: 'Risk Score',
        type: 'bar',
        data: [94, 88, 85, 78, 72, 65, 58],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#3B82F6' },
              { offset: 1, color: '#00F2FE' }
            ]
          }
        }
      }
    ]
  };

  // Chart 4: GeoAI Latency & Processing (Bar Chart)
  const latencyOption = {
    backgroundColor: 'transparent',
    title: { text: 'Onboard Model Inference Latency (ms)', textStyle: { color: '#00F2FE', fontSize: 13, fontFamily: 'monospace' } },
    tooltip: { trigger: 'axis', backgroundColor: '#0B1726', borderColor: '#00F2FE', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['PortIntel', 'FireDetect', 'FloodNet', 'CropStress', 'VesselDetect'],
      axisLine: { lineStyle: { color: '#334155' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#334155' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      axisLabel: { color: '#94A3B8', fontFamily: 'monospace' }
    },
    series: [
      {
        name: 'Latency (ms)',
        type: 'bar',
        data: [55, 64, 82, 95, 110],
        itemStyle: { color: '#10B981' }
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-0 sm:p-4">
      <div className="p-2 sm:p-4 rounded-xl bg-[#0B1726] border border-gray-800 overflow-hidden">
        <ReactECharts option={timelineOption} style={{ height: 'min(280px, 62vw)' }} />
      </div>
      <div className="p-2 sm:p-4 rounded-xl bg-[#0B1726] border border-gray-800 overflow-hidden">
        <ReactECharts option={categoryOption} style={{ height: 'min(280px, 62vw)' }} />
      </div>
      <div className="p-2 sm:p-4 rounded-xl bg-[#0B1726] border border-gray-800 overflow-hidden">
        <ReactECharts option={regionalOption} style={{ height: 'min(280px, 62vw)' }} />
      </div>
      <div className="p-2 sm:p-4 rounded-xl bg-[#0B1726] border border-gray-800 overflow-hidden">
        <ReactECharts option={latencyOption} style={{ height: 'min(280px, 62vw)' }} />
      </div>
    </div>
  );
};
