import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Zap, Eye, Brain, Lock } from "lucide-react";

const ThreatDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  
  const demos = [
    {
      title: "Patronus Shield in Action",
      description: "Real-time protection while browsing",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      scenario: "Suspicious Link Detected",
      content: "A protective shield appears when you hover over a suspicious crypto investment link, warning you about potential scam tactics.",
      protection: "Authority Manipulation • Urgency Tactics • Financial Scam"
    },
    {
      title: "Mind Legilimency Alert",
      description: "Emotional manipulation detection",
      icon: Brain,
      color: "text-purple-400", 
      bgColor: "bg-purple-500/10",
      scenario: "Fear-Based Phishing Detected",
      content: "Your mental defenses activate when encountering an email claiming your account will be closed immediately, recognizing fear-based manipulation.",
      protection: "Fear Exploitation • Urgency • False Authority"
    },
    {
      title: "Occlumency Barrier",
      description: "Advanced threat neutralization",
      icon: Lock,
      color: "text-green-400",
      bgColor: "bg-green-500/10", 
      scenario: "Social Engineering Blocked",
      content: "A multi-layered defense activates against a sophisticated LinkedIn message using professional authority and opportunity scarcity.",
      protection: "Social Proof • Professional Authority • FOMO"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24 bg-gradient-subtle">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-gradient-magical">
          Live Threat Defense System
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See how Occlumens protects you in real-time against digital manipulation tactics. 
          Our AI-powered system learns your vulnerabilities and adapts protection accordingly.
        </p>
      </div>

      {/* Demo Selector */}
      <div className="flex justify-center mb-12">
        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-2 border border-border/30">
          {demos.map((demo, index) => {
            const IconComponent = demo.icon;
            return (
              <Button
                key={index}
                onClick={() => setActiveDemo(index)}
                variant={activeDemo === index ? "default" : "ghost"}
                className={`mx-1 transition-magical ${
                  activeDemo === index 
                    ? 'bg-gradient-primary glow-primary' 
                    : 'hover:bg-accent/10'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {demo.title.split(' ')[0]}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active Demo */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 shadow-elegant">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${demos[activeDemo].bgColor} ${demos[activeDemo].color}`}>
                {(() => {
                  const IconComponent = demos[activeDemo].icon;
                  return <IconComponent className="w-8 h-8" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{demos[activeDemo].title}</h3>
                <p className="text-muted-foreground">{demos[activeDemo].description}</p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground animate-glow">
              <Eye className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>

          {/* Threat Simulation */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold text-destructive">{demos[activeDemo].scenario}</h4>
            </div>
            <p className="text-foreground mb-4">{demos[activeDemo].content}</p>
            
            <div className="flex flex-wrap gap-2">
              {demos[activeDemo].protection.split(' • ').map((tactic, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {tactic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Defense Activation */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-green-400 animate-glow" />
              <h4 className="font-semibold text-green-400">Defense Activated</h4>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-sm font-medium text-foreground">Instant Detection</div>
                <div className="text-xs text-muted-foreground">0.2s response time</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm font-medium text-foreground">Pattern Analysis</div>
                <div className="text-xs text-muted-foreground">97% confidence</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-sm font-medium text-foreground">Mind Shield</div>
                <div className="text-xs text-muted-foreground">Protection active</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              className="bg-gradient-primary hover:glow-primary transition-glow"
            >
              <Shield className="w-4 h-4 mr-2" />
              Learn This Defense
            </Button>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Eye className="w-4 h-4 mr-2" />
              View More Demos
            </Button>
          </div>
        </Card>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-card/30 backdrop-blur-sm border-border/30 p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-2">15,847</div>
            <div className="text-sm text-muted-foreground">Threats Blocked Today</div>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm border-border/30 p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-2">98.7%</div>
            <div className="text-sm text-muted-foreground">Detection Accuracy</div>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm border-border/30 p-6 text-center">
            <div className="text-2xl font-bold text-accent mb-2">2.1M</div>
            <div className="text-sm text-muted-foreground">Protected Users</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreatDemo;