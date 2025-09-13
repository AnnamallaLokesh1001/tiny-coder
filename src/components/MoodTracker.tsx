import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Smile, Meh, Frown, Heart, Brain, Coffee, Moon } from "lucide-react";

interface MoodEntry {
  mood: string;
  level: number;
  factors: string[];
  notes: string;
  timestamp: Date;
}

const moods = [
  { name: "Excellent", level: 5, color: "wellness-excellent", icon: Heart },
  { name: "Good", level: 4, color: "wellness-good", icon: Smile },
  { name: "Okay", level: 3, color: "wellness-okay", icon: Meh },
  { name: "Poor", level: 2, color: "wellness-poor", icon: Frown },
  { name: "Terrible", level: 1, color: "wellness-terrible", icon: Brain },
];

const factors = [
  { name: "Sleep", icon: Moon },
  { name: "Exercise", icon: Heart },
  { name: "Study Stress", icon: Brain },
  { name: "Social", icon: Smile },
  { name: "Caffeine", icon: Coffee },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select your mood",
        description: "Choose how you're feeling today to continue.",
        variant: "destructive",
      });
      return;
    }

    const entry: MoodEntry = {
      mood: moods.find(m => m.level === selectedMood)?.name || "",
      level: selectedMood,
      factors: selectedFactors,
      notes,
      timestamp: new Date(),
    };

    // In a real app, this would save to a database
    console.log("Mood entry:", entry);
    
    toast({
      title: "Mood logged successfully!",
      description: "Thank you for checking in. Keep taking care of yourself.",
    });

    // Reset form
    setSelectedMood(null);
    setSelectedFactors([]);
    setNotes("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold">Daily Wellness Check-in</CardTitle>
        <p className="text-white/80">How are you feeling today?</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Mood Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Your Current Mood</h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <Button
                  key={mood.level}
                  variant={selectedMood === mood.level ? "default" : "outline"}
                  className={`h-16 flex-col gap-2 ${
                    selectedMood === mood.level 
                      ? "bg-primary text-white border-primary" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedMood(mood.level)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs">{mood.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">What's affecting your mood?</h3>
          <div className="flex flex-wrap gap-2">
            {factors.map((factor) => {
              const IconComponent = factor.icon;
              const isSelected = selectedFactors.includes(factor.name);
              return (
                <Badge
                  key={factor.name}
                  variant={isSelected ? "default" : "secondary"}
                  className={`cursor-pointer px-3 py-2 text-sm ${
                    isSelected 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "hover:bg-secondary/80"
                  }`}
                  onClick={() => handleFactorToggle(factor.name)}
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {factor.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Notes (Optional)</h3>
          <Textarea
            placeholder="How was your day? Any thoughts you'd like to share..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-24"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-primary text-white hover:opacity-90 h-12 text-lg font-medium"
        >
          Log My Mood
        </Button>
      </CardContent>
    </Card>
  );
}