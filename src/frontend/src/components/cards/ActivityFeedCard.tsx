import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  MessageSquare,
  MoreVertical,
  PawPrint,
  Satellite,
  ScanLine,
} from "lucide-react";

const ACTIVITIES = [
  {
    id: "act-1",
    icon: <AlertTriangle size={14} className="text-destructive" />,
    bg: "bg-red-100",
    text: "Wheat rust detected in Field 3",
    time: "2 min ago",
  },
  {
    id: "act-2",
    icon: <Satellite size={14} className="text-primary" />,
    bg: "bg-green-100",
    text: "NDVI scan completed - Field 1 healthy",
    time: "15 min ago",
  },
  {
    id: "act-3",
    icon: <PawPrint size={14} className="text-orange-500" />,
    bg: "bg-orange-100",
    text: "Animal movement alert - North boundary",
    time: "1 hr ago",
  },
  {
    id: "act-4",
    icon: <MessageSquare size={14} className="text-blue-500" />,
    bg: "bg-blue-100",
    text: "Chat: Soil query answered",
    time: "2 hrs ago",
  },
  {
    id: "act-5",
    icon: <ScanLine size={14} className="text-primary" />,
    bg: "bg-green-100",
    text: "Crop scan completed - Field 2",
    time: "3 hrs ago",
  },
];

export default function ActivityFeedCard() {
  return (
    <Card className="shadow-card border-border" data-ocid="activity.card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="activity.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View All</DropdownMenuItem>
            <DropdownMenuItem>Clear Feed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-0">
        {ACTIVITIES.map((act, i) => (
          <div
            key={act.id}
            className="flex items-start gap-3 py-2.5 border-b border-border last:border-0"
            data-ocid={`activity.item.${i + 1}`}
          >
            <div
              className={`w-6 h-6 rounded-full ${act.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
            >
              {act.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-snug">{act.text}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {act.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
