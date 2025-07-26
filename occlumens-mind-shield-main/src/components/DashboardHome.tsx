import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StreakCounter from "@/components/StreakCounter";
import { 
  Shield, 
  TrendingUp, 
  Target, 
  Zap, 
  Award, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  Flame,
  Calendar
} from "lucide-react";

interface DashboardHomeProps {
  userHouse: string;
  userType: string;
  onNavigate: (screen: string) => void;
}

export default function DashboardHome({ userHouse, userType, onNavigate }: DashboardHomeProps) {
  const overallProgress = 67;
  const threatsBlocked = 23;
  const skillPoints = 1247;
  const currentLevel = 8;
  const currentStreak = 7;
  const longestStreak = 15;
  const dailyXP = 45;
  const targetXP = 100;
  const todayComplete = false;

  const getHouseColor = (house: string) => {
    switch (house) {
      case "Gryffindor": return "text-red-400";
      case "Ravenclaw": return "text-blue-400";
      case "Hufflepuff": return "text-yellow-400";
      case "Slytherin": return "text-green-400";
      default: return "text-accent";
    }
  };

  const recentActivity = [
    { type: "blocked", message: "Phishing email detected and blocked", time: "2 hours ago" },
    { type: "completed", message: "Authority Bias training completed", time: "1 day ago" },
    { type: "achievement", message: "Earned 'Patronus Guardian' badge", time: "2 days ago" },
    { type: "blocked", message: "Social engineering attempt blocked", time: "3 days ago" }
  ];

  const quickActions = [
    { 
      title: "Daily Challenges", 
      description: "Complete today's Auror training",
      action: () => onNavigate("challenges"),
      icon: Flame,
      color: "bg-orange-600 hover:bg-orange-700",
      urgent: !todayComplete
    },
    { 
      title: "Skill Tree", 
      description: "Level up your defense abilities",
      action: () => onNavigate("skill-tree"),
      icon: Target,
      color: "bg-blue-600 hover:bg-blue-700"
    },
    { 
      title: "Threat Simulation", 
      description: "Practice against new attack vectors",
      action: () => onNavigate("simulator"),
      icon: Zap,
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-primary border-accent/20 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                Welcome back, Auror!
              </h1>
              <p className="text-primary-foreground/80">
                House <span className={getHouseColor(userHouse)}>{userHouse}</span> • {userType} Wizard
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-foreground">Level {currentLevel}</div>
              <div className="text-primary-foreground/70">
                {skillPoints} SP
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Counter */}
      <StreakCounter 
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        todayComplete={todayComplete}
      />

      {/* Daily Progress */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
            </div>
            <Badge variant={todayComplete ? "default" : "secondary"}>
              {dailyXP}/{targetXP} XP
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Daily XP Goal</span>
              <span className="text-muted-foreground">{Math.round((dailyXP / targetXP) * 100)}%</span>
            </div>
            <Progress value={(dailyXP / targetXP) * 100} className="h-3" />
          </div>

          {!todayComplete && (
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg">
              <p className="text-orange-300 text-sm text-center">
                Complete your daily challenges to maintain your {currentStreak}-day streak!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2 glow-magical" />
            <div className="text-2xl font-bold text-foreground">{threatsBlocked}</div>
            <div className="text-sm text-muted-foreground">Threats Blocked</div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2 glow-magical" />
            <div className="text-2xl font-bold text-foreground">{overallProgress}%</div>
            <div className="text-sm text-muted-foreground">Defense Mastery</div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2 glow-magical" />
            <div className="text-2xl font-bold text-foreground">{skillPoints}</div>
            <div className="text-sm text-muted-foreground">Skill Points</div>
          </CardContent>
        </Card>

        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-400 mx-auto mb-2 glow-magical" />
            <div className="text-2xl font-bold text-foreground">7</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div key={index} className="relative">
                  <Button
                    onClick={action.action}
                    className={`w-full h-16 flex items-center gap-4 justify-start ${action.color} text-white ${
                      action.urgent ? 'glow-primary animate-pulse' : ''
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                  {action.urgent && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                      !
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === "blocked" && <Shield className="h-4 w-4 text-red-400" />}
                  {activity.type === "completed" && <CheckCircle className="h-4 w-4 text-green-400" />}
                  {activity.type === "achievement" && <Star className="h-4 w-4 text-yellow-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card/95 border-accent/20 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { skill: "Phishing Detection", progress: 85, color: "bg-blue-500" },
              { skill: "Authority Resistance", progress: 70, color: "bg-green-500" },
              { skill: "Urgency Defense", progress: 45, color: "bg-yellow-500" }
            ].map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{skill.skill}</span>
                  <span className="text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => onNavigate("skill-tree")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
            >
              Continue Training
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}