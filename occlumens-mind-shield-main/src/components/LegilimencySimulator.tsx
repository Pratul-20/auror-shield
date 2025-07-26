import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, AlertTriangle, Shield, Eye, CheckCircle, XCircle } from "lucide-react";

interface SimulationData {
  id: string;
  type: "email" | "social" | "message";
  title: string;
  content: string;
  sender: string;
  redFlags: string[];
  correctAction: "protego" | "verify" | "ignore";
  explanation: string;
}

const simulations: SimulationData[] = [
  {
    id: "1",
    type: "email",
    title: "Urgent: Your Account Will Be Suspended",
    content: "Dear Valued Customer, Your account has been flagged for suspicious activity. Click here IMMEDIATELY to verify your identity or your account will be permanently suspended within 24 hours. Act now to avoid losing access to your funds.",
    sender: "security@bank-alerts.com",
    redFlags: ["Urgency pressure", "Generic greeting", "Suspicious domain", "Threat of loss"],
    correctAction: "verify",
    explanation: "This email uses urgency and fear tactics. Always verify through official channels before clicking suspicious links."
  },
  {
    id: "2",
    type: "social",
    title: "Congratulations! You've Won!",
    content: "🎉 WINNER ALERT! 🎉 You've been selected as our GRAND PRIZE winner of $50,000! Claim your prize now by providing your banking details. This offer expires in 2 hours. Don't miss out on this life-changing opportunity!",
    sender: "@lottery_official_2024",
    redFlags: ["Too good to be true", "Requests banking details", "False urgency", "Unsolicited prize"],
    correctAction: "ignore",
    explanation: "Classic scam using greed and urgency. Real lotteries don't require banking details upfront or contact winners via social media."
  },
  {
    id: "3",
    type: "message",
    title: "IT Support: System Update Required",
    content: "Hi, this is Michael from IT. We're pushing a critical security update to all computers. Please download and install this software immediately to maintain your access. Link: secure-update-portal.net/download",
    sender: "Michael Thompson",
    redFlags: ["Impersonation", "External download link", "Pressure to act quickly", "Unsolicited contact"],
    correctAction: "protego",
    explanation: "This is likely a social engineering attack. IT departments have official channels for updates. Block and report."
  }
];

export default function LegilimencySimulator() {
  const [currentSim, setCurrentSim] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const current = simulations[currentSim];

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowResult(true);
    
    if (action === current.correctAction) {
      setScore(score + 1);
    }
  };

  const nextSimulation = () => {
    if (currentSim < simulations.length - 1) {
      setCurrentSim(currentSim + 1);
      setSelectedAction("");
      setShowResult(false);
    }
  };

  const resetSimulator = () => {
    setCurrentSim(0);
    setSelectedAction("");
    setShowResult(false);
    setScore(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "email": return Mail;
      case "social": return MessageSquare;
      case "message": return MessageSquare;
      default: return Mail;
    }
  };

  if (currentSim >= simulations.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="bg-gradient-primary border-accent/20 shadow-elegant">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4 glow-magical" />
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Legilimency Training Complete!
            </h2>
            <p className="text-2xl text-primary-foreground/90 mb-4">
              Final Score: {score}/{simulations.length}
            </p>
            <p className="text-primary-foreground/80 mb-6">
              You've successfully defended against digital dark arts. Your mind is becoming stronger!
            </p>
            <Button 
              onClick={resetSimulator}
              className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
              size="lg"
            >
              Train Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const IconComponent = getIcon(current.type);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Eye className="h-8 w-8 text-accent glow-magical" />
          <h1 className="text-3xl font-bold text-gradient-magical">Legilimency Simulator</h1>
        </div>
        <p className="text-muted-foreground">
          Train your mind to detect psychological manipulation
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="border-accent/50">
            Simulation {currentSim + 1} of {simulations.length}
          </Badge>
          <Badge variant="outline" className="border-accent/50">
            Score: {score}/{currentSim + (showResult ? 1 : 0)}
          </Badge>
        </div>
      </div>

      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader className="border-b border-accent/20">
          <div className="flex items-center gap-3">
            <IconComponent className="h-6 w-6 text-accent" />
            <div>
              <CardTitle className="text-xl">{current.title}</CardTitle>
              <p className="text-sm text-muted-foreground">From: {current.sender}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-muted/30 p-4 rounded-lg border border-accent/10 mb-6">
            <p className="text-foreground leading-relaxed">{current.content}</p>
          </div>

          {!showResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                How do you defend your mind?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleAction("protego")}
                  className="bg-red-600 hover:bg-red-700 text-white h-20 flex flex-col gap-2"
                >
                  <Shield className="h-6 w-6" />
                  Cast "Protego"
                  <span className="text-xs opacity-80">Block & Report</span>
                </Button>
                <Button
                  onClick={() => handleAction("verify")}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex flex-col gap-2"
                >
                  <Eye className="h-6 w-6" />
                  Verify with Spell
                  <span className="text-xs opacity-80">Check Official Source</span>
                </Button>
                <Button
                  onClick={() => handleAction("ignore")}
                  className="bg-gray-600 hover:bg-gray-700 text-white h-20 flex flex-col gap-2"
                >
                  <XCircle className="h-6 w-6" />
                  Ignore Completely
                  <span className="text-xs opacity-80">Delete & Move On</span>
                </Button>
              </div>
            </div>
          )}

          {showResult && (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg border-2 ${
                selectedAction === current.correctAction 
                  ? 'bg-green-900/20 border-green-500/50' 
                  : 'bg-red-900/20 border-red-500/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedAction === current.correctAction ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-400" />
                  )}
                  <h3 className="text-lg font-semibold">
                    {selectedAction === current.correctAction ? "Mind Protected!" : "Mind Breached!"}
                  </h3>
                </div>
                <p className="text-sm">{current.explanation}</p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  Detected Red Flags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.redFlags.map((flag, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {flag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={nextSimulation}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
                  size="lg"
                >
                  {currentSim === simulations.length - 1 ? "Complete Training" : "Next Challenge"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}