// src/pages/BreathingExercises.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Wind, Play, Clock, Calendar, Heart, Brain, Info, Award, Check } from 'lucide-react';
import BreathingHistory from '../components/breathing/BreathingHistory';
import { addBreathingSession, updateBreathingSession } from '@/lib/breathing-storage';

// Define breathing exercise type
interface BreathingExercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Relaxation' | 'Focus' | 'Energy' | 'Sleep';
  thumbnail: string;
  videoSrc: string;
  benefits: string[];
  instructions: string[];
}

// Sample breathing exercises data
const breathingExercises: BreathingExercise[] = [
  {
    id: "box-breathing",
    title: "Box Breathing",
    description: "A simple yet powerful technique to reduce stress and improve focus.",
    duration: "5 min",
    level: "Beginner",
    category: "Relaxation",
    thumbnail: "/images/breathing/box-breathing.jpg",
    videoSrc: "https://example.com/box-breathing.mp4",
    benefits: [
      "Reduces stress and anxiety",
      "Improves concentration",
      "Helps manage emotions",
      "Can be done anywhere"
    ],
    instructions: [
      "Sit in a comfortable position with your back straight",
      "Breathe in through your nose for 4 seconds",
      "Hold your breath for 4 seconds",
      "Exhale through your mouth for 4 seconds",
      "Hold your breath for 4 seconds",
      "Repeat for 5 minutes or until calm"
    ]
  },
  {
    id: "4-7-8-breathing",
    title: "4-7-8 Breathing",
    description: "A tranquilizing breath that helps reduce anxiety and fall asleep.",
    duration: "8 min",
    level: "Beginner",
    category: "Sleep",
    thumbnail: "/images/breathing/4-7-8-breathing.jpg",
    videoSrc: "https://example.com/4-7-8-breathing.mp4",
    benefits: [
      "Helps you fall asleep faster",
      "Reduces anxiety",
      "Manages cravings and impulses",
      "Decreases stress"
    ],
    instructions: [
      "Sit or lie in a comfortable position",
      "Place the tip of your tongue against the roof of your mouth, behind your front teeth",
      "Exhale completely through your mouth",
      "Close your mouth and inhale through your nose for 4 seconds",
      "Hold your breath for 7 seconds",
      "Exhale completely through your mouth for 8 seconds",
      "Repeat for 4 cycles"
    ]
  },
  {
    id: "diaphragmatic-breathing",
    title: "Diaphragmatic Breathing",
    description: "Deep belly breathing that activates the parasympathetic nervous system.",
    duration: "10 min",
    level: "Intermediate",
    category: "Relaxation",
    thumbnail: "/images/breathing/diaphragmatic-breathing.jpg",
    videoSrc: "https://example.com/diaphragmatic-breathing.mp4",
    benefits: [
      "Reduces stress",
      "Lowers heart rate",
      "Lowers blood pressure",
      "Improves core muscle stability"
    ],
    instructions: [
      "Lie on your back with knees bent or sit comfortably",
      "Place one hand on your chest and the other on your abdomen",
      "Breathe in slowly through your nose, feeling your abdomen rise",
      "Keep your chest relatively still",
      "Exhale slowly through pursed lips",
      "Repeat for 5-10 minutes"
    ]
  },
  {
    id: "alternate-nostril",
    title: "Alternate Nostril Breathing",
    description: "Balances your nervous system and improves focus.",
    duration: "7 min",
    level: "Intermediate",
    category: "Focus",
    thumbnail: "/images/breathing/alternate-nostril.jpg",
    videoSrc: "https://example.com/alternate-nostril.mp4",
    benefits: [
      "Improves focus and attention",
      "Balances the nervous system",
      "Reduces stress and anxiety",
      "Promotes mental clarity"
    ],
    instructions: [
      "Sit comfortably with your back straight",
      "Rest your left hand on your lap",
      "Place your right thumb against your right nostril",
      "Inhale through your left nostril",
      "Close your left nostril with your ring finger",
      "Open your right nostril and exhale",
      "Inhale through your right nostril",
      "Close your right nostril and exhale through your left",
      "Continue alternating for 5-7 minutes"
    ]
  },
  {
    id: "energizing-breath",
    title: "Energizing Breath",
    description: "Revitalizing breathing technique to boost energy and alertness.",
    duration: "3 min",
    level: "Beginner",
    category: "Energy",
    thumbnail: "/images/breathing/energizing-breath.jpg",
    videoSrc: "https://example.com/energizing-breath.mp4",
    benefits: [
      "Increases energy and alertness",
      "Improves focus",
      "Decreases feelings of sluggishness",
      "Prepares mind for challenging tasks"
    ],
    instructions: [
      "Sit comfortably with your back straight",
      "Take a quick, strong inhale through your nose",
      "Immediately exhale forcefully through your nose",
      "Continue rapid breathing for 10-15 seconds",
      "Rest and breathe normally for 15 seconds",
      "Repeat for 2-3 minutes"
    ]
  },
  {
    id: "relaxing-breath",
    title: "Relaxing Breath",
    description: "Calming technique to prepare for meditation or sleep.",
    duration: "12 min",
    level: "Advanced",
    category: "Sleep",
    thumbnail: "/images/breathing/relaxing-breath.jpg",
    videoSrc: "https://example.com/relaxing-breath.mp4",
    benefits: [
      "Promotes deep relaxation",
      "Prepares mind for meditation",
      "Helps with insomnia",
      "Reduces racing thoughts"
    ],
    instructions: [
      "Lie down or sit in a comfortable position",
      "Close your eyes and relax your body",
      "Breathe deeply through your nose, filling your abdomen",
      "Exhale slowly, making your exhale longer than your inhale",
      "Focus on the sound of your breath",
      "Continue for 10-15 minutes"
    ]
  }
];

const BreathingExercises: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentView, setCurrentView] = useState<'exercises' | 'history'>('exercises');
  const [sessionInProgress, setSessionInProgress] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  // Function to filter exercises based on active tab
  const getFilteredExercises = () => {
    if (activeTab === "all") return breathingExercises;
    return breathingExercises.filter(exercise => 
      activeTab === "beginner" ? exercise.level === "Beginner" :
      activeTab === "intermediate" ? exercise.level === "Intermediate" :
      activeTab === "advanced" ? exercise.level === "Advanced" :
      activeTab === "relaxation" ? exercise.category === "Relaxation" :
      activeTab === "focus" ? exercise.category === "Focus" :
      activeTab === "energy" ? exercise.category === "Energy" :
      activeTab === "sleep" ? exercise.category === "Sleep" :
      true
    );
  };
  
  // Handle exercise selection and dialog opening
  const handleExerciseSelect = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setIsDialogOpen(true);
    setSessionCompleted(false);
  };

  // Start a session
  const startSession = () => {
    if (!selectedExercise) return;
    
    setSessionInProgress(selectedExercise.id);
    setSessionStartTime(new Date());
    
    // Create a session record with completed=false initially
    const now = new Date();
    addBreathingSession({
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.title,
      date: now.toISOString().split('T')[0],
      timestamp: now.toISOString(),
      duration: 0, // Will be updated when completed
      completed: false
    });
  };
  
  // Complete a session
  const completeSession = () => {
    if (!selectedExercise || !sessionStartTime) return;
    
    const now = new Date();
    const durationInSeconds = Math.round((now.getTime() - sessionStartTime.getTime()) / 1000);
    
    // Get the estimated duration in minutes from the exercise
    const estimatedMinutes = parseInt(selectedExercise.duration.split(' ')[0]);
    
    // Use either the actual time or estimated time, whichever is greater
    // This prevents very short sessions if user completes too quickly
    const finalDuration = Math.max(durationInSeconds, estimatedMinutes * 60);
    
    // Update the session in storage
    const recentSessions = require('@/lib/breathing-storage').getRecentSessions(1);
    if (recentSessions.length > 0) {
      const session = recentSessions[0];
      updateBreathingSession({
        ...session,
        duration: finalDuration,
        completed: true
      });
    }
    
    setSessionCompleted(true);
    setSessionInProgress(null);
    setSessionStartTime(null);
    
    // Auto-close dialog after a short delay
    setTimeout(() => {
      setIsDialogOpen(false);
      
      // Reset states when dialog closes
      setTimeout(() => {
        setSessionCompleted(false);
      }, 300);
    }, 2000);
  };
  
  // Get badge color based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Relaxation': 
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Focus': 
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Energy': 
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'Sleep': 
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      default: 
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  // Get badge color based on level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': 
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Intermediate': 
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Advanced': 
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Wind className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Breathing Exercises</h2>
            <p className="text-gray-600">Discover techniques to reduce stress and enhance wellbeing</p>
          </div>
        </div>
      </div>
      
      {/* View selector tabs - similar to Stress Tracker */}
      <div>
        <div className="flex space-x-2">
          <Button
            variant={currentView === 'exercises' ? 'default' : 'outline'}
            onClick={() => setCurrentView('exercises')}
          >
            View Exercises
          </Button>
          <Button
            variant={currentView === 'history' ? 'default' : 'outline'}
            onClick={() => setCurrentView('history')}
          >
            View History
          </Button>
          <div className="flex-grow"></div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      {/* Content based on current view */}
      {currentView === 'exercises' ? (
        <div className="space-y-6">
          {/* Filter Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-6">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 h-9"
              >
                All Exercises
              </TabsTrigger>
              
              <TabsTrigger 
                value="beginner"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Beginner
              </TabsTrigger>
              
              <TabsTrigger 
                value="intermediate"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Intermediate
              </TabsTrigger>
              
              <TabsTrigger 
                value="advanced"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Advanced
              </TabsTrigger>
              
              <TabsTrigger 
                value="relaxation"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Relaxation
              </TabsTrigger>
              
              <TabsTrigger 
                value="focus"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Focus
              </TabsTrigger>
              
              <TabsTrigger 
                value="energy"
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Energy
              </TabsTrigger>
              
              <TabsTrigger 
                value="sleep"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-4 h-9"
              >
                Sleep
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredExercises().map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="relative">
                      {/* Thumbnail image */}
                      <img 
                        src={exercise.thumbnail} 
                        alt={exercise.title} 
                        className="w-full h-48 object-cover"
                      />
                      
                      {/* Play button overlay */}
                      <button 
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleExerciseSelect(exercise)}
                      >
                        <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center">
                          <Play className="h-8 w-8 text-primary ml-1" />
                        </div>
                      </button>
                      
                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {exercise.duration}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex gap-2 mb-2">
                        <Badge className={getLevelColor(exercise.level)} variant="outline">
                          {exercise.level}
                        </Badge>
                        <Badge className={getCategoryColor(exercise.category)} variant="outline">
                          {exercise.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    
                    <CardFooter>
                      <Button 
                        onClick={() => handleExerciseSelect(exercise)}
                        className="w-full gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Start Exercise
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Empty state if no exercises match the filter */}
              {getFilteredExercises().length === 0 && (
                <div className="text-center py-12">
                  <Wind className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No exercises found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    No breathing exercises match your current filter. Try selecting a different category or level.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Additional information card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Why Breathing Exercises Matter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Breathing exercises are powerful tools for managing stress and improving mental health. 
                Controlled breathing activates your parasympathetic nervous system, which helps counter 
                the fight-or-flight response and reduces stress hormones in your body.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                  <Heart className="h-8 w-8 text-red-500 mb-2" />
                  <h3 className="font-medium mb-1">Physical Benefits</h3>
                  <p className="text-sm text-muted-foreground">
                    Lowers blood pressure, reduces heart rate, improves immune function
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                  <Brain className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="font-medium mb-1">Mental Benefits</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduces anxiety, improves focus, enhances emotional regulation
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium mb-1">Long-term Benefits</h3>
                  <p className="text-sm text-muted-foreground">
                    Builds resilience to stress, improves sleep quality, increases mindfulness
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // History view
        <BreathingHistory onStartSession={() => setCurrentView('exercises')} />
      )}
      
      {/* Exercise Video Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
            // Reset states when dialog closes
            setSessionCompleted(false);
            setSessionInProgress(null);
            setSessionStartTime(null);
            }
        }}
        >
        <DialogContent className="max-w-4xl w-full">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedExercise.title}</DialogTitle>
                <DialogDescription>
                  {selectedExercise.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                {/* Video placeholder */}
                <div className="w-full aspect-video bg-gray-200 rounded-md overflow-hidden relative">
                  <img 
                    src={selectedExercise.thumbnail} 
                    alt={selectedExercise.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {sessionInProgress ? (
                      <div className="text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                          <div className="h-10 w-10 rounded-full bg-primary animate-pulse"></div>
                        </div>
                        <p className="text-white text-lg font-medium">Exercise in Progress</p>
                        {!sessionCompleted ? (
                          <Button 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={completeSession}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Complete
                          </Button>
                        ) : (
                          <div className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
                            <Check className="mr-2 h-5 w-5" />
                            Completed!
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-white/80 flex items-center justify-center mx-auto">
                          <Play className="h-10 w-10 text-primary ml-1" />
                        </div>
                        <p className="text-white">Video placeholder - Actual video will be added later</p>
                        
                        <Button 
                          onClick={startSession}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Begin Exercise
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Benefits */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedExercise.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-primary text-xs">✓</span>
                          </div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Instructions */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Instructions
                    </h3>
                    <ol className="space-y-2 list-decimal list-inside">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm pl-1">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Pro Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        Consistency is key with breathing exercises. Even 5 minutes daily can significantly 
                        reduce stress levels and improve your overall wellbeing over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BreathingExercises;