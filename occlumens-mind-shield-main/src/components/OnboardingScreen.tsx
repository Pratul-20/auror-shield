import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Shield, Sparkles, Crown } from "lucide-react";

const houses = [
  { name: "Gryffindor", color: "text-red-400", description: "Brave defenders against bold attacks" },
  { name: "Ravenclaw", color: "text-blue-400", description: "Wise analysts of complex schemes" },
  { name: "Hufflepuff", color: "text-yellow-400", description: "Patient guardians of digital ethics" },
  { name: "Slytherin", color: "text-green-400", description: "Cunning hunters of deception" }
];

const wizardTypes = [
  { name: "Muggle-born", icon: Sparkles, description: "New to digital defense, eager to learn" },
  { name: "Half-blood", icon: Shield, description: "Some experience with cyber threats" },
  { name: "Pure-blood", icon: Crown, description: "Veteran of digital warfare" }
];

interface OnboardingScreenProps {
  onComplete: (house: string, wizardType: string) => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [selectedHouse, setSelectedHouse] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    if (selectedHouse && selectedType) {
      onComplete(selectedHouse, selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-card/95 backdrop-blur border-accent/20 shadow-elegant">
        <CardContent className="p-8">
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Wand2 className="h-16 w-16 text-accent glow-magical" />
                </div>
                <h1 className="text-4xl font-bold text-gradient-magical">
                  Welcome to Auror Shield
                </h1>
                <p className="text-muted-foreground text-lg">
                  Defense of the Mind Against Digital Manipulation
                </p>
              </div>

              <div className="bg-gradient-primary p-6 rounded-lg border border-accent/20">
                <h2 className="text-2xl font-semibold mb-4 text-primary-foreground">Your Mission</h2>
                <p className="text-primary-foreground/90 leading-relaxed">
                  As a digital Auror, you will master the ancient art of Occlumency to shield your mind 
                  from psychological manipulation. Through spell-based challenges and magical training, 
                  you'll learn to detect phishing spells, resist urgency curses, and defend against 
                  the dark arts of social engineering.
                </p>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary transition-magical"
                size="lg"
              >
                Begin Your Training
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gradient-magical mb-2">
                  The Sorting Hat Awaits
                </h2>
                <p className="text-muted-foreground">Choose your Hogwarts house to determine your defensive specialization</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {houses.map((house) => (
                  <Card 
                    key={house.name}
                    className={`cursor-pointer transition-magical hover:shadow-elegant border-2 ${
                      selectedHouse === house.name 
                        ? 'border-accent glow-primary' 
                        : 'border-border hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedHouse(house.name)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className={`text-xl font-bold ${house.color} mb-2`}>{house.name}</h3>
                      <p className="text-sm text-muted-foreground">{house.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!selectedHouse}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gradient-magical mb-2">
                  Choose Your Heritage
                </h2>
                <p className="text-muted-foreground">Select your cybersecurity experience level</p>
              </div>

              <div className="space-y-4">
                {wizardTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Card 
                      key={type.name}
                      className={`cursor-pointer transition-magical hover:shadow-elegant border-2 ${
                        selectedType === type.name 
                          ? 'border-accent glow-primary' 
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedType(type.name)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <IconComponent className="h-8 w-8 text-accent" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleComplete}
                  disabled={!selectedType}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 glow-primary"
                >
                  Enter the Academy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}