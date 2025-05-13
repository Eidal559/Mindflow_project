// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import StressTracker from "./pages/StressTracker";
import StressEducation from '@/pages/StressEducation';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Dashboard Routes */}
              <Route path="/app" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
              <Route path="/app/stress" element={<DashboardLayout><StressTracker /></DashboardLayout>} />
              
              {/* Add the stress education route here */}
              <Route path="/app/stress-education" element={<DashboardLayout><StressEducation /></DashboardLayout>} />
              
              {/* Add more app routes here */}
              <Route path="/app/breathing" element={<DashboardLayout><div className="p-6 text-center">Breathing Exercises Coming Soon</div></DashboardLayout>} />
              <Route path="/app/meditation" element={<DashboardLayout><div className="p-6 text-center">Meditation Coming Soon</div></DashboardLayout>} />
              <Route path="/app/music" element={<DashboardLayout><div className="p-6 text-center">Music Coming Soon</div></DashboardLayout>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;