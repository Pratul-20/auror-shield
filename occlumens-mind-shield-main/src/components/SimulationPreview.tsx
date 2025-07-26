import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, Shield, X, CheckCircle, Brain } from "lucide-react";

interface ThreatScenario {
  id: string;
  type: "phishing" | "scam" | "impersonation";
  title: string;
  content: string;
  sender: string;
  urgency: "low" | "medium" | "high";
  tactics: string[];
  correctAction: "block" | "verify" | "ignore" | "report";
}

const SimulationPreview = () => {
  const [currentScenario, setCurrentScenario] = useState<ThreatScenario>({
    id: "phishing-1",
    type: "phishing",
    title: "Urgent: Account Security Alert",
    content: "Dear Valued Customer,\n\nWe've detected suspicious activity on your account and need you to verify your identity immediately. Click here to secure your account before it gets suspended. You have 24 hours to respond.\n\nBest regards,\nSecurity Team",
    sender: "security@banksafe-alerts.com",
    urgency: "high",
    tactics: ["Urgency", "Authority", "Fear"],
    correctAction: "block"
  });

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const scenarios: ThreatScenario[] = [
    currentScenario,
    {
      id: "crypto-scam",
      type: "scam",
      title: "🚀 Make $500/day with this one simple trick!",
      content: "Hey! I've been making INSANE profits with this new crypto trading bot. Just made $2,500 yesterday! Want to join my exclusive group? Limited spots available - only 10 people can join today. DM me 'CRYPTO' to get started!",
      sender: "@CryptoMillionaire2024",
      urgency: "high",
      tactics: ["Scarcity", "Social Proof", "Greed"],
      correctAction: "ignore"
    },
    {
      id: "tech-support",
      type: "impersonation",
      title: "Microsoft Support: Computer Infected",
      content: "Hello, this is John from Microsoft Support. Our systems show your computer is infected with malware. We need to remote access your computer immediately to fix this issue. Please call us at (555) 123-4567 right away.",
      sender: "support@microsoft-security.net",
      urgency: "high",
      tactics: ["Authority", "Technical Intimidation", "Urgency"],
      correctAction: "report"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted";
    }
  };

  const getTacticColor = (tactic: string) => {
    const colors = [
      "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "bg-orange-500/20 text-orange-400 border-orange-500/30"
    ];
    return colors[tactic.length % colors.length];
  };

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowResult(true);
    
    if (action === currentScenario.correctAction) {
      setScore(prev => prev + 100);
    }
  };

  const nextScenario = () => {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario.id);
    const nextIndex = (currentIndex + 1) % scenarios.length;
    setCurrentScenario(scenarios[nextIndex]);
    setSelectedAction(null);
    setShowResult(false);
  };

  return (
    <div className="container mx-auto px-6 py-16 bg-gradient-subtle">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gradient-magical">Legilimency Simulations</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Face real-world digital threats in a safe environment. Practice identifying and defending against manipulation tactics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Scenario Card */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 p-8 mb-8 shadow-elegant">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-accent" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">{currentScenario.title}</h3>
                <p className="text-sm text-muted-foreground">From: {currentScenario.sender}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getUrgencyColor(currentScenario.urgency)}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {currentScenario.urgency.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-accent/30 text-accent">
                {currentScenario.type.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-4 mb-6">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
              {currentScenario.content}
            </pre>
          </div>

          {/* Manipulation Tactics */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Manipulation Tactics Detected:
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentScenario.tactics.map((tactic, index) => (
                <Badge key={index} className={getTacticColor(tactic)}>
                  {tactic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {!showResult && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => handleAction("block")}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Block
              </Button>
              <Button
                onClick={() => handleAction("verify")}
                variant="outline"
                className="flex items-center gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
              >
                <AlertTriangle className="w-4 h-4" />
                Verify
              </Button>
              <Button
                onClick={() => handleAction("ignore")}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Ignore
              </Button>
              <Button
                onClick={() => handleAction("report")}
                className="bg-gradient-primary hover:glow-primary transition-glow flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Report
              </Button>
            </div>
          )}

          {/* Results */}
          {showResult && (
            <div className="border-t border-border/30 pt-6">
              <div className="flex items-center gap-3 mb-4">
                {selectedAction === currentScenario.correctAction ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <X className="w-6 h-6 text-red-400" />
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    {selectedAction === currentScenario.correctAction ? "Excellent Defense!" : "Learning Opportunity"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAction === currentScenario.correctAction 
                      ? `Correct! The best action was to ${currentScenario.correctAction}.`
                      : `The recommended action was to ${currentScenario.correctAction}.`
                    }
                  </p>
                </div>
              </div>

              <div className="bg-muted/10 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-foreground mb-2">Analysis:</h5>
                <p className="text-sm text-muted-foreground">
                  This scenario uses {currentScenario.tactics.join(", ").toLowerCase()} to manipulate your response. 
                  Always verify suspicious requests through official channels and never click suspicious links.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Score: +{selectedAction === currentScenario.correctAction ? 100 : 0} XP
                </div>
                <Button onClick={nextScenario} className="bg-gradient-primary hover:glow-primary transition-glow">
                  Next Scenario
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Score Display */}
        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Training Session</h3>
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span>Total Score: {score} XP</span>
              <span>Accuracy: {showResult ? '100%' : 'Pending'}</span>
            </div>
            <Badge className="bg-accent text-accent-foreground">Apprentice Level</Badge>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationPreview;