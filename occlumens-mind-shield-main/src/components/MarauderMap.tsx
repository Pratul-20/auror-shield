import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, AlertCircle, TrendingUp, Eye, Shield } from "lucide-react";

interface Vulnerability {
  id: string;
  name: string;
  level: number;
  description: string;
  tips: string[];
  color: string;
  x: number;
  y: number;
}

const vulnerabilities: Vulnerability[] = [
  {
    id: "authority",
    name: "Authority Bias",
    level: 75,
    description: "Susceptible to commands from perceived authority figures",
    tips: [
      "Always verify requests through official channels",
      "Question urgent demands from 'superiors'",
      "Remember: real authorities provide verification methods"
    ],
    color: "text-red-400",
    x: 25,
    y: 30
  },
  {
    id: "urgency",
    name: "Urgency Traps",
    level: 60,
    description: "Influenced by time pressure and deadline manipulation",
    tips: [
      "Take a breath before acting on 'urgent' requests",
      "Most legitimate urgent matters have proper protocols",
      "Scammers use urgency to bypass logical thinking"
    ],
    color: "text-orange-400",
    x: 70,
    y: 45
  },
  {
    id: "fear",
    name: "Fear Response",
    level: 45,
    description: "Reactive to threats and negative consequences",
    tips: [
      "Fear clouds judgment - pause when threatened",
      "Verify scary claims through independent sources",
      "Real companies don't threaten customers via email"
    ],
    color: "text-yellow-400",
    x: 40,
    y: 70
  },
  {
    id: "greed",
    name: "Reward Attraction",
    level: 30,
    description: "Attracted to offers that seem too good to be true",
    tips: [
      "If it sounds too good to be true, it probably is",
      "Research any unexpected winnings or offers",
      "Legitimate rewards don't require upfront payments"
    ],
    color: "text-green-400",
    x: 15,
    y: 20
  },
  {
    id: "social",
    name: "Social Pressure",
    level: 55,
    description: "Influenced by social proof and peer pressure",
    tips: [
      "Make decisions based on facts, not social pressure",
      "Verify claims about what 'everyone else is doing'",
      "Take time to think independently"
    ],
    color: "text-blue-400",
    x: 80,
    y: 25
  }
];

export default function MarauderMap() {
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  const [scanning, setScanning] = useState(false);

  const averageVulnerability = Math.round(
    vulnerabilities.reduce((sum, v) => sum + v.level, 0) / vulnerabilities.length
  );

  const getVulnSize = (level: number) => {
    if (level >= 70) return "w-6 h-6";
    if (level >= 50) return "w-5 h-5";
    if (level >= 30) return "w-4 h-4";
    return "w-3 h-3";
  };

  const scanMind = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-accent glow-magical" />
          <h1 className="text-3xl font-bold text-gradient-magical">Marauder's Map of the Mind</h1>
        </div>
        <p className="text-muted-foreground">
          "I solemnly swear I am up to no good" - Revealing your psychological vulnerabilities
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mind Map Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-card/95 border-accent/20 shadow-elegant h-96">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                Mental Vulnerability Radar
              </CardTitle>
              <Button 
                onClick={scanMind}
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={scanning}
              >
                {scanning ? "Scanning..." : "Rescan Mind"}
              </Button>
            </CardHeader>
            <CardContent className="relative h-full">
              {/* Radar Grid */}
              <div className="absolute inset-4 border-2 border-accent/20 rounded-full">
                <div className="absolute inset-8 border border-accent/10 rounded-full"></div>
                <div className="absolute inset-16 border border-accent/10 rounded-full"></div>
                
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"></div>
                
                {/* Scanning Animation */}
                {scanning && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-spin origin-center"></div>
                  </div>
                )}
                
                {/* Vulnerability Orbs */}
                {vulnerabilities.map((vuln) => (
                  <div
                    key={vuln.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-magical hover:scale-125 ${getVulnSize(vuln.level)}`}
                    style={{
                      left: `${vuln.x}%`,
                      top: `${vuln.y}%`
                    }}
                    onClick={() => setSelectedVuln(vuln)}
                  >
                    <div className={`w-full h-full rounded-full ${vuln.color.replace('text-', 'bg-')} glow-magical animate-pulse`}>
                      <div className="absolute inset-0 rounded-full border-2 border-current opacity-50 animate-ping"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vulnerability Details */}
        <div className="space-y-4">
          <Card className="bg-card/95 border-accent/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Mind Shield Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-magical mb-2">
                  {100 - averageVulnerability}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Defense Strength</p>
                <Progress 
                  value={100 - averageVulnerability} 
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Threat Levels:</h4>
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="flex items-center justify-between text-sm">
                    <span className={vuln.color}>{vuln.name}</span>
                    <Badge variant={vuln.level >= 70 ? "destructive" : vuln.level >= 50 ? "secondary" : "outline"}>
                      {vuln.level}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedVuln && (
            <Card className="bg-gradient-primary border-accent/20 shadow-elegant">
              <CardHeader>
                <CardTitle className={`${selectedVuln.color} flex items-center gap-2`}>
                  <AlertCircle className="h-5 w-5" />
                  {selectedVuln.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-foreground/80">Vulnerability Level</span>
                    <span className="text-lg font-bold text-primary-foreground">{selectedVuln.level}%</span>
                  </div>
                  <Progress value={selectedVuln.level} className="mb-4" />
                  <p className="text-sm text-primary-foreground/90">{selectedVuln.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Defense Tips:
                  </h4>
                  <ul className="space-y-1">
                    {selectedVuln.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-primary-foreground/80 flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="w-full"
                  onClick={() => setSelectedVuln(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Recommended Training Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vulnerabilities
              .sort((a, b) => b.level - a.level)
              .slice(0, 3)
              .map((vuln) => (
                <div key={vuln.id} className="bg-muted/20 p-4 rounded-lg border border-accent/10">
                  <h4 className={`font-semibold ${vuln.color} mb-2`}>{vuln.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{vuln.description}</p>
                  <Button size="sm" variant="outline" className="border-accent/50">
                    Start Training
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}