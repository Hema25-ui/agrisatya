import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Battery,
  Bell,
  BellOff,
  Clock,
  PawPrint,
  Wifi,
} from "lucide-react";
import { useState } from "react";

const ANIMALS = [
  {
    id: "Cattle 01",
    tag: "TAG-C01",
    type: "Cattle",
    x: 28,
    y: 38,
    battery: 87,
    signal: "Strong",
    zone: "Field 1",
    alert: false,
  },
  {
    id: "Cattle 02",
    tag: "TAG-C02",
    type: "Cattle",
    x: 52,
    y: 52,
    battery: 72,
    signal: "Strong",
    zone: "Field 2",
    alert: false,
  },
  {
    id: "Cattle 04",
    tag: "TAG-C04",
    type: "Cattle",
    x: 80,
    y: 12,
    battery: 45,
    signal: "Weak",
    zone: "Boundary!",
    alert: true,
  },
  {
    id: "Sheep 01",
    tag: "TAG-S01",
    type: "Sheep",
    x: 18,
    y: 68,
    battery: 95,
    signal: "Strong",
    zone: "Field 1",
    alert: false,
  },
  {
    id: "Goat 01",
    tag: "TAG-G01",
    type: "Goat",
    x: 65,
    y: 75,
    battery: 63,
    signal: "Medium",
    zone: "Field 2",
    alert: false,
  },
];

const COLOR_MAP: Record<string, string> = {
  Cattle: "#2E7D32",
  Sheep: "#f59e0b",
  Goat: "#8b5cf6",
};

const ALERTS = [
  {
    id: "a1",
    time: "10:15 AM",
    msg: "Cattle 04 crossed North boundary — Field 2",
    severity: "high",
  },
  {
    id: "a2",
    time: "09:50 AM",
    msg: "Cattle 04 approaching boundary zone — Field 2",
    severity: "medium",
  },
  {
    id: "a3",
    time: "Yesterday",
    msg: "Sheep 01 near water trough — no anomaly",
    severity: "low",
  },
];

export default function AnimalTracking() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [selected, setSelected] = useState<string | null>("Cattle 04");

  const selectedAnimal = ANIMALS.find((a) => a.id === selected);

  return (
    <div className="space-y-4" data-ocid="tracking.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            IoT Animal Tracking
          </h2>
          <p className="text-xs text-muted-foreground">
            Real-time GPS monitoring via IoT collar sensors
          </p>
        </div>
        <Button
          size="sm"
          variant={alertsEnabled ? "default" : "outline"}
          className={`text-xs gap-1.5 h-8 ${alertsEnabled ? "bg-primary hover:bg-primary/90" : ""}`}
          onClick={() => setAlertsEnabled((v) => !v)}
          data-ocid="tracking.alerts.toggle"
        >
          {alertsEnabled ? (
            <>
              <BellOff size={13} /> Disable Alerts
            </>
          ) : (
            <>
              <Bell size={13} /> Enable Alerts
            </>
          )}
        </Button>
      </div>

      {/* Alerts */}
      {alertsEnabled && (
        <div className="space-y-2" data-ocid="tracking.error_state">
          {ALERTS.filter((a) => a.severity === "high").map((alert) => (
            <div
              key={alert.id}
              className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              <AlertTriangle
                size={14}
                className="text-destructive flex-shrink-0"
              />
              <p className="text-xs text-destructive font-medium">
                {alert.msg}
              </p>
              <span className="text-[10px] text-destructive/70 ml-auto">
                {alert.time}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <Card className="lg:col-span-2 shadow-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Farm Map — Live Positions
              </CardTitle>
              <Badge className="text-[10px] bg-success/10 text-success border-success/20">
                ● Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="relative bg-green-50 border-2 border-primary rounded-xl overflow-hidden cursor-pointer"
              style={{ height: "320px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(46,125,50,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(46,125,50,0.07) 1px,transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute top-2 left-3 text-[10px] text-primary/60 font-bold uppercase tracking-widest">
                Bihar Farm 1 · 45 acres
              </div>
              <div
                className="absolute border border-primary/25 rounded-lg bg-primary/5"
                style={{ left: "8%", top: "18%", width: "38%", height: "55%" }}
              >
                <span className="text-[9px] text-primary/50 absolute top-1 left-2 font-semibold">
                  FIELD 1
                </span>
              </div>
              <div
                className="absolute border border-primary/25 rounded-lg bg-primary/5"
                style={{ left: "52%", top: "8%", width: "38%", height: "55%" }}
              >
                <span className="text-[9px] text-primary/50 absolute top-1 left-2 font-semibold">
                  FIELD 2
                </span>
              </div>
              <div
                className="absolute border border-dashed border-orange-300 rounded-lg"
                style={{ left: "52%", top: "5%", width: "44%", height: "22%" }}
              >
                <span className="text-[8px] text-orange-400 absolute bottom-0.5 right-1">
                  NORTH BOUNDARY
                </span>
              </div>
              {ANIMALS.map((a) => (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => setSelected(a.id === selected ? null : a.id)}
                  data-ocid="tracking.animal.button"
                  className="absolute flex flex-col items-center group"
                  style={{
                    left: `${a.x}%`,
                    top: `${a.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                      a.alert ? "pulse-dot" : ""
                    } ${selected === a.id ? "ring-2 ring-offset-1" : ""}`}
                    style={{
                      backgroundColor: a.alert ? "#ef4444" : COLOR_MAP[a.type],
                    }}
                  />
                  <span
                    className="text-[8px] font-bold mt-0.5 whitespace-nowrap px-1 rounded"
                    style={{
                      color: a.alert ? "#ef4444" : COLOR_MAP[a.type],
                      backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {a.id}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {[
                { color: "#2E7D32", label: "Cattle" },
                { color: "#f59e0b", label: "Sheep" },
                { color: "#8b5cf6", label: "Goat" },
                { color: "#ef4444", label: "Alert Zone" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="space-y-3">
          {selectedAnimal && (
            <Card
              className="shadow-card border-border"
              data-ocid="tracking.panel"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <PawPrint
                    size={14}
                    style={{
                      color: selectedAnimal.alert
                        ? "#ef4444"
                        : COLOR_MAP[selectedAnimal.type],
                    }}
                  />
                  {selectedAnimal.id}
                  {selectedAnimal.alert && (
                    <Badge className="bg-red-100 text-red-700 border-0 text-[10px] ml-auto">
                      Alert
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {[
                  {
                    label: "Tag ID",
                    value: selectedAnimal.tag,
                    icon: null,
                    alert: false,
                  },
                  {
                    label: "Type",
                    value: selectedAnimal.type,
                    icon: null,
                    alert: false,
                  },
                  {
                    label: "Zone",
                    value: selectedAnimal.zone,
                    icon: null,
                    alert: selectedAnimal.alert,
                  },
                  {
                    label: "Signal",
                    value: selectedAnimal.signal,
                    icon: <Wifi size={11} />,
                    alert: false,
                  },
                  {
                    label: "Battery",
                    value: `${selectedAnimal.battery}%`,
                    icon: <Battery size={11} />,
                    alert: false,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span
                      className={`font-medium flex items-center gap-1 ${row.alert ? "text-destructive" : "text-foreground"}`}
                    >
                      {row.icon}
                      {row.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="shadow-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Alert History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ALERTS.map((alert, i) => (
                <div
                  key={alert.id}
                  className={`rounded-lg p-2 border text-xs ${
                    alert.severity === "high"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : alert.severity === "medium"
                        ? "bg-orange-50 border-orange-200 text-orange-700"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                  data-ocid={`tracking.alert.item.${i + 1}`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Clock size={10} />
                    <span className="font-medium">{alert.time}</span>
                  </div>
                  <p>{alert.msg}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
