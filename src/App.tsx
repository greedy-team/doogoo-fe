import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}