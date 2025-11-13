import { BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Activity, Droplets, MapPin, AlertTriangle, Users, Home, Clock } from "lucide-react";

const Analytics = () => {
  // Sample data for charts - telling the story of the May 2024 flood event
  const floodTrendData = [
    { month: 'Jan', area: 1200, affected: 45000 },
    { month: 'Feb', area: 800, affected: 32000 },
    { month: 'Mar', area: 1500, affected: 58000 },
    { month: 'Apr', area: 2200, affected: 89000 },
    { month: 'May', area: 3100, affected: 125000 },
    { month: 'Jun', area: 2800, affected: 112000 },
  ];

  const rainfallScatterData = [
    { rainfall: 45, waterSpread: 1200 },
    { rainfall: 78, waterSpread: 2100 },
    { rainfall: 112, waterSpread: 3400 },
    { rainfall: 156, waterSpread: 4200 },
    { rainfall: 203, waterSpread: 5800 },
    { rainfall: 287, waterSpread: 7200 },
  ];

  const landUseData = [
    { name: 'Agricultural', value: 45, color: '#10B981' },
    { name: 'Residential', value: 25, color: '#F59E0B' },
    { name: 'Industrial', value: 15, color: '#EF4444' },
    { name: 'Forest', value: 10, color: '#8B5CF6' },
    { name: 'Water Bodies', value: 5, color: '#00EFFF' },
  ];

  const depthData = [
    { region: 'North', depth0_1: 45, depth1_2: 32, depth2_3: 18, depth3plus: 12 },
    { region: 'South', depth0_1: 38, depth1_2: 28, depth2_3: 22, depth3plus: 15 },
    { region: 'East', depth0_1: 52, depth1_2: 25, depth2_3: 15, depth3plus: 8 },
    { region: 'West', depth0_1: 41, depth1_2: 30, depth2_3: 20, depth3plus: 14 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Story Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gradient">The Story Behind the Data</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every flood tells a story. Through SAR data and advanced analytics, we uncover the narrative of nature's power and human resilience.
          </p>
        </div>

        {/* Chapter 1: The Setting */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Chapter 1: The Perfect Storm</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
            It began quietly in January 2024. Our satellites watched as weather patterns shifted, 
            rainfall intensified, and the stage was set for one of the most significant flood events in recent history.
          </p>

          {/* Key Metrics - Story Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">The Scale of Impact</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">14,567 km²</div>
                <p className="text-xs text-muted-foreground">Flooded area at peak</p>
                <p className="text-xs text-flood-warning mt-1">+20.1% from previous month</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">The Catalyst</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground group-hover:text-flood-warning transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-flood-warning mb-1">287 mm</div>
                <p className="text-xs text-muted-foreground">Peak rainfall in 24 hours</p>
                <p className="text-xs text-destructive mt-1">Highest in 5 years</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">The Response</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">2.4 hrs</div>
                <p className="text-xs text-muted-foreground">Average response time</p>
                <p className="text-xs text-primary mt-1">15% faster than usual</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">The Precision</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">94.7%</div>
                <p className="text-xs text-muted-foreground">SAR detection accuracy</p>
                <p className="text-xs text-primary mt-1">Saving precious minutes</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chapter 2: The Unfolding */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-flood-warning/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-flood-warning">2</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Chapter 2: When Waters Rose</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
            Month by month, our story unfolds. Watch as the numbers tell the tale of rising waters, 
            growing concern, and the moment when nature showed its full power in May.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Flood Progression Story */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  The Crescendo of Crisis
                </CardTitle>
                <CardDescription>
                  From whispers in January to roars in May - the progression of flood impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={floodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="area" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3} 
                      name="Flooded Area (km²)"
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="affected" 
                      stroke="hsl(var(--flood-warning))" 
                      strokeWidth={3} 
                      name="Lives Affected"
                      dot={{ fill: 'hsl(var(--flood-warning))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">May marked the turning point:</strong> When 125,000 lives were suddenly affected as floodwaters expanded to cover over 3,100 km².
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Rainfall Correlation Story */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h5 w-5 text-flood-warning" />
                  The Mathematics of Disaster
                </CardTitle>
                <CardDescription>
                  Every drop of rain tells us where the floods will spread next
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={rainfallScatterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="rainfall" 
                      stroke="hsl(var(--muted-foreground))" 
                      name="Rainfall (mm)" 
                      label={{ value: 'Rainfall (mm)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      dataKey="waterSpread" 
                      stroke="hsl(var(--muted-foreground))" 
                      name="Water Spread (km²)"
                      label={{ value: 'Flood Area (km²)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => [
                        name === 'waterSpread' ? `${value} km²` : `${value} mm`,
                        name === 'waterSpread' ? 'Flood Area' : 'Rainfall'
                      ]}
                    />
                    <Scatter 
                      dataKey="waterSpread" 
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--primary-foreground))"
                      strokeWidth={2}
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-flood-warning/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-flood-warning">The pattern is clear:</strong> For every 50mm of additional rainfall, flood coverage nearly doubles. At 287mm, we reached critical mass.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chapter 3: The Human Story */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-destructive">3</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Chapter 3: Lives in the Balance</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
            Behind every data point lies a human story. Farms submerged, homes evacuated, 
            communities coming together. This is where our technology meets humanity.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Land Use Impact Story */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Where Waters Struck Hardest
                </CardTitle>
                <CardDescription>
                  The story of impact across different landscapes and livelihoods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={landUseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {landUseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-green-500/5 rounded-lg">
                    <p className="text-sm"><strong className="text-green-600">45% Agricultural:</strong> Crops lost, but lives saved through early warning</p>
                  </div>
                  <div className="p-3 bg-yellow-500/5 rounded-lg">
                    <p className="text-sm"><strong className="text-yellow-600">25% Residential:</strong> 31,250 families evacuated safely</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Water Depth Story */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Depths of Danger
                </CardTitle>
                <CardDescription>
                  How deep waters shaped the emergency response across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={depthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="depth0_1" stackId="a" fill="hsl(var(--primary))" name="0-1m: Safe Zone" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="depth1_2" stackId="a" fill="hsl(var(--flood-warning))" name="1-2m: Caution" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="depth2_3" stackId="a" fill="hsl(var(--flood-critical))" name="2-3m: Danger" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="depth3plus" stackId="a" fill="hsl(var(--destructive))" name="3m+: Evacuation" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-destructive/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-destructive">Critical insight:</strong> The South region saw 37% of areas in dangerous depths (2m+), requiring immediate helicopter evacuations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Epilogue */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Epilogue: The Power of Preparation</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            This flood event became a testament to the power of SAR technology and human resilience. 
            With 94.7% accuracy in flood detection and a 2.4-hour response time, we helped save countless lives. 
            Every data point represents hope, every chart tells a story of communities protected.
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              125,000 lives safeguarded
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-flood-warning rounded-full"></div>
              Zero casualties reported
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              Technology saving lives
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;