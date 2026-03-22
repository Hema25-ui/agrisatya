import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  AlertTriangle,
  Maximize2,
  MoreVertical,
  PawPrint,
  RefreshCw,
  ScanLine,
} from "lucide-react";

const STATS = [
  {
    id: "area",
    icon: <Maximize2 size={14} className="text-primary" />,
    label: "Farm Area",
    value: "45 acres",
  },
  {
    id: "scans",
    icon: <ScanLine size={14} className="text-blue-500" />,
    label: "Total Scans",
    value: "128",
  },
  {
    id: "animals",
    icon: <PawPrint size={14} className="text-orange-500" />,
    label: "Animals Tracked",
    value: "24",
  },
  {
    id: "alerts",
    icon: <AlertTriangle size={14} className="text-destructive" />,
    label: "Active Alerts",
    value: "3",
    badge: true,
  },
  {
    id: "ndvi",
    icon: <Activity size={14} className="text-primary" />,
    label: "NDVI Health",
    value: "Good",
    green: true,
  },
  {
    id: "updated",
    icon: <RefreshCw size={14} className="text-muted-foreground" />,
    label: "Last Updated",
    value: "Today",
  },
];

export default function FarmOverviewCard() {
  return (
    <Card className="shadow-card border-border" data-ocid="overview.card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">Farm Overview</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="overview.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Report</DropdownMenuItem>
            <DropdownMenuItem>Refresh</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.id}
            className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
            data-ocid={`overview.item.${i + 1}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
            {stat.badge ? (
              <Badge className="bg-red-100 text-red-700 border-0 text-xs px-2">
                {stat.value}
              </Badge>
            ) : stat.green ? (
              <span className="text-xs font-semibold text-success">
                {stat.value}
              </span>
            ) : (
              <span className="text-xs font-semibold text-foreground">
                {stat.value}
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
