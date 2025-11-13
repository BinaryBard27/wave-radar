import { Link } from "react-router-dom";
import { ArrowRight, Globe, Radar, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import earthGlobe from "@/assets/earth-globe.jpg";

const LandingPage = () => {
  const features = [
    {
      icon: Radar,
      title: "SAR Technology",
      description: "Advanced Synthetic Aperture Radar for all-weather monitoring",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Real-time flood monitoring across all continents",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered flood prediction and risk assessment",
    },
    {
      icon: Shield,
      title: "Emergency Response",
      description: "Rapid deployment for disaster management teams",
    },
  ];

  return (
    <div className="min-h-screen bg-space-gradient">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Globe */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <img
              src={earthGlobe}
              alt="Earth Globe"
              className="w-96 h-96 object-cover rounded-full animate-pulse-glow opacity-30"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-radar-sweep"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Flood Mapping with SAR Data
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time monitoring of floods using radar technology. 
            Protect communities with advanced satellite-based flood detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow group">
              <Link to="/map">
                Explore Flood Map
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Advanced Flood Monitoring Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leveraging cutting-edge SAR technology for comprehensive flood detection and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Monitor Floods in Real-Time?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join disaster management teams worldwide using our SAR-based flood monitoring platform
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
            <Link to="/map">
              Start Monitoring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;