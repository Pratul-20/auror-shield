import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Brain, Map, Newspaper, Users, Target, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Occlumency Skill Tree",
      description: "Level up your mental defenses through gamified training modules",
      details: ["Interactive micro-games", "Phishing detection challenges", "Psychology-based scenarios", "Progress visualization"],
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: Brain,
      title: "Legilimency Simulations", 
      description: "Face real-world threats in a safe, controlled environment",
      details: ["Authentic phishing emails", "Social media scams", "Impersonation attempts", "Real-time feedback"],
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20"
    },
    {
      icon: Shield,
      title: "Patronus Shields",
      description: "Real-time protection alerts while browsing the web",
      details: ["Suspicious link detection", "Scam website warnings", "Behavioral nudges", "Instant threat analysis"],
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/20"
    },
    {
      icon: Map,
      title: "Marauder's Map of Mind",
      description: "Visualize your psychological vulnerabilities and strengths",
      details: ["Authority bias tracking", "Emotional trigger mapping", "Personalized insights", "Weakness recommendations"],
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20"
    },
    {
      icon: Newspaper,
      title: "Daily Prophet Feed",
      description: "Stay updated on the latest digital threats and scam trends",
      details: ["Trending scam alerts", "Community insights", "Expert analysis", "Prevention tips"],
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20"
    },
    {
      icon: Users,
      title: "Cyber Auror Community",
      description: "Join a network of digital defenders sharing knowledge",
      details: ["House competitions", "Peer learning", "Threat reporting", "Collaborative defense"],
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 text-gradient-magical">
          Master the Arts of Digital Defense
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our comprehensive training system combines gamification with real-world cybersecurity awareness, 
          inspired by the magical world of Harry Potter to make learning engaging and memorable.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <Card 
              key={index}
              className={`p-8 transition-magical hover:glow-magical group ${feature.bg} backdrop-blur-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 flex justify-center">
                <div className={`p-4 rounded-full bg-background/10 group-hover:animate-glow transition-glow`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-foreground text-center">
                {feature.title}
              </h3>

              <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                {feature.description}
              </p>

              <div className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')}`} />
                    <span className="text-sm text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <Badge className={`${feature.bg} ${feature.color} border-0`}>
                  Interactive Training
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-20 text-center">
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/30">
            <div className="text-3xl font-bold text-accent mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Threat Recognition</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/30">
            <div className="text-3xl font-bold text-accent mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Trained Defenders</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/30">
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Scenario Types</div>
          </div>
          <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/30">
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Protection Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;