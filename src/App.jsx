import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HealthTracker from './components/HealthTracker';
import ProductivityTracker from './components/ProductivityTracker';
import LearningTracker from './components/LearningTracker';
import HabitsTracker from './components/HabitsTracker';
import AICoach from './components/AICoach';
import AIBlueprint from './components/AIBlueprint';
import MonthlyAnalysis from './components/MonthlyAnalysis';
import Community from './components/Community';
import Profile from './components/Profile';

import { 
  INITIAL_USER_PROFILE, 
  INITIAL_HEALTH_DATA, 
  INITIAL_PRODUCTIVITY_DATA, 
  INITIAL_LEARNING_DATA, 
  INITIAL_HABITS,
  DEFAULT_MORNING_PLAN 
} from './data/defaultUserData';

export default function App() {
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [healthData, setHealthData] = useState(INITIAL_HEALTH_DATA);
  const [productivityData, setProductivityData] = useState(INITIAL_PRODUCTIVITY_DATA);
  const [learningData, setLearningData] = useState(INITIAL_LEARNING_DATA);
  const [habitsData, setHabitsData] = useState(INITIAL_HABITS);
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [morningPlan, setMorningPlan] = useState(DEFAULT_MORNING_PLAN);

  // Helper to add XP and handle level up thresholds
  const addXp = (amount) => {
    setUserProfile(prev => {
      const currentXp = prev.gamification.xp + amount;
      let newLvl = prev.gamification.level;
      let newTitle = prev.gamification.levelTitle;

      // Thresholds:
      // Level 1: 0 - 500
      // Level 2: 501 - 1500
      // Level 3: 1501 - 3000
      // Level 4: 3001 - 5000
      // Level 5: 5001+
      if (currentXp > 5000 && prev.gamification.level < 5) {
        newLvl = 5;
        newTitle = "Elite";
      } else if (currentXp > 3000 && prev.gamification.level < 4) {
        newLvl = 4;
        newTitle = "Achiever";
      } else if (currentXp > 1500 && prev.gamification.level < 3) {
        newLvl = 3;
        newTitle = "Performer";
      } else if (currentXp > 500 && prev.gamification.level < 2) {
        newLvl = 2;
        newTitle = "Explorer";
      }

      return {
        ...prev,
        gamification: {
          ...prev.gamification,
          xp: currentXp,
          level: newLvl,
          levelTitle: newTitle
        }
      };
    });
  };

  // Complete onboarding
  const handleCompleteOnboarding = (formData) => {
    setUserProfile(prev => ({
      ...prev,
      isOnboarded: true,
      personalInfo: {
        ...prev.personalInfo,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        country: formData.country,
        profession: formData.profession,
        targetCareer: formData.targetCareer
      },
      currentSituation: {
        weight: formData.weight,
        targetWeight: formData.targetWeight,
        studyHours: formData.studyHours,
        sleepDuration: formData.sleepDuration,
        fitnessLevel: formData.fitnessLevel,
        biggestChallenge: formData.biggestChallenge
      }
    }));
    
    // Immediately set active view to Blueprint so they can examine their AI generated roadmap!
    setActiveTab('blueprint');
    setShowOnboarding(false);
    addXp(150); // Welcome XP bonus
  };

  // Share checkbox click between Dashboard and Productivity lists
  const handleToggleTaskCheck = (taskId) => {
    setProductivityData(prev => {
      const updated = prev.tasks.map(t => {
        if (t.id === taskId) {
          const newDone = !t.done;
          if (newDone) {
            addXp(40);
          }
          return { ...t, done: newDone };
        }
        return t;
      });
      return { ...prev, tasks: updated };
    });
  };

  const resetToLanding = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setHealthData(INITIAL_HEALTH_DATA);
    setProductivityData(INITIAL_PRODUCTIVITY_DATA);
    setLearningData(INITIAL_LEARNING_DATA);
    setHabitsData(INITIAL_HABITS);
    setShowOnboarding(false);
    setActiveTab('dashboard');
  };

  // Views Router
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            userProfile={userProfile} 
            healthData={healthData} 
            productivityData={productivityData}
            habitsData={habitsData}
            setActiveTab={setActiveTab}
            morningPlan={morningPlan}
            toggleTaskCheck={handleToggleTaskCheck}
          />
        );
      case 'blueprint':
        return <AIBlueprint userProfile={userProfile} />;
      case 'health':
        return (
          <HealthTracker 
            healthData={healthData} 
            setHealthData={setHealthData} 
            addXp={addXp} 
          />
        );
      case 'productivity':
        return (
          <ProductivityTracker 
            productivityData={productivityData} 
            setProductivityData={setProductivityData} 
            addXp={addXp} 
          />
        );
      case 'learning':
        return (
          <LearningTracker 
            learningData={learningData} 
            setLearningData={setLearningData} 
            addXp={addXp} 
          />
        );
      case 'habits':
        return (
          <HabitsTracker 
            habitsData={habitsData} 
            setHabitsData={setHabitsData} 
            addXp={addXp} 
          />
        );
      case 'coach':
        return (
          <AICoach 
            userProfile={userProfile} 
            healthData={healthData} 
            productivityData={productivityData}
            habitsData={habitsData}
            learningData={learningData}
          />
        );
      case 'monthly':
        return <MonthlyAnalysis userProfile={userProfile} />;
      case 'community':
        return <Community addXp={addXp} />;
      case 'profile':
        return <Profile userProfile={userProfile} />;
      default:
        return <div style={{ padding: '30px' }}>Tab coming soon!</div>;
    }
  };

  // If not logged/onboarded, show Landing/Onboarding
  if (!userProfile.isOnboarded) {
    if (showOnboarding) {
      return <Onboarding onComplete={handleCompleteOnboarding} />;
    }
    return (
      <LandingPage 
        onStartJourney={() => setShowOnboarding(true)} 
        onTryCoach={() => { setShowOnboarding(true); }} 
      />
    );
  }

  // Logged in Workspace shell
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile} 
        onLogout={resetToLanding}
      />

      {/* Main Workspace Frame */}
      <div style={{ marginLeft: '260px', flex: 1, background: '#0F172A', minHeight: '100vh' }}>
        {renderTabContent()}
      </div>

    </div>
  );
}
