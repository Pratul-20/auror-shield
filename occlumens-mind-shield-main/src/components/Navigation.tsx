import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2, 
  TreePine, 
  Eye, 
  Shield, 
  Brain, 
  Newspaper,
  Home,
  Flame
} from "lucide-react";

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  userHouse?: string;
  userType?: string;
}

const screens = [
  { id: "home", label: "Dashboard", icon: Home },
  { id: "challenges", label: "Daily Challenges", icon: Flame, urgent: true },
  { id: "skill-tree", label: "Skill Tree", icon: TreePine },
  { id: "simulator", label: "Legilimency", icon: Eye },
  { id: "shield", label: "Patronus Shield", icon: Shield },
  { id: "map", label: "Marauder's Map", icon: Brain },
  { id: "prophet", label: "Daily Prophet", icon: Newspaper }
];

export default function Navigation({ activeScreen, onScreenChange, userHouse, userType }: NavigationProps) {
  return (
    <Card className="bg-card/95 backdrop-blur border-accent/20 shadow-elegant mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6 text-accent glow-magical" />
            <h1 className="text-xl font-bold text-gradient-magical">Auror Shield</h1>
          </div>
          
          {userHouse && userType && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-accent/50">
                {userHouse}
              </Badge>
              <Badge variant="outline" className="border-accent/50">
                {userType}
              </Badge>
            </div>
          )}
        </div>
        
        <nav className="flex flex-wrap gap-2">
          {screens.map((screen) => {
            const IconComponent = screen.icon;
            const isActive = activeScreen === screen.id;
            
            return (
              <div key={screen.id} className="relative">
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onScreenChange(screen.id)}
                  className={`flex items-center gap-2 transition-magical ${
                    isActive 
                      ? "bg-accent text-accent-foreground glow-primary" 
                      : "border-accent/30 hover:border-accent/60 hover:bg-accent/10"
                  } ${screen.urgent && !isActive ? 'glow-magical' : ''}`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{screen.label}</span>
                </Button>
                {screen.urgent && !isActive && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    !
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </Card>
  );
}