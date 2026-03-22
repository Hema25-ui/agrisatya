import type { Page } from "@/App";
import ActivityFeedCard from "@/components/cards/ActivityFeedCard";
import AnimalTrackingCard from "@/components/cards/AnimalTrackingCard";
import ChatCard from "@/components/cards/ChatCard";
import CropDiseaseCard from "@/components/cards/CropDiseaseCard";
import FarmOverviewCard from "@/components/cards/FarmOverviewCard";
import NDVICard from "@/components/cards/NDVICard";

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-4" data-ocid="dashboard.page">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-xs text-muted-foreground">
          Real-time farm monitoring and analytics
        </p>
      </div>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <NDVICard onViewAnalysis={() => onNavigate("land-health")} />
        <CropDiseaseCard />
        <ChatCard />
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ActivityFeedCard />
        <AnimalTrackingCard />
        <FarmOverviewCard />
      </div>
    </div>
  );
}
