import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Flame, 
  Star, 
  CheckCircle, 
  Clock,
  Zap,
  Shield,
  Eye
} from "lucide-react";

interface DailyChallengesProps {
  onNavigate: (screen: string) => void;
}

export default function DailyChallenges({ onNavigate }: DailyChallengesProps) {
  const [completedChallenges, setCompletedChallenges] = useState([false, false, false]);
  const currentStreak = 7;
  const dailyXP = 45;
  const targetXP = 100;

  const challenges = [
    {
      id: 0,
      title: "Phishing Detection Practice",
      description: "Identify 3 phishing emails in the Legilimency Simulator",
      xp: 25,
      icon: Eye,
      action: () => onNavigate("simulator"),
      difficulty: "Easy"
    },
    {
      id: 1,
      title: "Authority Bias Defense",
      description: "Complete the Authority Resistance training module",
      xp: 35,
      icon: Shield,
      action: () => onNavigate("skill-tree"),
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Threat Analysis",
      description: "Review your vulnerability map and practice weak areas",
      xp: 40,
      icon: Target,
      action: () => onNavigate("map"),
      difficulty: "Hard"
    }
  ];

  const completeChallenge = (challengeId: number) => {
    const newCompleted = [...completedChallenges];
    newCompleted[challengeId] = true;
    setCompletedChallenges(newCompleted);
  };

  const completedCount = completedChallenges.filter(Boolean).length;
  const allCompleted = completedCount === challenges.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Streak */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-gradient-primary rounded-full px-4 py-2">
            <Flame className="h-5 w-5 text-orange-400 glow-magical" />
            <span className="text-primary-foreground font-bold">{currentStreak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-card/95 rounded-full px-4 py-2 border border-accent/20">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-foreground">{dailyXP}/{targetXP} XP Today</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Daily Auror Training</h1>
          <p className="text-muted-foreground">Complete all challenges to maintain your streak!</p>
          <Progress value={(dailyXP / targetXP) * 100} className="w-full max-w-md mx-auto h-3" />
        </div>
      </div>

      {/* Completion Celebration */}
      {allCompleted && (
        <Card className="bg-gradient-primary border-accent/20 shadow-elegant text-center">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-8 w-8 text-green-400 glow-magical" />
              <span className="text-2xl font-bold text-primary-foreground">All Challenges Complete!</span>
            </div>
            <p className="text-primary-foreground/80">You've earned 100 XP and maintained your streak!</p>
          </CardContent>
        </Card>
      )}

      {/* Daily Challenges */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Today's Challenges
        </h2>

        {challenges.map((challenge) => {
          const isCompleted = completedChallenges[challenge.id];
          const IconComponent = challenge.icon;
          
          return (
            <Card 
              key={challenge.id}
              className={`bg-card/95 border-accent/20 shadow-elegant transition-all ${
                isCompleted ? 'opacity-75 bg-green-500/10 border-green-500/30' : 'hover:shadow-glow'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isCompleted ? 'bg-green-500/20' : 'bg-accent/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <IconComponent className="h-6 w-6 text-accent" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{challenge.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{challenge.description}</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-foreground font-medium">+{challenge.xp} XP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {isCompleted ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Completed
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => {
                          challenge.action();
                          completeChallenge(challenge.id);
                        }}
                        className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
                      >
                        Start Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Summary */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-foreground">{completedCount}/3</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-foreground">{dailyXP}</div>
              <div className="text-sm text-muted-foreground">XP Earned Today</div>
            </div>
          </div>

          {!allCompleted && (
            <div className="text-center pt-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Complete all challenges to maintain your streak!</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}