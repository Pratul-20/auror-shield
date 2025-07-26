import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Zap, Heart, CheckCircle } from "lucide-react";

interface ThreatAlert {
  id: string;
  type: "phishing" | "scam" | "malware" | "social";
  title: string;
  description: string;
  threatLevel: "low" | "medium" | "high";
  patronus: "stag" | "doe" | "otter" | "phoenix";
}

const mockThreats: ThreatAlert[] = [
  {
    id: "1",
    type: "phishing",
    title: "Suspicious Email Link Detected",
    description: "The link you're about to click appears to be a phishing attempt mimicking a banking website.",
    threatLevel: "high",
    patronus: "stag"
  },
  {
    id: "2",
    type: "social",
    title: "Social Engineering Alert",
    description: "This message uses urgency tactics typical of manipulation attempts.",
    threatLevel: "medium",
    patronus: "doe"
  },
  {
    id: "3",
    type: "scam",
    title: "Prize Scam Detected",
    description: "This appears to be a fake lottery or prize notification scam.",
    threatLevel: "high",
    patronus: "phoenix"
  }
];

export default function PatronusShield() {
  const [activeAlert, setActiveAlert] = useState<ThreatAlert | null>(null);
  const [alertsBlocked, setAlertsBlocked] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const triggerAlert = (threat: ThreatAlert) => {
    setActiveAlert(threat);
  };

  const castDefensiveCharm = () => {
    setAlertsBlocked(prev => prev + 1);
    setActiveAlert(null);
  };

  const dismissAlert = () => {
    setActiveAlert(null);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-400 border-red-500/50";
      case "medium": return "text-yellow-400 border-yellow-500/50";
      case "low": return "text-green-400 border-green-500/50";
      default: return "text-gray-400 border-gray-500/50";
    }
  };

  const getPatronusEmoji = (patronus: string) => {
    switch (patronus) {
      case "stag": return "🦌";
      case "doe": return "🦌";
      case "otter": return "🦦";
      case "phoenix": return "🐦‍🔥";
      default: return "✨";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-accent glow-magical animate-pulse" />
          <h1 className="text-3xl font-bold text-gradient-magical">Patronus Shield</h1>
        </div>
        <p className="text-muted-foreground">
          Real-time magical protection against digital dark arts
        </p>
        <Badge variant="outline" className="border-accent/50">
          Threats Blocked: {alertsBlocked}
        </Badge>
      </div>

      {/* Demo Section */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Shield Demonstration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Experience how your Patronus Shield protects you from various digital threats. 
            Click below to simulate different types of attacks:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockThreats.map((threat) => (
              <Button
                key={threat.id}
                onClick={() => triggerAlert(threat)}
                variant="outline"
                className="h-20 flex flex-col gap-2 border-accent/30 hover:border-accent/60 transition-magical"
              >
                <span className="text-2xl">{getPatronusEmoji(threat.patronus)}</span>
                <span className="text-sm">Simulate {threat.type}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Settings */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            Shield Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Protection Levels</h3>
              <div className="space-y-2">
                {["High Sensitivity", "Balanced Protection", "Critical Only"].map((level, index) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="protection" 
                      defaultChecked={index === 1}
                      className="text-accent"
                    />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Patronus Type</h3>
              <div className="space-y-2">
                {[
                  { name: "Stag", emoji: "🦌", desc: "Powerful & Bold" },
                  { name: "Doe", emoji: "🦌", desc: "Gentle & Wise" },
                  { name: "Otter", emoji: "🦦", desc: "Playful & Quick" },
                  { name: "Phoenix", emoji: "🐦‍🔥", desc: "Rare & Mighty" }
                ].map((patronus, index) => (
                  <label key={patronus.name} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="patronus" 
                      defaultChecked={index === 0}
                      className="text-accent"
                    />
                    <span className="text-xl">{patronus.emoji}</span>
                    <div>
                      <span className="text-sm font-medium">{patronus.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{patronus.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alert Modal */}
      {activeAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className={`max-w-md w-full bg-card/95 border-2 ${getThreatColor(activeAlert.threatLevel)} shadow-elegant glow-magical animate-fade-in-up`}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 text-6xl animate-pulse">
                {getPatronusEmoji(activeAlert.patronus)}
              </div>
              <CardTitle className="text-xl text-gradient-magical">
                Patronus Shield Activated!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <Badge variant="destructive" className="mb-2">
                  {activeAlert.threatLevel.toUpperCase()} THREAT
                </Badge>
                <h3 className="font-semibold text-foreground">{activeAlert.title}</h3>
                <p className="text-sm text-muted-foreground">{activeAlert.description}</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={castDefensiveCharm}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Cast Defensive Charm
                </Button>
                <Button 
                  onClick={dismissAlert}
                  variant="outline"
                  className="border-accent/50 hover:border-accent"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Message */}
      {alertsBlocked > 0 && (
        <Card className="bg-green-900/20 border-green-500/50 shadow-elegant">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-300 font-semibold">
              Your Patronus has successfully defended your mind!
            </p>
            <p className="text-green-400/80 text-sm">
              Total threats blocked: {alertsBlocked}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}