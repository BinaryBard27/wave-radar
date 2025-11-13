import { FileText, Download, Brain, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Southeast Asia Flood Assessment",
      description: "Comprehensive analysis of recent flood events across Vietnam, Thailand, and Malaysia",
      date: "2024-01-15",
      type: "PDF Report",
      status: "Ready",
      size: "12.4 MB",
      pages: 47,
      tags: ["High Priority", "Multi-region"]
    },
    {
      id: 2,
      title: "SAR Data Quality Report",
      description: "Technical assessment of Sentinel-1 data quality and processing accuracy",
      date: "2024-01-10",
      type: "Technical Report",
      status: "Ready", 
      size: "8.7 MB",
      pages: 32,
      tags: ["Technical", "Data Quality"]
    },
    {
      id: 3,
      title: "Emergency Response Analytics",
      description: "Real-time dashboard data export and response time analysis",
      date: "2024-01-08",
      type: "Excel Data",
      status: "Processing",
      size: "3.2 MB",
      pages: null,
      tags: ["Emergency", "Real-time"]
    },
  ];

  const quickExports = [
    {
      title: "Current Flood Zones",
      description: "Active flood areas with population impact",
      icon: MapPin,
      format: "GeoJSON"
    },
    {
      title: "Population Demographics", 
      description: "Affected communities and evacuation data",
      icon: Users,
      format: "CSV"
    },
    {
      title: "Temporal Analysis",
      description: "Time-series flood progression data",
      icon: Calendar,
      format: "Excel"
    },
  ];

  const aiInsights = [
    {
      title: "Flood Pattern Recognition",
      insight: "AI has identified a 34% increase in flash flood events in urban areas during the monsoon season.",
      confidence: "94%",
      actionable: true
    },
    {
      title: "Prediction Accuracy",
      insight: "SAR-based prediction models show 89% accuracy for 48-hour flood forecasting.",
      confidence: "89%", 
      actionable: false
    },
    {
      title: "Risk Assessment",
      insight: "New high-risk zones detected in coastal regions due to changing precipitation patterns.",
      confidence: "76%",
      actionable: true
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate, download and analyze flood monitoring reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Reports Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Generated Reports
                </CardTitle>
                <CardDescription>
                  Download comprehensive flood analysis reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{report.title}</h3>
                            <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{report.date}</span>
                            <span>{report.type}</span>
                            <span>{report.size}</span>
                            {report.pages && <span>{report.pages} pages</span>}
                          </div>
                          <div className="flex gap-2">
                            {report.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          disabled={report.status !== 'Ready'}
                          className="ml-4"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Summary Section */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription>
                  Machine learning analysis of flood patterns and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{insight.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {insight.confidence} confidence
                          </Badge>
                          {insight.actionable && (
                            <Badge className="text-xs bg-flood-warning/20 text-flood-warning">
                              Actionable
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Quick Data Export</CardTitle>
                <CardDescription>
                  Export current monitoring data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickExports.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.format}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Report Generation</CardTitle>
                <CardDescription>
                  Create custom analysis reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="default">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Analysis Report  
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>Export Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month:</span>
                  <span className="font-medium">47 reports</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Size:</span>
                  <span className="font-medium">1.2 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Most Requested:</span>
                  <span className="font-medium">PDF Format</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;