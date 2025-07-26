import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Brain, Zap, Lock, Crown, Star } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: any;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  category: "detection" | "resistance" | "analysis" | "mastery";
  xp: number;
  requiredXP: number;
}

const SkillTree = () => {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "phishing-detection",
      name: "Phishing Detection",
      description: "Recognize suspicious emails and messages",
      icon: Eye,
      level: 3,
      maxLevel: 5,
      unlocked: true,
      category: "detection",
      xp: 450,
      requiredXP: 500
    },
    {
      id: "authority-resistance",
      name: "Authority Resistance",
      description: "Resist manipulation through false authority",
      icon: Shield,
      level: 2,
      maxLevel: 5,
      unlocked: true,
      category: "resistance",
      xp: 180,
      requiredXP: 300
    },
    {
      id: "pattern-analysis",
      name: "Pattern Analysis",
      description: "Identify recurring manipulation tactics",
      icon: Brain,
      level: 1,
      maxLevel: 5,
      unlocked: true,
      category: "analysis",
      xp: 80,
      requiredXP: 150
    },
    {
      id: "emotional-shield",
      name: "Emotional Shield",
      description: "Block fear and urgency manipulation",
      icon: Zap,
      level: 0,
      maxLevel: 5,
      unlocked: false,
      category: "resistance",
      xp: 0,
      requiredXP: 200
    },
    {
      id: "crypto-scam-defense",
      name: "Crypto Scam Defense",
      description: "Identify investment and crypto scams",
      icon: Lock,
      level: 0,
      maxLevel: 5,
      unlocked: false,
      category: "detection",
      xp: 0,
      requiredXP: 400
    },
    {
      id: "master-occlumens",
      name: "Master Occlumens",
      description: "Ultimate mind protection abilities",
      icon: Crown,
      level: 0,
      maxLevel: 1,
      unlocked: false,
      category: "mastery",
      xp: 0,
      requiredXP: 1000
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "detection": return "text-blue-400";
      case "resistance": return "text-green-400";
      case "analysis": return "text-purple-400";
      case "mastery": return "text-yellow-400";
      default: return "text-accent";
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case "detection": return "bg-blue-500/20 border-blue-500/30";
      case "resistance": return "bg-green-500/20 border-green-500/30";
      case "analysis": return "bg-purple-500/20 border-purple-500/30";
      case "mastery": return "bg-yellow-500/20 border-yellow-500/30";
      default: return "bg-accent/20 border-accent/30";
    }
  };

  const trainSkill = (skillId: string) => {
    setSkills(prev => prev.map(skill => {
      if (skill.id === skillId && skill.unlocked) {
        const newXP = Math.min(skill.xp + 50, skill.requiredXP);
        const newLevel = newXP >= skill.requiredXP ? Math.min(skill.level + 1, skill.maxLevel) : skill.level;
        
        return {
          ...skill,
          xp: newLevel > skill.level ? 0 : newXP,
          level: newLevel,
          requiredXP: newLevel > skill.level ? skill.requiredXP + 100 : skill.requiredXP
        };
      }
      return skill;
    }));
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-gradient-magical">Occlumency Skill Tree</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Develop your mental defenses through focused training. Each skill strengthens your ability to detect and resist digital manipulation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skills.map((skill) => {
          const IconComponent = skill.icon;
          const isMaxLevel = skill.level >= skill.maxLevel;
          const progress = skill.level > 0 ? (skill.xp / skill.requiredXP) * 100 : 0;

          return (
            <Card 
              key={skill.id}
              className={`p-6 transition-magical hover:glow-magical ${
                skill.unlocked ? getCategoryBg(skill.category) : 'bg-muted/20 border-muted/30 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${skill.unlocked ? getCategoryColor(skill.category) : 'text-muted-foreground'}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <Badge variant={skill.unlocked ? "default" : "secondary"} className="text-xs">
                      Level {skill.level}/{skill.maxLevel}
                    </Badge>
                  </div>
                </div>
                {isMaxLevel && skill.unlocked && (
                  <Star className="w-5 h-5 text-yellow-400 animate-glow" />
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {skill.description}
              </p>

              {skill.unlocked && skill.level < skill.maxLevel && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{skill.xp}/{skill.requiredXP} XP</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={() => trainSkill(skill.id)}
                disabled={!skill.unlocked || isMaxLevel}
                className={`w-full ${
                  skill.unlocked && !isMaxLevel 
                    ? 'bg-gradient-primary hover:glow-primary' 
                    : ''
                }`}
                variant={skill.unlocked && !isMaxLevel ? "default" : "secondary"}
              >
                {!skill.unlocked 
                  ? "Locked" 
                  : isMaxLevel 
                    ? "Mastered" 
                    : "Train (+50 XP)"
                }
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Your Progress</h3>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total XP: 710</span>
            <span>Skills Unlocked: 3/6</span>
          </div>
          <div className="mt-3">
            <Badge className="bg-accent text-accent-foreground">Apprentice Occlumens</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;