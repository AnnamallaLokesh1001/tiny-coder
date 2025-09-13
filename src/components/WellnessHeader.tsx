import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, User } from "lucide-react";

interface WellnessHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function WellnessHeader({ activeTab, onTabChange }: WellnessHeaderProps) {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8" />
            <h1 className="text-4xl font-bold">WellnessTracker</h1>
          </div>
          <p className="text-xl text-white/90 mb-2">Your mental health companion</p>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{getCurrentDate()}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'checkin' ? 'default' : 'ghost'}
                onClick={() => onTabChange('checkin')}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Daily Check-in
              </Button>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onTabChange('dashboard')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                My Dashboard
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                Student Portal
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}