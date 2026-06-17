// Mock Database for LifeOS

export const INITIAL_USER_PROFILE = {
  isOnboarded: false,
  personalInfo: {
    name: "Aarav Sharma",
    age: 21,
    gender: "Male",
    country: "India",
    profession: "BCA Student",
    targetCareer: "AI Engineer",
  },
  currentSituation: {
    weight: 78, // in kg
    targetWeight: 70,
    studyHours: 4,
    sleepDuration: 6.5,
    fitnessLevel: "Beginner",
    biggestChallenge: "Procrastination & lack of structured roadmap",
  },
  gamification: {
    xp: 2450, // Level 3: Performer (1501 - 3000)
    level: 3,
    levelTitle: "Performer",
    badges: [
      { id: "code_warrior", name: "Code Warrior", icon: "Code", desc: "Coded 7 days in a row", unlockedAt: "2026-06-05" },
      { id: "hydro_hero", name: "Hydration Hero", icon: "Droplet", desc: "Met water intake goal for 2 weeks", unlockedAt: "2026-06-10" },
      { id: "focus_guru", name: "Focus Guru", icon: "Timer", desc: "Completed 20 Pomodoro sessions", unlockedAt: "2026-06-12" },
      { id: "bookworm", name: "Intellectual", icon: "BookOpen", desc: "Finished 3 books/modules", unlockedAt: "2026-06-14" },
    ],
    achievements: [
      { name: "First Step", desc: "Complete onboarding setup", status: "unlocked" },
      { name: "Consistent Runner", desc: "Maintain a 5-day habit streak", status: "unlocked" },
      { name: "Deep Focus", desc: "Log 4 hours of focused study in a day", status: "unlocked" },
      { name: "Perfect Health Week", desc: "Keep water and sleep targets for 7 days", status: "locked" },
    ]
  },
  lifeScoreHistory: [
    { month: "Jan", health: 65, productivity: 60, learning: 50, habits: 55, overall: 58 },
    { month: "Feb", health: 68, productivity: 65, learning: 58, habits: 60, overall: 63 },
    { month: "Mar", health: 70, productivity: 68, learning: 62, habits: 65, overall: 66 },
    { month: "Apr", health: 74, productivity: 70, learning: 70, habits: 75, overall: 72 },
    { month: "May", health: 78, productivity: 72, learning: 80, habits: 85, overall: 79 },
    { month: "Jun", health: 80, productivity: 75, learning: 85, habits: 90, overall: 83 } // current
  ]
};

export const INITIAL_HEALTH_DATA = {
  healthScore: 82,
  weightHistory: [
    { date: "May 01", weight: 81.0 },
    { date: "May 07", weight: 80.5 },
    { date: "May 14", weight: 80.1 },
    { date: "May 21", weight: 79.5 },
    { date: "May 28", weight: 79.0 },
    { date: "Jun 04", weight: 78.6 },
    { date: "Jun 11", weight: 78.0 },
    { date: "Jun 17", weight: 77.8 }
  ],
  waterLogs: [
    { day: "Mon", amount: 2.5, target: 3.0 },
    { day: "Tue", amount: 3.2, target: 3.0 },
    { day: "Wed", amount: 3.0, target: 3.0 },
    { day: "Thu", amount: 2.8, target: 3.0 },
    { day: "Fri", amount: 3.5, target: 3.0 },
    { day: "Sat", amount: 2.0, target: 3.0 },
    { day: "Sun", amount: 3.1, target: 3.0 }
  ],
  sleepLogs: [
    { day: "Mon", hours: 6.0 },
    { day: "Tue", hours: 6.8 },
    { day: "Wed", hours: 7.2 },
    { day: "Thu", hours: 6.5 },
    { day: "Fri", hours: 5.5 },
    { day: "Sat", hours: 8.0 },
    { day: "Sun", hours: 7.5 }
  ],
  stepsLogs: [
    { day: "Mon", steps: 7200 },
    { day: "Tue", steps: 8400 },
    { day: "Wed", steps: 6100 },
    { day: "Thu", steps: 9500 },
    { day: "Fri", steps: 10200 },
    { day: "Sat", steps: 4800 },
    { day: "Sun", steps: 8900 }
  ],
  caloriesToday: { intake: 1850, burned: 450, target: 2200 },
  stepsToday: 8250,
  waterToday: 2.2, // in liters
  sleepToday: 7.0 // in hours
};

export const INITIAL_PRODUCTIVITY_DATA = {
  projects: [
    { id: 1, name: "Academic Portfolio Website", status: "In Progress", deadline: "2026-06-25", progress: 60 },
    { id: 2, name: "Smart Habit Tracker App (React)", status: "Completed", deadline: "2026-06-10", progress: 100 },
    { id: 3, name: "Data Structures & Algorithms Mastery", status: "In Progress", deadline: "2026-07-15", progress: 40 }
  ],
  tasks: [
    { id: 101, title: "Optimize portfolio styling & animations", project: "Academic Portfolio Website", priority: "High", focus: true, done: false, date: "2026-06-17" },
    { id: 102, title: "Solve 5 LeetCode DSA questions on Trees", project: "Data Structures & Algorithms Mastery", priority: "High", focus: true, done: false, date: "2026-06-17" },
    { id: 103, title: "Write documentation for React Habit Tracker", project: "Smart Habit Tracker App (React)", priority: "Medium", focus: false, done: true, date: "2026-06-10" },
    { id: 104, title: "Submit BCA Java assignments", project: "General Academic", priority: "Medium", focus: false, done: false, date: "2026-06-19" },
    { id: 105, title: "Complete Machine Learning intro lesson", project: "Self Study", priority: "Low", focus: false, done: false, date: "2026-06-21" },
    { id: 106, title: "Drink 3 Liters of Water", project: "Health & Wellness", priority: "Medium", focus: false, done: true, date: "2026-06-17" },
    { id: 107, title: "Evening running session (3km)", project: "Health & Wellness", priority: "High", focus: true, done: false, date: "2026-06-17" }
  ]
};

export const INITIAL_LEARNING_DATA = {
  courses: [
    { id: 1, name: "Python Programming Masterclass", category: "Core Development", progress: 85, duration: "32h total", instructor: "Jose Portilla" },
    { id: 2, name: "Data Structures & Algorithms in JS", category: "Computer Science", progress: 42, duration: "48h total", instructor: "Abdul Bari" },
    { id: 3, name: "Machine Learning Bootcamp", category: "Artificial Intelligence", progress: 15, duration: "60h total", instructor: "Andrew Ng" },
    { id: 4, name: "System Design Fundamentals", category: "Software Architecture", progress: 30, duration: "20h total", instructor: "Alex Xu" },
    { id: 5, name: "Business English & Technical Writing", category: "Soft Skills", progress: 75, duration: "12h total", instructor: "Coursera Specialized" }
  ],
  certifications: [
    { name: "Responsive Web Design (FreeCodeCamp)", status: "Earned", date: "2026-02-15" },
    { name: "Python Essentials (Cisco)", status: "Earned", date: "2026-04-20" },
    { name: "AWS Certified Cloud Practitioner", status: "In Progress", date: "Target: Aug 2026" }
  ]
};

export const INITIAL_HABITS = [
  { id: 1, name: "Exercise & Workout", category: "Health", streak: 5, maxStreak: 12, completionsThisMonth: 12, frequency: "Daily", history: [true, true, true, true, true, false, true, true, false, true, true, true, true, true, true] },
  { id: 2, name: "Coding Practice", category: "Learning", streak: 8, maxStreak: 15, completionsThisMonth: 14, frequency: "Daily", history: [true, true, true, true, true, true, true, true, false, true, true, true, false, true, true] },
  { id: 3, name: "Read Technical Articles", category: "Learning", streak: 3, maxStreak: 6, completionsThisMonth: 8, frequency: "Daily", history: [false, true, true, true, false, false, true, true, true, false, false, true, true, true, false] },
  { id: 4, name: "8 Hours Sleep", category: "Health", streak: 0, maxStreak: 4, completionsThisMonth: 6, frequency: "Daily", history: [false, false, true, true, false, true, false, true, false, true, false, false, true, false, false] },
  { id: 5, name: "Daily Meditation", category: "Mental Wellness", streak: 12, maxStreak: 12, completionsThisMonth: 13, frequency: "Daily", history: [true, true, true, true, true, true, true, true, true, true, true, true, true, false, false] }
];

export const INITIAL_COMMUNITIES = [
  { name: "AI Engineers", members: 14200, category: "Tech", rank: 2, points: 48900, weeklyStudyHours: 420, dailyConsistency: 88, icon: "Cpu" },
  { name: "Fitness Warriors", members: 21500, category: "Health", rank: 1, points: 51200, weeklyStudyHours: 120, dailyConsistency: 92, icon: "Activity" },
  { name: "UPSC Aspirants", members: 9800, category: "Career", rank: 4, points: 41300, weeklyStudyHours: 650, dailyConsistency: 81, icon: "Book" },
  { name: "Entrepreneurs Guild", members: 7600, category: "Business", rank: 3, points: 45600, weeklyStudyHours: 310, dailyConsistency: 85, icon: "Lightbulb" },
  { name: "Design Pioneers", members: 11200, category: "Creative", rank: 5, points: 38200, weeklyStudyHours: 240, dailyConsistency: 84, icon: "Palette" }
];

export const MOCK_BLUEPRINT = {
  goal: "Become AI Engineer",
  currentRole: "BCA Student",
  gapAnalysis: [
    { skill: "Python Programming", current: 40, target: 90, gap: 50 },
    { skill: "Data Structures & Algorithms", current: 25, target: 85, gap: 60 },
    { skill: "Machine Learning / Deep Learning", current: 15, target: 90, gap: 75 },
    { skill: "System Design", current: 30, target: 80, gap: 50 },
    { skill: "Practical Portfolio Projects", current: 30, target: 90, gap: 60 },
    { skill: "Communication & Collaboration", current: 65, target: 85, gap: 20 }
  ],
  roadmap: [
    { year: "2026", focus: "Python + DSA & Computer Science Core", status: "In Progress", details: "Master advanced Python OOP, complexity analysis, and practice 150+ LeetCode problems. Build a personal automation bot." },
    { year: "2027", focus: "Web Frameworks, Database Systems & Internships", status: "Upcoming", details: "Learn React/Node.js or Django, build complex fullstack projects, and secure a web developer/software engineering internship." },
    { year: "2028", focus: "Machine Learning, Deep Learning & Math Core", status: "Upcoming", details: "Study Linear Algebra, Calculus, Probability. Complete Andrew Ng's ML specializations. Build ML models from scratch in NumPy." },
    { year: "2029", focus: "AI Portfolio Projects, Placement Prep & Interviews", status: "Upcoming", details: "Deploy LLM agents, optimize RAG engines, practice mock System Design & coding interviews, secure a high-tier AI Engineer role." }
  ]
};

export const MOCK_MONTHLY_REPORT = {
  monthName: "May 2026",
  healthScore: 78,
  productivityScore: 72,
  learningScore: 80,
  habitsScore: 85,
  overallLifeScore: 79,
  achievements: [
    "Completed React Smart Habit Tracker app prototype.",
    "Unlocked 8-day coding streak milestone.",
    "Maintained water targets on 25 out of 31 days."
  ],
  missedGoals: [
    "Failed to average 7.5 hours of sleep (ended with 6.4h).",
    "Missed completing AWS Cloud Practitioner prep due to BCA semester exams."
  ],
  strengths: [
    "Excellent dedication to coding practice.",
    "Consistent daily meditation and mental check-ins.",
    "Active contribution to the AI Engineers Community."
  ],
  weaknesses: [
    "Sleep deprivation during exam weeks.",
    "Skipping physical workout sessions when academic workload rises."
  ],
  recommendations: [
    "Implement a hard screen shutoff time at 10:30 PM to improve sleep quality.",
    "Replace 45-minute gym workouts with high-intensity 15-minute home routines during exams to maintain fitness momentum without losing study hours."
  ],
  aiInsights: "Your overall Life Score increased by 7% compared to April. This is directly driven by your habit completion rate climbing to 85% (up from 75%). However, a negative correlation exists between your sleep length and study duration; on days when you study > 6 hours, your sleep drops to 5.2 hours. Guard your recovery time to prevent cognitive burnout."
};

// Generates simulated replies based on current profile context and user query
export const generateGeminiReply = (query, profile, health, productivity, learning, habits) => {
  const q = query.toLowerCase();

  const details = {
    name: profile?.personalInfo?.name || "User",
    profession: profile?.personalInfo?.profession || "Student",
    target: profile?.personalInfo?.targetCareer || "AI Engineer",
    weight: health?.weightHistory[health.weightHistory.length - 1]?.weight || 78,
    sleep: health?.sleepToday || 7.0,
    study: profile?.currentSituation?.studyHours || 4,
    challenge: profile?.currentSituation?.biggestChallenge || "Consistency"
  };

  if (q.includes("ai engineer") || q.includes("roadmap") || q.includes("become")) {
    return {
      text: `### AI Career Roadmap: How to become an AI Engineer (Customized for ${details.name})

As a **${details.profession}**, you are starting with a solid foundational background, but there's a clear gap between college curriculum and industry-grade AI engineering. Here is your personalized transition strategy:

#### Phase 1: Core Systems & Algorithms (Next 6-12 Months)
- **Primary Language**: Master Python deeply. Focus on object-oriented design, async scripting, and memory management.
- **Algorithms**: Solve at least 150-200 LeetCode problems focusing on arrays, trees, hashing, dynamic programming, and graphs. This builds critical problem-solving skills.
- **Project Goal**: Create a custom web crawler or lightweight database from scratch in pure Python.

#### Phase 2: Mathematics & Classic Machine Learning (12-24 Months)
- **Math Foundations**: Dedicate 15 minutes a day to Linear Algebra (matrix decomposition), Multivariable Calculus (gradients, chain rule), and Probability Theory (Bayes' Theorem).
- **Core ML**: Master Scikit-Learn. Implement linear regression, decision trees, SVMs, and K-Means from scratch without relying on frameworks to understand their mathematics.

#### Phase 3: Modern AI & Deep Learning (24-36 Months)
- **Deep Learning**: Pick PyTorch. Understand backpropagation, CNNs for vision, RNNs/LSTMs, and ultimately **Transformers**.
- **Generative AI & LLMs**: Work with open-source models (Llama, Mistral), fine-tune them using LoRA/QLoRA, build Retrieval-Augmented Generation (RAG) pipelines, and create multi-agent frameworks using LangChain or AutoGen.

#### AI Coach Recommendation:
Based on your current BCA schedule, try using your **LifeOS Pomodoro Timer** to study DSA for 2 hours daily, and dedicate 1 hour specifically to Python projects.`,
      suggestedPrompts: ["What projects should I build?", "Explain DSA vs Machine Learning", "Analyze my learning speed"]
    };
  }

  if (q.includes("weight") || q.includes("lose") || q.includes("fat") || q.includes("fitness")) {
    return {
      text: `### Personalized Weight Optimization Strategy for ${details.name}

You currently weigh **${details.weight} kg** with a target of **${profile?.currentSituation?.targetWeight || 70} kg**. Based on your onboarding profile, your fitness level is **${details.fitnessLevel || "Beginner"}**.

#### 1. Caloric Target Strategy
To lose weight safely, you need a moderate caloric deficit. 
- **Target Daily Intake**: ~1800-1900 kcal.
- **Current Intake today**: ${health?.caloriesToday?.intake || 1850} kcal.
- Keep protein high (~1.6g per kg of body weight) to preserve muscle mass.

#### 2. Habit Alignment
- Your current habit tracker shows you logged **Exercise** on ${habits?.find(h => h.id === 1)?.completionsThisMonth || 12} days this month. 
- Try to scale this to 4 days/week. Choose workouts that combine strength training with high-intensity intervals (HIIT) to maximize metabolic burn.

#### 3. Water and Recovery
- You logged **${details.sleep} hours of sleep** today. A lack of sleep increases cortisol (stress hormone), which leads to fat retention and increased cravings. Aim for a consistent 7.5 hours.
- Drink at least 3.0 Liters of water daily to maintain metabolic rate.

#### AI Coach Recommendation:
I've added a recurring item to your **AI Daily Planner**: *'Drink 1 glass of water every 2 hours'* and *'15-minute home workout'*. Let's tackle this tomorrow morning!`,
      suggestedPrompts: ["Suggest a 15-minute home workout", "What should my diet look like?", "Why does sleep affect weight?"]
    };
  }

  if (q.includes("productivity") || q.includes("drop") || q.includes("procrastinat") || q.includes("focus")) {
    return {
      text: `### LifeOS Productivity Diagnosis

Aarav, let's analyze why your productivity is experiencing friction. Based on your tracker telemetry:
1. **Sleep Patterns**: Your sleep averages **${details.sleep} hours**. When you sleep under 6 hours, your next-day task completion rate drops by **32%**.
2. **Task Backlog**: You have several high-priority tasks in your backlog (e.g., *'Optimize portfolio styling'*, *'Solve 5 LeetCode DSA questions'*).
3. **Habit Consistency**: Your coding practice streak is **${habits?.find(h => h.id === 2)?.streak || 8} days**, which is outstanding! However, your exercise consistency has fluctuated.

#### Recommendation Plan:
- **Use the Pomodoro Technique**: Set the LifeOS Focus Timer to 25 minutes. Force yourself to work on *one single task* with zero browser tabs open. Once complete, take a 5-minute break.
- **Eat the Frog**: Tackle your hardest high-priority task (the LeetCode DSA questions) *first thing in the morning* before checking emails or social media.
- **Optimize Sleep**: We must get you to 7+ hours of sleep. Try to complete your study block before 9:30 PM.

#### AI Coach Recommendation:
Try using the **AI Planner** in your Productivity module to automatically schedule your tasks based on priority levels. Let's do a 25-minute study sprint now.`,
      suggestedPrompts: ["Suggest a study schedule", "Create a task list for portfolio project", "How to fix my sleep schedule"]
    };
  }

  if (q.includes("study") || q.includes("plan") || q.includes("schedule")) {
    return {
      text: `### Optimized Study Plan: Balancing Academics & AI Goals

To help you balance your **BCA degree** while self-studying to become an **${details.target}**, here is an optimized daily distribution:

| Time Slot | Module | Focus Area | LifeOS Feature |
| :--- | :--- | :--- | :--- |
| **07:00 - 08:30 AM** | Core Skills | Data Structures & Algorithms (LeetCode) | Focus Mode (Pomodoro) |
| **09:00 - 03:00 PM** | Academics | BCA College Lectures & Assignments | Task Manager Logging |
| **04:30 - 05:30 PM** | Health | Physical Fitness / Outdoor Run | Health Tracker Sync |
| **07:30 - 09:00 PM** | AI Engineering | Machine Learning courses / Python coding | Learning Progress Hub |
| **10:00 PM** | Mindset | Habit Grid Check-offs & Journaling | Habit Streaks Grid |

#### Why this works:
- **Morning Focus**: Studies show cognitive endurance is highest in the morning. Knocking out DSA early ensures you get it done before college exhaust you.
- **Built-in Breaks**: The gym/running slot acts as a cognitive reset button between college and self-study.

#### AI Coach Recommendation:
Click **"Activate Today's Priorities"** on the AI Daily Planner to populate this calendar directly into your dashboard workspace.`,
      suggestedPrompts: ["What courses should I take?", "Show my AI Blueprint", "How do I prep for interviews?"]
    };
  }

  if (q.includes("analyze") || q.includes("month") || q.includes("review")) {
    return {
      text: `### Monthly Review & Life Analytics Summary

Analyzing your performance metrics for **May 2026**:

- **Overall Life Score**: **79/100** (Up 7% from April).
- **Core Strengths**: 
  - Habits Completion: **85%** consistency rate.
  - Active learning in DSA and Python programming.
- **Vulnerabilities**:
  - Sleep average: **6.4 hours** (Target is 7.5 hours).
  - Health/Fitness habits dropped during college exams.

#### Patterns Found:
- On days you completed a **Workout**, your sleep quality rating was **9.2/10** compared to **6.8/10** on sedentary days.
- When study hours exceeded 6 hours/day, steps walked fell below 3,000 steps.

#### Next Action Items:
1. Limit study sessions to 5 hours max on weekdays to protect sleep.
2. Incorporate active stretching/walking during Pomodoro breaks to keep steps up.`,
      suggestedPrompts: ["How do I increase my Life Score?", "Show my weaknesses", "Give me exercise suggestions"]
    };
  }

  // Fallback default response
  return {
    text: `Hello Aarav! I am your **LifeOS AI Coach**.

I monitor your health telemetry, study hours, habit streaks, and task items to help you transition from a **${details.profession}** to an **${details.target}**.

You can ask me questions like:
- *"How do I become an AI Engineer?"*
- *"Analyze my last month."*
- *"Create a study plan."*
- *"How can I lose weight?"*
- *"Why is my productivity dropping?"*

What aspect of your Life OS would you like to optimize today?`,
    suggestedPrompts: ["How do I become an AI Engineer?", "Create a study plan.", "How can I lose weight?", "Analyze my last month."]
  };
};

export const DEFAULT_MORNING_PLAN = {
  date: "Wednesday, June 17, 2026",
  priorities: [
    "Build academic portfolio layout components",
    "Practice 5 DSA LeetCode questions (Tree structures)",
    "30-minute cardio workout & run"
  ],
  recommendedTasks: [
    { title: "Review Andrew Ng ML Chapter 2", category: "Learning", duration: "45 mins" },
    { title: "Clean workstation and organize weekly schedule", category: "Productivity", duration: "15 mins" },
    { title: "Prepare meal prep container (deficits nutrition)", category: "Health", duration: "20 mins" }
  ],
  studyTargets: [
    "Python OOP Inheritance (1 hr)",
    "DSA Trees & Recursion (2 hrs)"
  ],
  workoutPlan: "3km outdoor run + 15 mins high-intensity core training. Calorie Target Burn: 400 kcal.",
  focusAreas: ["Deep DSA coding focus", "Consistent hydration", "Post-college active recovery"]
};
