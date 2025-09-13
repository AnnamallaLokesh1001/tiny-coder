import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, Brain, Heart, Star } from "lucide-react";

// Mock data - in a real app, this would come from your database
const mockData = {
  weeklyAverage: 3.8,
  streak: 7,
  totalEntries: 15,
  moodTrend: [3, 4, 3, 5, 4, 4, 4], // Last 7 days
  topFactors: [
    { name: "Sleep", impact: 85 },
    { name: "Exercise", impact: 72 },
    { name: "Study Stress", impact: 68 },
  ],
  recommendations: [
    {
      title: "Maintain Your Sleep Schedule",
      description: "Your mood improves significantly with consistent sleep patterns.",
      type: "positive"
    },
    {
      title: "Consider Meditation",
      description: "Based on your stress levels, 10 minutes of daily meditation could help.",
      type: "suggestion"
    },
    {
      title: "You're Doing Great!",
      description: "7-day streak! Your consistent check-ins show real commitment to your wellbeing.",
      type: "achievement"
    }
  ]
};

const getMoodColor = (level: number) => {
  if (level >= 4.5) return "text-wellness-excellent";
  if (level >= 3.5) return "text-wellness-good";
  if (level >= 2.5) return "text-wellness-okay";
  if (level >= 1.5) return "text-wellness-poor";
  return "text-wellness-terrible";
};

const getMoodLabel = (level: number) => {
  if (level >= 4.5) return "Excellent";
  if (level >= 3.5) return "Good";
  if (level >= 2.5) return "Okay";
  if (level >= 1.5) return "Poor";
  return "Needs Attention";
};

export default function WellnessDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Weekly Overview */}
      <Card className="md:col-span-2 lg:col-span-3 bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Wellness Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getMoodColor(mockData.weeklyAverage)}`}>
                {mockData.weeklyAverage.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Average Mood</p>
              <Badge variant="secondary" className="mt-1">
                {getMoodLabel(mockData.weeklyAverage)}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {mockData.streak}
              </div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <Badge variant="default" className="mt-1">
                <Star className="h-3 w-3 mr-1" />
                Keep it up!
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {mockData.totalEntries}
              </div>
              <p className="text-sm text-muted-foreground">Total Check-ins</p>
              <Badge variant="outline" className="mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                This month
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">7-Day Mood Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.moodTrend.map((mood, index) => {
              const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-8">{day}</span>
                  <div className="flex-1 mx-3">
                    <Progress value={mood * 20} className="h-2" />
                  </div>
                  <span className={`text-sm font-medium ${getMoodColor(mood)}`}>
                    {mood}.0
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Wellness Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.topFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{factor.name}</span>
                  <span className="text-muted-foreground">{factor.impact}% impact</span>
                </div>
                <Progress value={factor.impact} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            Wellness Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.recommendations.map((rec, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
                <Badge 
                  variant={rec.type === 'achievement' ? 'default' : 'secondary'} 
                  className="mt-2 text-xs"
                >
                  {rec.type === 'achievement' && <Heart className="h-3 w-3 mr-1" />}
                  {rec.type === 'positive' ? 'Keep Going' : 
                   rec.type === 'achievement' ? 'Achievement' : 'Suggestion'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}