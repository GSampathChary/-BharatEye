import React, { useState, useEffect } from 'react';
import { Search, Globe, Cpu, Users, Bell, AlertTriangle, Smartphone, Eye, Radio } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { useUIStore } from '../../stores/useUIStore';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useEventStore();
  const { togglePerformanceMonitor, performanceMonitorOpen } = useUIStore();
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setIstTime(now.toLocaleTimeString('en-IN', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col z-30 select-none shadow-md font-sans">
      {/* Top Banner (Sachet National Disaster Alert Dashboard Header - Deep Navy #0B2545 + Gold) */}
      <div className="min-h-14 bg-gradient-to-r from-[#0B2545] via-[#0D2E58] to-[#0A192F] px-3 py-2 md:px-4 md:py-0 flex items-center justify-between gap-2 border-b border-blue-950 text-white">
        {/* Brand Logo & Title */}
        <div className="flex min-w-0 items-center space-x-2 md:space-x-3">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="BharatEye Logo"
              className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-lg border-2 border-amber-400 p-0.5 bg-[#06111F]"
            />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5 md:space-x-2">
              <span className="text-lg md:text-xl font-hindi font-bold text-amber-400 tracking-wide">सचेत</span>
              <h1 className="text-xs md:text-base font-extrabold text-white tracking-wide truncate">
                National Disaster Alert Dashboard
              </h1>
              <span className="hidden sm:inline text-[10px] font-mono font-bold bg-amber-400 text-black px-2 py-0.5 rounded uppercase">
                BHARATEYE
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-gray-200 truncate">
              Government of India • Disaster Management Support System • ISRO & EO Stream
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search State / Area / Disaster Event..."
              className="w-full bg-[#061B36] border border-blue-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-300 focus:outline-none focus:border-amber-400 transition-all font-sans"
            />
          </div>
        </div>

        {/* IST Clock & Diagnostics */}
        <div className="flex shrink-0 items-center space-x-1.5 md:space-x-3 text-xs font-mono">
          <div className="hidden lg:flex px-3 py-1 rounded bg-[#061B36] border border-blue-700 text-amber-300 items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span>{istTime}</span>
          </div>

          <button
            onClick={togglePerformanceMonitor}
            aria-label="Toggle diagnostics"
            className={`p-2 md:px-3 md:py-1 rounded border text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              performanceMonitorOpen
                ? 'bg-amber-400 text-black border-amber-500 font-bold'
                : 'bg-[#061B36] text-white border-blue-700 hover:bg-blue-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden md:inline">DIAGNOSTICS</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards Bar (Matching Image 801 Sachet Dashboard Top Cards 100%) */}
      <div className="bg-[#EFF4F9] p-2 border-b border-slate-300 grid grid-cols-2 lg:grid-cols-4 gap-2 text-slate-800">
        {/* Card 1: Orientation Session */}
        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-rose-500" /> Orientation Session
            </span>
            <strong className="text-base font-extrabold text-slate-900">32</strong>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono">
            <span>Hands-on: <strong className="text-slate-800">50</strong></span>
            <span>Mockdrill: <strong className="text-slate-800">36</strong></span>
          </div>
        </div>

        {/* Card 2: CAP User Count */}
        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-cyan-600" /> CAP User Count
            </span>
            <strong className="text-base font-extrabold text-[#0052CC]">614</strong>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono">
            <span>App Downloads: <strong className="text-slate-800">5.13L</strong></span>
            <span>Portal Visitor: <strong className="text-slate-800">40.33K</strong></span>
          </div>
        </div>

        {/* Card 3: Total Warning Generated */}
        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Total Warning Generated
            </span>
            <strong className="text-base font-extrabold text-amber-600">70 Active</strong>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono">
            <span>Total SMS: <strong className="text-slate-800">1.66 Cr</strong></span>
            <span>App Notif: <strong className="text-slate-800">1.58L</strong></span>
          </div>
        </div>

        {/* Card 4: Total Warning Disseminated */}
        <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <span className="text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-emerald-600" /> Total Warning Disseminated
            </span>
            <strong className="text-base font-extrabold text-emerald-600">21</strong>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 pt-1 font-mono">
            <span>Browser Notif: <strong className="text-slate-800">193</strong></span>
            <span>Status: <strong className="text-emerald-700 font-bold">100% Active</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};
