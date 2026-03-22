import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Satellite } from "lucide-react";
import { useState } from "react";

const FIELDS = [
  {
    name: "Field 1",
    ndvi: 0.76,
    cells: [0.8, 0.75, 0.78, 0.82, 0.71, 0.79, 0.77, 0.74, 0.83],
  },
  {
    name: "Field 2",
    ndvi: 0.62,
    cells: [0.65, 0.6, 0.63, 0.58, 0.67, 0.61, 0.64, 0.59, 0.66],
  },
  {
    name: "Field 3",
    ndvi: 0.45,
    cells: [0.42, 0.48, 0.44, 0.5, 0.41, 0.47, 0.43, 0.49, 0.46],
  },
  {
    name: "Field 4",
    ndvi: 0.88,
    cells: [0.9, 0.85, 0.89, 0.87, 0.91, 0.86, 0.88, 0.92, 0.84],
  },
  {
    name: "Field 5",
    ndvi: 0.35,
    cells: [0.32, 0.38, 0.34, 0.37, 0.31, 0.36, 0.33, 0.39, 0.35],
  },
];

function getNDVIColor(val: number): string {
  if (val >= 0.8) return "#16a34a";
  if (val >= 0.6) return "#84cc16";
  if (val >= 0.4) return "#eab308";
  return "#ef4444";
}

function getNDVILabel(val: number): { label: string; color: string } {
  if (val >= 0.8)
    return { label: "Excellent", color: "bg-green-100 text-green-800" };
  if (val >= 0.6) return { label: "Good", color: "bg-lime-100 text-lime-800" };
  if (val >= 0.4)
    return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
  return { label: "Poor", color: "bg-red-100 text-red-800" };
}

interface NDVICardProps {
  compact?: boolean;
  onViewAnalysis?: () => void;
}

export default function NDVICard({ compact, onViewAnalysis }: NDVICardProps) {
  const [selectedField, setSelectedField] = useState(0);
  const field = FIELDS[selectedField];
  const { label, color } = getNDVILabel(field.ndvi);

  return (
    <Card className="shadow-card border-border" data-ocid="ndvi.card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Satellite size={15} className="text-primary" />
          </div>
          <CardTitle className="text-sm font-semibold">
            Satellite Health (NDVI)
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="ndvi.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Refresh Data</DropdownMenuItem>
            <DropdownMenuItem>Export Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">
              {field.ndvi.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              NDVI Index
            </span>
          </div>
          <Badge className={`text-xs ${color} border-0`}>{label}</Badge>
        </div>

        <div className="flex gap-1 flex-wrap">
          {FIELDS.map((f, i) => (
            <button
              type="button"
              key={f.name}
              onClick={() => setSelectedField(i)}
              data-ocid="ndvi.field.tab"
              className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                selectedField === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <div
          className="grid gap-0.5 rounded-md overflow-hidden"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {field.cells.map((val, i) => (
            <div
              key={`${field.name}-cell-${i}`}
              className="h-8 rounded-sm"
              style={{
                backgroundColor: getNDVIColor(val),
                opacity: 0.85 + val * 0.15,
              }}
              title={`NDVI: ${val.toFixed(2)}`}
            />
          ))}
        </div>

        {!compact && (
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { color: "#16a34a", label: "Excellent (0.8-1.0)" },
              { color: "#84cc16", label: "Good (0.6-0.8)" },
              { color: "#eab308", label: "Fair (0.4-0.6)" },
              { color: "#ef4444", label: "Poor (<0.4)" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          size="sm"
          className="w-full text-xs bg-primary hover:bg-primary/90"
          onClick={onViewAnalysis}
          data-ocid="ndvi.view_analysis.button"
        >
          View Analysis
        </Button>
      </CardContent>
    </Card>
  );
}
