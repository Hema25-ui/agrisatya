import { Badge } from "@/components/ui/badge";
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
  Camera,
  CheckCircle2,
  MoreVertical,
  ScanLine,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface Scan {
  crop: string;
  confidence: number;
  status: string;
}

const RECENT_SCANS: Scan[] = [
  { crop: "Wheat Rust", confidence: 87, status: "detected" },
  { crop: "Healthy Maize", confidence: 95, status: "healthy" },
  { crop: "Rice Blight", confidence: 72, status: "detected" },
];

const RANDOM_RESULTS: Scan[] = [
  { crop: "Powdery Mildew", confidence: 81, status: "detected" },
  { crop: "Healthy Wheat", confidence: 94, status: "healthy" },
  { crop: "Leaf Spot", confidence: 76, status: "detected" },
  { crop: "Healthy Soybean", confidence: 98, status: "healthy" },
  { crop: "Stem Rust", confidence: 69, status: "detected" },
];

export default function CropDiseaseCard() {
  const [scanning, setScanning] = useState(false);
  const [scans, setScans] = useState<Scan[]>(RECENT_SCANS);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const result =
        RANDOM_RESULTS[Math.floor(Math.random() * RANDOM_RESULTS.length)];
      setScans((prev) => [result, ...prev.slice(0, 2)]);
      setScanning(false);
    }, 2000);
  };

  return (
    <Card className="shadow-card border-border" data-ocid="crop.card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
            <ScanLine size={15} className="text-destructive" />
          </div>
          <CardTitle className="text-sm font-semibold">
            Crop Disease Status
          </CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1 rounded hover:bg-accent"
              data-ocid="crop.dropdown_menu"
            >
              <MoreVertical size={14} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View History</DropdownMenuItem>
            <DropdownMenuItem>Export Results</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Upload area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            scanning
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
          data-ocid="crop.dropzone"
        >
          {scanning ? (
            <div className="space-y-2">
              <div className="w-8 h-8 mx-auto relative">
                <ScanLine size={32} className="text-primary animate-pulse" />
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-0.5 bg-primary/60 scan-animation" />
                </div>
              </div>
              <p className="text-xs text-primary font-medium">
                Analyzing crop...
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Camera size={16} className="text-muted-foreground" />
                <Upload size={16} className="text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Scan or Upload Image
              </p>
              <p className="text-[10px] text-muted-foreground/70">
                JPG, PNG up to 10MB
              </p>
            </div>
          )}
        </div>

        {/* Recent scans */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Recent Scans
          </p>
          {scans.map((scan, i) => (
            <div
              key={`${scan.crop}-${i}`}
              className="flex items-center justify-between py-1"
              data-ocid={`crop.item.${i + 1}`}
            >
              <div className="flex items-center gap-2">
                {scan.status === "detected" ? (
                  <AlertTriangle
                    size={13}
                    className="text-destructive flex-shrink-0"
                  />
                ) : (
                  <CheckCircle2
                    size={13}
                    className="text-success flex-shrink-0"
                  />
                )}
                <span className="text-xs text-foreground">{scan.crop}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {scan.confidence}%
                </span>
                <Badge
                  className={`text-[10px] px-1.5 py-0 border-0 ${
                    scan.status === "detected"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {scan.status === "detected" ? "Detected" : "Healthy"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Button
          size="sm"
          className="w-full text-xs bg-destructive hover:bg-destructive/90"
          onClick={handleScan}
          disabled={scanning}
          data-ocid="crop.scan.button"
        >
          {scanning ? "Scanning..." : "Start Scan"}
        </Button>
      </CardContent>
    </Card>
  );
}
