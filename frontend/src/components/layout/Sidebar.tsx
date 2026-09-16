import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Globe, 
  Target, 
  Satellite, 
  BarChart3, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Shield,
  Droplets,
  Flame,
  Wheat,
  Building2,
  Anchor
} from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: Globe },
    { path: '/intelligence/flood', label: 'Flood Intelligence', icon: Droplets },
    { path: '/intelligence/agriculture', label: 'Crop Stress', icon: Wheat },
    { path: '/intelligence/fire', label: 'Forest Fire', icon: Flame },
    { path: '/intelligence/infrastructure', label: 'Infrastructure', icon: Building2 },
    { path: '/intelligence/maritime', label: 'Maritime Observation', icon: Anchor },
    { path: '/aoi', label: 'AOI Analysis', icon: Target },
    { path: '/satellites', label: 'Satellites & Edge AI', icon: Satellite },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/alerts', label: 'Alerts Hub', icon: Bell },
  ];

  return (
    <>
    <aside
      className={`hidden md:flex bg-[#0A192F] border-r border-blue-950 transition-all duration-300 z-20 flex-col justify-between select-none shadow-xl ${
        sidebarOpen ? 'w-60' : 'w-16'
      }`}
    >
      <div className="py-3">
        {/* Toggle Button */}
        <div className="px-3 pb-2 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded bg-[#102A4C] text-gray-300 hover:text-white border border-blue-800/60"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-sans transition-all ${
                    isActive
                      ? 'bg-[#0052CC] text-white font-bold shadow-md border border-blue-400/40'
                      : 'text-gray-300 hover:bg-[#102A4C] hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      {sidebarOpen && (
        <div className="p-3 m-2 rounded-lg bg-[#0F294A] border border-blue-800 text-[11px] text-gray-300 shadow-inner">
          <div className="flex items-center space-x-2 text-amber-400 font-mono mb-1 font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>NATIONAL DISASTER AI</span>
          </div>
          <p className="text-[10px] text-gray-300 font-sans">
            Sachet & ISRO EO Stream Active.
          </p>
        </div>
      )}
    </aside>
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 flex h-16 items-center gap-1 overflow-x-auto border-t border-blue-900 bg-[#0A192F]/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,.25)] backdrop-blur-md">
      {navItems.map((item) => {
        const Icon = item.icon;
        return <NavLink key={item.path} to={item.path} aria-label={item.label} className={({ isActive }) => `flex h-11 min-w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-[9px] font-medium ${isActive ? 'bg-[#0052CC] text-white' : 'text-gray-300'}`}><Icon className="h-4 w-4" /><span className="max-w-16 truncate">{item.label.replace(' Intelligence', '')}</span></NavLink>;
      })}
    </nav>
    </>
  );
};
