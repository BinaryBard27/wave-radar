import { useState } from "react";
import { Calendar, MapPin, Layers, BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import sarFloodData from "@/assets/sar-flood-data.jpg";

const FloodMap = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [timelineValue, setTimelineValue] = useState([50]);

  const regions = [
    "Southeast Asia",
    "South America", 
    "North America",
    "Europe",
    "Africa",
    "Australia"
  ];

  const dataLayers = [
    { id: "sar", label: "SAR Imagery", checked: true },
    { id: "rainfall", label: "Rainfall Data", checked: true },
    { id: "dem", label: "Digital Elevation Model", checked: false },
    { id: "population", label: "Population Density", checked: true },
  ];

  const statistics = [
    { label: "Flooded Area", value: "2,847", unit: "sq km", trend: "+12%" },
    { label: "Affected Villages", value: "156", unit: "villages", trend: "+8%" },
    { label: "Population Impacted", value: "89,432", unit: "people", trend: "+15%" },
    { label: "Rainfall", value: "287", unit: "mm", trend: "+45%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gradient">Flood Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time SAR-based flood detection and analysis</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Region Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Flood Period</label>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Select Date Range
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Comparison Mode</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="before-after" />
                    <label htmlFor="before-after" className="text-sm">Before/After Flood</label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Data Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dataLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center space-x-2">
                    <Checkbox id={layer.id} defaultChecked={layer.checked} />
                    <label htmlFor={layer.id} className="text-sm">
                      {layer.label}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Map Area */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <Card className="bg-card/50 border-border">
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-[500px] bg-secondary/20 rounded-lg overflow-hidden">
                  <img 
                    src={sarFloodData} 
                    alt="SAR Flood Data Visualization"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Interactive Map Controls</h3>
                      <p className="text-sm text-muted-foreground">
                        Click and drag to explore • Use mouse wheel to zoom • Toggle layers in sidebar
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Timeline Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={timelineValue}
                    onValueChange={setTimelineValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Pre-flood</span>
                    <span>Current: Day {timelineValue[0]}</span>
                    <span>Post-flood</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Statistics */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.unit}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.trend.startsWith('+') ? 'text-flood-warning' : 'text-primary'
                    }`}>
                      {stat.trend}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodMap;