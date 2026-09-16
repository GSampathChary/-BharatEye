import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomMetrics } from './components/layout/BottomMetrics';
import { Dashboard } from './pages/Dashboard';
import { AOIAnalysisPage } from './pages/AOIAnalysisPage';
import { SatellitesPage } from './pages/SatellitesPage';
import { IntelligenceDomainPage } from './pages/IntelligenceDomainPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="h-[100dvh] w-full flex flex-col bg-[#06111F] text-gray-100 overflow-hidden font-sans select-none">
          {/* Header */}
          <Header />

          {/* Main Workspace Body */}
          <div className="flex-1 min-h-0 flex overflow-hidden relative pb-16 md:pb-0">
            <Sidebar />
            <main className="flex-1 min-h-0 flex flex-col overflow-hidden relative bg-[#06111F]">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/intelligence/:domain" element={<IntelligenceDomainPage />} />
                <Route path="/aoi" element={<AOIAnalysisPage />} />
                <Route path="/satellites" element={<SatellitesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>

          {/* Bottom Metrics Bar */}
          <BottomMetrics />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
