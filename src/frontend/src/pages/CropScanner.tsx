import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock,
  ScanLine,
  Upload,
} from "lucide-react";
import { useState } from "react";

const DISEASES = [
  {
    name: "Wheat Rust",
    severity: "High",
    treatment:
      "Apply Propiconazole 25 EC @ 0.1% solution. Repeat after 14 days.",
    color: "text-red-600 bg-red-50 border-red-200",
  },
  {
    name: "Rice Blast",
    severity: "Medium",
    treatment: "Use Tricyclazole 75WP @ 0.06%. Ensure proper drainage.",
    color: "text-orange-600 bg-orange-50 border-orange-200",
  },
  {
    name: "Powdery Mildew",
    severity: "Low",
    treatment: "Spray Sulphur 80WP @ 0.2%. Improve air circulation.",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  {
    name: "Healthy Crop",
    severity: "None",
    treatment: "No treatment needed. Continue regular monitoring.",
    color: "text-green-600 bg-green-50 border-green-200",
  },
  {
    name: "Leaf Blight",
    severity: "High",
    treatment: "Apply Copper Oxychloride 50WP @ 0.3%. Remove infected leaves.",
    color: "text-red-600 bg-red-50 border-red-200",
  },
];

const HISTORY = [
  {
    id: "h1",
    crop: "Wheat Rust",
    confidence: 87,
    status: "detected",
    field: "Field 3",
    date: "Today 10:23 AM",
  },
  {
    id: "h2",
    crop: "Healthy Maize",
    confidence: 95,
    status: "healthy",
    field: "Field 2",
    date: "Today 9:41 AM",
  },
  {
    id: "h3",
    crop: "Rice Blight",
    confidence: 72,
    status: "detected",
    field: "Field 1",
    date: "Yesterday 4:15 PM",
  },
  {
    id: "h4",
    crop: "Healthy Wheat",
    confidence: 91,
    status: "healthy",
    field: "Field 4",
    date: "Yesterday 2:00 PM",
  },
];

export default function CropScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<(typeof DISEASES)[0] | null>(null);
  const [progress, setProgress] = useState(0);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setResult(DISEASES[Math.floor(Math.random() * DISEASES.length)]);
        setScanning(false);
      }
    }, 150);
  };

  return (
    <div className="space-y-4" data-ocid="scanner.page">
      <div>
        <h2 className="text-base font-semibold text-foreground">
          Crop Disease Scanner
        </h2>
        <p className="text-xs text-muted-foreground">
          AI-powered crop disease detection using image analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Scan Crop Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                scanning
                  ? "border-primary bg-primary/5"
                  : result
                    ? "border-success/50 bg-success/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/30"
              }`}
              data-ocid="scanner.dropzone"
            >
              {scanning ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <ScanLine
                      size={32}
                      className="text-primary animate-pulse"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">
                      Analyzing crop sample...
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Using AI disease detection model
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-primary font-medium">
                    {progress}% complete
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-3">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border-2 ${result.color}`}
                  >
                    {result.severity === "None" ? (
                      <CheckCircle2 size={28} className="text-green-600" />
                    ) : (
                      <AlertTriangle size={28} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {result.name}
                    </p>
                    <Badge className={`mt-1 border ${result.color} text-xs`}>
                      Severity: {result.severity}
                    </Badge>
                  </div>
                  <div
                    className={`text-left rounded-lg p-3 border text-xs ${result.color}`}
                  >
                    <p className="font-medium mb-1">
                      Treatment Recommendation:
                    </p>
                    <p>{result.treatment}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Camera size={28} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Upload or Capture Crop Image
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports JPG, PNG up to 10MB
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                      data-ocid="scanner.upload_button"
                    >
                      <Upload size={13} /> Upload
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                      data-ocid="scanner.camera.button"
                    >
                      <Camera size={13} /> Camera
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-sm"
              onClick={handleScan}
              disabled={scanning}
              data-ocid="scanner.scan.button"
            >
              {scanning ? "Scanning..." : "Start Scan"}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Scan History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {HISTORY.map((h, i) => (
              <div
                key={h.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
                data-ocid={`scanner.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      h.status === "detected" ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {h.status === "detected" ? (
                      <AlertTriangle size={14} className="text-destructive" />
                    ) : (
                      <CheckCircle2 size={14} className="text-success" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {h.crop}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={10} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        {h.date} · {h.field}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-foreground">
                    {h.confidence}%
                  </span>
                  <Badge
                    className={`block mt-0.5 text-[10px] border-0 px-1.5 ${
                      h.status === "detected"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {h.status === "detected" ? "Detected" : "Healthy"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
