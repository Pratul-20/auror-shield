import { useState } from "react";
import OnboardingScreen from "@/components/OnboardingScreen";
import Navigation from "@/components/Navigation";
import DashboardHome from "@/components/DashboardHome";
import SkillTree from "@/components/SkillTree";
import LegilimencySimulator from "@/components/LegilimencySimulator";
import PatronusShield from "@/components/PatronusShield";
import MarauderMap from "@/components/MarauderMap";
import DailyProphet from "@/components/DailyProphet";
import DailyChallenges from "@/components/DailyChallenges";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userHouse, setUserHouse] = useState("");
  const [userType, setUserType] = useState("");
  const [activeScreen, setActiveScreen] = useState("home");

  const handleOnboardingComplete = (house: string, wizardType: string) => {
    setUserHouse(house);
    setUserType(wizardType);
    setIsOnboarded(true);
    
    // Apply house theme to document
    document.documentElement.className = `${house.toLowerCase()}-theme`;
  };

  if (!isOnboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "home":
        return <DashboardHome userHouse={userHouse} userType={userType} onNavigate={setActiveScreen} />;
      case "challenges":
        return <DailyChallenges onNavigate={setActiveScreen} />;
      case "skill-tree":
        return <SkillTree />;
      case "simulator":
        return <LegilimencySimulator />;
      case "shield":
        return <PatronusShield />;
      case "map":
        return <MarauderMap />;
      case "prophet":
        return <DailyProphet />;
      default:
        return <DashboardHome userHouse={userHouse} userType={userType} onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-7xl mx-auto">
        <Navigation 
          activeScreen={activeScreen}
          onScreenChange={setActiveScreen}
          userHouse={userHouse}
          userType={userType}
        />
        {renderActiveScreen()}
      </div>
    </div>
  );
};

export default Index;
