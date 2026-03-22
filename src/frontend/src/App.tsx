import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import AnimalTracking from "@/pages/AnimalTracking";
import ChatAssistant from "@/pages/ChatAssistant";
import CropScanner from "@/pages/CropScanner";
import Dashboard from "@/pages/Dashboard";
import LandHealth from "@/pages/LandHealth";
import { useState } from "react";

export type Page =
  | "dashboard"
  | "land-health"
  | "crop-scanner"
  | "chat"
  | "animal-tracking"
  | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "land-health":
        return <LandHealth />;
      case "crop-scanner":
        return <CropScanner />;
      case "chat":
        return <ChatAssistant />;
      case "animal-tracking":
        return <AnimalTracking />;
      case "settings":
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Settings
              </h2>
              <p className="text-muted-foreground">
                Configuration options coming soon.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <Toaster />
    </>
  );
}
