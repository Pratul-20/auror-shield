import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, AlertTriangle, TrendingUp, Shield, Eye, Clock } from "lucide-react";

interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  category: "alert" | "trend" | "tip" | "update";
  urgency: "low" | "medium" | "high";
  date: string;
  readTime: string;
  details?: string;
}

const articles: NewsArticle[] = [
  {
    id: "1",
    headline: "MINISTRY ALERT: Polyjuice Potion Scam Surge Detected",
    summary: "Dark wizards are impersonating bank officials via email, requesting urgent account verification. Citizens advised to verify all financial communications through official channels.",
    category: "alert",
    urgency: "high",
    date: "Today",
    readTime: "2 min",
    details: "The Ministry of Digital Security has detected a 300% increase in sophisticated impersonation attacks. Scammers are using official-looking email templates and creating fake websites that perfectly mimic legitimate banking portals. Always verify requests by calling your bank directly using the number on your official statements."
  },
  {
    id: "2",
    headline: "Authority Exploitation Spells on the Rise",
    summary: "Cyber criminals increasingly pose as government officials, IT departments, and company executives to bypass logical thinking and exploit authority bias.",
    category: "trend",
    urgency: "medium",
    date: "Yesterday",
    readTime: "3 min",
    details: "Research shows that 67% of successful social engineering attacks exploit authority bias. Attackers often claim to be from IT support, management, or government agencies. Remember: legitimate authorities provide multiple verification methods and never pressure you to act immediately."
  },
  {
    id: "3",
    headline: "Defense Charm Update: New Patronus Shields Available",
    summary: "Enhanced protection spells now detect deepfake voice calls and AI-generated phishing content. All Aurors recommended to update their defense systems.",
    category: "update",
    urgency: "low",
    date: "2 days ago",
    readTime: "1 min",
    details: "The latest Patronus Shield update includes AI-powered detection for synthetic voices and deepfake video calls. The system can now analyze speech patterns and visual inconsistencies to alert users of potential deception."
  },
  {
    id: "4",
    headline: "Muggle Romance Scam Ring Exposed by Auror Division",
    summary: "International operation using dating platforms to extract money from victims through emotional manipulation. 'Love bombing' spells identified as primary tactic.",
    category: "alert",
    urgency: "medium",
    date: "3 days ago",
    readTime: "4 min",
    details: "A coordinated investigation revealed a network of fake dating profiles designed to establish emotional connections before requesting financial assistance. Warning signs include: professing love quickly, avoiding video calls, always having emergencies requiring money, and grammar/language inconsistencies."
  },
  {
    id: "5",
    headline: "How to Strengthen Your Occlumency Against Urgency Curses",
    summary: "Master Auror Longbottom shares advanced techniques for resisting time-pressure manipulation tactics commonly used in phishing attempts.",
    category: "tip",
    urgency: "low",
    date: "1 week ago",
    readTime: "5 min",
    details: "The Three-Breath Defense: When faced with urgent requests, take three deep breaths and ask yourself: 1) Is this communication from a verified source? 2) Can I verify this through an independent channel? 3) What would happen if I wait 10 minutes before responding? Most legitimate urgent matters can wait for proper verification."
  }
];

export default function DailyProphet() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "alert": return AlertTriangle;
      case "trend": return TrendingUp;
      case "tip": return Shield;
      case "update": return Eye;
      default: return Newspaper;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "alert": return "text-red-400 bg-red-900/20 border-red-500/50";
      case "trend": return "text-blue-400 bg-blue-900/20 border-blue-500/50";
      case "tip": return "text-green-400 bg-green-900/20 border-green-500/50";
      case "update": return "text-purple-400 bg-purple-900/20 border-purple-500/50";
      default: return "text-gray-400 bg-gray-900/20 border-gray-500/50";
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Newspaper className="h-8 w-8 text-accent glow-magical" />
          <h1 className="text-4xl font-bold text-gradient-magical">The Daily Prophet</h1>
        </div>
        <p className="text-xl text-muted-foreground italic">
          "Wizarding World's Cybersecurity Chronicle"
        </p>
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="border-accent/50">
            Digital Defense Edition
          </Badge>
          <Badge variant="outline" className="border-accent/50 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated Daily
          </Badge>
        </div>
      </div>

      {selectedArticle ? (
        <Card className="bg-card/95 border-accent/20 shadow-elegant">
          <CardHeader className="border-b border-accent/20">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={getUrgencyBadge(selectedArticle.urgency)}>
                    {selectedArticle.urgency.toUpperCase()}
                  </Badge>
                  <Badge className={getCategoryColor(selectedArticle.category)}>
                    {selectedArticle.category.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-2xl leading-tight">{selectedArticle.headline}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime} read</span>
                </div>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setSelectedArticle(null)}
                className="border-accent/50"
              >
                Back to Headlines
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                {selectedArticle.summary}
              </p>
              <div className="bg-muted/20 p-4 rounded-lg border border-accent/10">
                <p className="text-foreground leading-relaxed">
                  {selectedArticle.details}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Featured Article */}
          <Card 
            className="bg-gradient-primary border-accent/20 shadow-elegant cursor-pointer transition-magical hover:shadow-elegant"
            onClick={() => setSelectedArticle(articles[0])}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">BREAKING</Badge>
                    <span className="text-sm text-primary-foreground/70">{articles[0].date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
                    {articles[0].headline}
                  </h2>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    {articles[0].summary}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                    <span>{articles[0].readTime} read</span>
                    <span>•</span>
                    <span>Click to read more</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(1).map((article) => {
              const IconComponent = getCategoryIcon(article.category);
              return (
                <Card 
                  key={article.id}
                  className="bg-card/95 border-accent/20 shadow-elegant cursor-pointer transition-magical hover:shadow-elegant hover:border-accent/40"
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${getCategoryColor(article.category)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <Badge variant={getUrgencyBadge(article.urgency)} className="text-xs">
                        {article.urgency}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <h3 className="font-bold text-foreground leading-tight mb-2 line-clamp-2">
                      {article.headline}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      <span>{article.readTime} read</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Subscription CTA */}
          <Card className="bg-gradient-magical border-accent/20 shadow-elegant text-center">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Vigilant, Stay Informed
              </h3>
              <p className="text-white/80 mb-4">
                Get daily updates on the latest digital threats and defense strategies
              </p>
              <Button 
                className="bg-white text-primary hover:bg-white/90 glow-primary"
                size="lg"
              >
                Subscribe to Daily Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
