import { Card, CardContent } from "@/components/ui/card";
import { Flame, Calendar, Star, Trophy } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  todayComplete: boolean;
}

export default function StreakCounter({ currentStreak, longestStreak, todayComplete }: StreakCounterProps) {
  const weeklyProgress = [
    { day: "Mon", complete: true },
    { day: "Tue", complete: true },
    { day: "Wed", complete: true },
    { day: "Thu", complete: true },
    { day: "Fri", complete: true },
    { day: "Sat", complete: true },
    { day: "Sun", complete: todayComplete }
  ];

  return (
    <Card className="bg-gradient-primary border-accent/20 shadow-elegant">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Flame className="h-8 w-8 text-orange-400 glow-magical" />
              {currentStreak > 0 && (
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {currentStreak}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-foreground">
                {currentStreak} Day Streak
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Keep training to maintain your streak!
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-primary-foreground/70 text-sm">
              <Trophy className="h-4 w-4" />
              <span>Best: {longestStreak} days</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
            <Calendar className="h-4 w-4" />
            <span>This Week</span>
          </div>
          
          <div className="flex gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex-1 text-center">
                <div className="text-xs text-primary-foreground/60 mb-1">
                  {day.day}
                </div>
                <div 
                  className={`h-8 rounded-lg flex items-center justify-center transition-all ${
                    day.complete 
                      ? 'bg-green-500/30 border border-green-400/50' 
                      : 'bg-primary-foreground/10 border border-primary-foreground/20'
                  }`}
                >
                  {day.complete && (
                    <Star className="h-4 w-4 text-green-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!todayComplete && (
          <div className="mt-4 p-3 bg-orange-500/10 border border-orange-400/30 rounded-lg">
            <p className="text-orange-200 text-sm text-center">
              Complete today's challenges to continue your streak!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}