import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  Bell,
  BellOff,
  MoreVertical,
  PawPrint,
} from "lucide-react";
import { useState } from "react";

const ANIMALS = [
  { id: "Cattle 01", x: 30, y: 35, color: "#2E7D32" },
  { id: "Cattle 02", x: 55, y: 55, color: "#2E7D32" },
  { id: "Cattle 04", x: 78, y: 15, color: "#ef4444", alert: true },
  { id: "Sheep 01", x: 20, y: 65, color: "#f59e0b" },
  { id: "Goat 01", x: 65, y: 75, color: "#8b5cf6" },
];

export default function AnimalTrackingCard() {
  const [alertsOn, setAlertsOn] = useState(true);

  return (
    <Card className="shadow-card border-border" data-ocid="tracking.card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-orange-100 flex items-center justify-center">
            <PawPrint size={15} className="text-orange-500" />
          </div>
          <CardTitle className="text-sm font-semibold">
            IoT Animal Tracking
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="tracking.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Full View</DropdownMenuItem>
            <DropdownMenuItem>Download Log</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Alert Banner */}
        {alertsOn && (
          <div
            className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5"
            data-ocid="tracking.error_state"
          >
            <AlertTriangle
              size={12}
              className="text-destructive flex-shrink-0"
            />
            <p className="text-xs text-destructive font-medium">
              Field 2 Boundary Alert! — Cattle 04
            </p>
          </div>
        )}

        {/* Stylized Map */}
        <div
          className="relative bg-green-50 border-2 border-primary rounded-lg overflow-hidden"
          style={{ height: "130px" }}
        >
          <div className="absolute top-1.5 left-2 text-[9px] text-primary/60 font-semibold uppercase tracking-widest">
            Bihar Farm 1
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(46,125,50,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,0.08) 1px,transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="absolute border border-primary/20 rounded bg-primary/5"
            style={{ left: "10%", top: "20%", width: "35%", height: "55%" }}
          >
            <span className="text-[8px] text-primary/50 absolute top-0.5 left-1">
              F1
            </span>
          </div>
          <div
            className="absolute border border-primary/20 rounded bg-primary/5"
            style={{ left: "50%", top: "10%", width: "38%", height: "55%" }}
          >
            <span className="text-[8px] text-primary/50 absolute top-0.5 left-1">
              F2
            </span>
          </div>
          {ANIMALS.map((a) => (
            <div
              key={a.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 border-white ${a.alert ? "pulse-dot" : ""}`}
                style={{ backgroundColor: a.color }}
                title={a.id}
              />
              <span
                className="text-[7px] font-semibold mt-0.5 whitespace-nowrap"
                style={{ color: a.color }}
              >
                {a.id}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { color: "#2E7D32", label: "Cattle" },
            { color: "#f59e0b", label: "Sheep" },
            { color: "#8b5cf6", label: "Goat" },
            { color: "#ef4444", label: "Alert" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-[10px] text-muted-foreground">
                {l.label}
              </span>
            </div>
          ))}
        </div>

        <Button
          size="sm"
          variant={alertsOn ? "default" : "outline"}
          className={`w-full text-xs h-7 ${alertsOn ? "bg-primary hover:bg-primary/90" : ""}`}
          onClick={() => setAlertsOn((v) => !v)}
          data-ocid="tracking.alerts.toggle"
        >
          {alertsOn ? (
            <>
              <BellOff size={12} className="mr-1" /> Disable Alerts
            </>
          ) : (
            <>
              <Bell size={12} className="mr-1" /> Enable Alerts
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
