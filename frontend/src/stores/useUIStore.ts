import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  performanceMonitorOpen: boolean;
  globalSearchQuery: string;
  activeNotificationsCount: number;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  setRightPanelOpen: (open: boolean) => void;
  togglePerformanceMonitor: () => void;
  setGlobalSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  rightPanelOpen: true,
  performanceMonitorOpen: false,
  globalSearchQuery: '',
  activeNotificationsCount: 4,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  setRightPanelOpen: (rightPanelOpen) => set({ rightPanelOpen }),
  togglePerformanceMonitor: () =>
    set((state) => ({ performanceMonitorOpen: !state.performanceMonitorOpen })),
  setGlobalSearchQuery: (globalSearchQuery) => set({ globalSearchQuery }),
}));
