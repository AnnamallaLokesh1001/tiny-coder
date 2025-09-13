import { useState } from "react";
import WellnessHeader from "@/components/WellnessHeader";
import MoodTracker from "@/components/MoodTracker";
import WellnessDashboard from "@/components/WellnessDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState('checkin');

  return (
    <div className="min-h-screen bg-background">
      <WellnessHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'checkin' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                How are you feeling today?
              </h2>
              <p className="text-muted-foreground">
                Take a moment to check in with yourself. Your mental health matters, and tracking your mood helps build awareness and resilience.
              </p>
            </div>
            <MoodTracker />
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Your Wellness Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Track your progress, discover patterns, and get personalized insights to support your mental health and wellbeing.
              </p>
            </div>
            <WellnessDashboard />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
