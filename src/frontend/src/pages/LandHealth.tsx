import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, Satellite, TrendingUp } from "lucide-react";
import { useState } from "react";

const FIELDS = [
  {
    name: "Field 1 - North Block",
    ndvi: 0.76,
    area: "12 acres",
    crop: "Wheat",
    cells: [
      0.8, 0.75, 0.78, 0.82, 0.71, 0.79, 0.77, 0.74, 0.83, 0.8, 0.76, 0.81,
      0.73, 0.78, 0.82, 0.79,
    ],
  },
  {
    name: "Field 2 - South Block",
    ndvi: 0.62,
    area: "8 acres",
    crop: "Rice",
    cells: [
      0.65, 0.6, 0.63, 0.58, 0.67, 0.61, 0.64, 0.59, 0.66, 0.62, 0.6, 0.63,
      0.61, 0.65, 0.58, 0.64,
    ],
  },
  {
    name: "Field 3 - East Block",
    ndvi: 0.45,
    area: "10 acres",
    crop: "Maize",
    cells: [
      0.42, 0.48, 0.44, 0.5, 0.41, 0.47, 0.43, 0.49, 0.46, 0.44, 0.5, 0.42,
      0.47, 0.43, 0.48, 0.45,
    ],
  },
  {
    name: "Field 4 - West Block",
    ndvi: 0.88,
    area: "9 acres",
    crop: "Soybean",
    cells: [
      0.9, 0.85, 0.89, 0.87, 0.91, 0.86, 0.88, 0.92, 0.84, 0.89, 0.9, 0.86,
      0.91, 0.88, 0.85, 0.87,
    ],
  },
  {
    name: "Field 5 - Central",
    ndvi: 0.35,
    area: "6 acres",
    crop: "Barley",
    cells: [
      0.32, 0.38, 0.34, 0.37, 0.31, 0.36, 0.33, 0.39, 0.35, 0.33, 0.37, 0.32,
      0.38, 0.34, 0.36, 0.35,
    ],
  },
];

function getColor(v: number) {
  if (v >= 0.8) return "#16a34a";
  if (v >= 0.6) return "#84cc16";
  if (v >= 0.4) return "#eab308";
  return "#ef4444";
}

function getStatus(v: number): { label: string; cls: string } {
  if (v >= 0.8)
    return { label: "Excellent", cls: "bg-green-100 text-green-800" };
  if (v >= 0.6) return { label: "Good", cls: "bg-lime-100 text-lime-800" };
  if (v >= 0.4) return { label: "Fair", cls: "bg-yellow-100 text-yellow-800" };
  return { label: "Poor", cls: "bg-red-100 text-red-800" };
}

export default function LandHealth() {
  const [selected, setSelected] = useState(0);
  const field = FIELDS[selected];
  const status = getStatus(field.ndvi);

  return (
    <div className="space-y-4" data-ocid="landhealth.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Land Health Analysis
          </h2>
          <p className="text-xs text-muted-foreground">
            NDVI Satellite Index — Bihar Farm 1
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs h-8 gap-1">
            <RefreshCw size={13} /> Refresh
          </Button>
          <Button
            size="sm"
            className="text-xs h-8 gap-1 bg-primary hover:bg-primary/90"
          >
            <Download size={13} /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Average NDVI",
            value: "0.61",
            icon: <Satellite size={16} className="text-primary" />,
          },
          {
            label: "Healthy Fields",
            value: "2/5",
            icon: <TrendingUp size={16} className="text-success" />,
          },
          {
            label: "Total Area",
            value: "45 acres",
            icon: <Satellite size={16} className="text-blue-500" />,
          },
          {
            label: "Last Scan",
            value: "Today 9:42 AM",
            icon: <RefreshCw size={16} className="text-muted-foreground" />,
          },
        ].map((s) => (
          <Card key={s.label} className="shadow-card border-border">
            <CardContent className="p-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 p-3 pt-0">
            {FIELDS.map((f, i) => {
              const st = getStatus(f.ndvi);
              return (
                <button
                  type="button"
                  key={f.name}
                  onClick={() => setSelected(i)}
                  data-ocid={`landhealth.field.item.${i + 1}`}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                    selected === i
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {f.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {f.crop} · {f.area}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-sm font-bold"
                        style={{ color: getColor(f.ndvi) }}
                      >
                        {f.ndvi.toFixed(2)}
                      </p>
                      <Badge
                        className={`text-[10px] px-1.5 py-0 border-0 ${st.cls}`}
                      >
                        {st.label}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                {field.name}
              </CardTitle>
              <Badge className={`text-xs border-0 ${status.cls}`}>
                {status.label} · NDVI {field.ndvi.toFixed(2)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className="grid gap-1 rounded-xl overflow-hidden"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              {field.cells.map((val, i) => (
                <div
                  key={`${field.name}-cell-${i}`}
                  className="h-12 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: getColor(val) }}
                >
                  <span className="text-[10px] text-white font-bold drop-shadow">
                    {val.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 flex-wrap pt-1">
              {[
                { color: "#16a34a", label: "Excellent (0.8-1.0)" },
                { color: "#84cc16", label: "Good (0.6-0.8)" },
                { color: "#eab308", label: "Fair (0.4-0.6)" },
                { color: "#ef4444", label: "Poor (<0.4)" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: l.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-muted rounded-lg p-3 mt-2">
              <p className="text-xs font-medium text-foreground mb-1">
                Recommendations
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {field.ndvi < 0.5 ? (
                  <>
                    <li>
                      • Consider additional fertilization — Urea top-dress
                      application recommended
                    </li>
                    <li>
                      • Check irrigation schedule — moisture stress may be
                      affecting growth
                    </li>
                    <li>• Scout for pest/disease damage in low-NDVI zones</li>
                  </>
                ) : (
                  <>
                    <li>
                      • Crop health is {status.label.toLowerCase()} — maintain
                      current practices
                    </li>
                    <li>• Continue regular monitoring every 7-10 days</li>
                    <li>
                      • Consider micronutrient foliar spray to push toward
                      Excellent
                    </li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
