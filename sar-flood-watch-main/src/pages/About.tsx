import { Radar, Satellite, Zap, Shield, Users, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const sarPrinciples = [
    {
      icon: Radar,
      title: "Synthetic Aperture Radar",
      description: "Uses microwave radiation to penetrate clouds and darkness, providing all-weather monitoring capabilities"
    },
    {
      icon: Satellite, 
      title: "Satellite Constellation",
      description: "Multiple satellites ensure global coverage with frequent revisit times for real-time monitoring"
    },
    {
      icon: Zap,
      title: "Rapid Processing",
      description: "AI-powered algorithms process SAR data in near real-time for immediate flood detection"
    },
    {
      icon: Shield,
      title: "Reliable Detection",
      description: "Water bodies create distinct SAR signatures, enabling accurate flood boundary identification"
    }
  ];

  const timeline = [
    { year: "2004", event: "Indian Ocean Tsunami", impact: "230,000 casualties", lesson: "Need for rapid water detection" },
    { year: "2008", event: "Myanmar Cyclone Nargis", impact: "138,000 casualties", lesson: "Remote sensing importance" },
    { year: "2011", event: "Thailand Floods", impact: "$45B economic loss", lesson: "SAR technology development" },
    { year: "2017", event: "Hurricane Harvey", impact: "1M+ evacuated", lesson: "Real-time monitoring success" },
    { year: "2019", event: "Cyclone Idai", impact: "1,000 casualties", lesson: "AI integration breakthrough" },
    { year: "2024", event: "WaveRadar Launch", impact: "Global deployment", lesson: "Comprehensive monitoring achieved" }
  ];

  const teamStats = [
    { icon: Users, label: "Team Members", value: "127" },
    { icon: Globe, label: "Countries Served", value: "34" }, 
    { icon: Satellite, label: "Satellites Monitored", value: "12" },
    { icon: Radar, label: "Daily Scans", value: "2.4M" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
            About WaveRadar
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pioneering SAR-based flood monitoring to protect communities worldwide through 
            advanced satellite technology and real-time data processing.
          </p>
        </div>

        {/* SAR Working Principle */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">SAR Technology Principles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding how Synthetic Aperture Radar enables reliable flood detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sarPrinciples.map((principle, index) => (
              <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <principle.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Disaster Timeline */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Flood Disaster History</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Major flood events that shaped the need for advanced monitoring systems
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-primary/20"></div>
            
            {timeline.map((event, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
                <Card className={`w-full max-w-md bg-card/50 border-border hover:border-primary/50 transition-all ${
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.event}</CardTitle>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        {event.year}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-flood-warning font-medium">Impact: {event.impact}</p>
                    <p className="text-sm text-muted-foreground">Lesson: {event.lesson}</p>
                  </CardContent>
                </Card>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Team & Impact Stats */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Global reach and technological capabilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamStats.map((stat, index) => (
              <Card key={index} className="bg-card/50 border-border text-center hover:border-primary/50 transition-all group">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section>
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gradient">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                To provide real-time, accurate flood monitoring using cutting-edge SAR technology, 
                empowering emergency responders, government agencies, and communities to make 
                informed decisions that save lives and protect property. Through continuous 
                innovation and global collaboration, we're building a more resilient world.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;