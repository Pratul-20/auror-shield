import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Brain, Wand2, Eye, Target, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-subtle flex items-center justify-center overflow-hidden">
      {/* Floating magical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-float-magical">
          <Shield className="w-8 h-8 text-accent opacity-30" />
        </div>
        <div className="absolute top-40 right-32 animate-float-magical" style={{ animationDelay: '1s' }}>
          <Brain className="w-6 h-6 text-primary-glow opacity-40" />
        </div>
        <div className="absolute bottom-32 left-40 animate-float-magical" style={{ animationDelay: '2s' }}>
          <Wand2 className="w-7 h-7 text-accent opacity-25" />
        </div>
        <div className="absolute top-60 left-1/2 animate-float-magical" style={{ animationDelay: '0.5s' }}>
          <Eye className="w-5 h-5 text-primary-glow opacity-35" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading with magical gradient */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gradient-magical">Occlumens</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-4 text-foreground opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Defense of the Mind Against Digital Manipulation
          </p>
          
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Train like a wizard to shield your mind from phishing, scams, and social engineering. 
            Build immunity against digital dark arts through gamified cybersecurity training.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:glow-primary transition-glow text-lg px-8 py-6 shadow-elegant"
            >
              <Shield className="w-5 h-5 mr-2" />
              Begin Occlumency Training
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-magical text-lg px-8 py-6"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Feature cards preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:glow-magical transition-glow group">
              <div className="mb-4 flex justify-center">
                <Target className="w-10 h-10 text-accent group-hover:animate-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Skill Tree Training</h3>
              <p className="text-muted-foreground">Level up your defenses through interactive challenges</p>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:glow-magical transition-glow group">
              <div className="mb-4 flex justify-center">
                <Brain className="w-10 h-10 text-accent group-hover:animate-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mind Mapping</h3>
              <p className="text-muted-foreground">Visualize your vulnerabilities and track progress</p>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:glow-magical transition-glow group">
              <div className="mb-4 flex justify-center">
                <Users className="w-10 h-10 text-accent group-hover:animate-glow" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community Defense</h3>
              <p className="text-muted-foreground">Join the Cyber Aurors protecting the digital realm</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;