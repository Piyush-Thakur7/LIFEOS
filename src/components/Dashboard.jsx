import React from 'react';
import { 
  Sparkles, CheckCircle2, ChevronRight, Activity, 
  BookOpen, Calendar, Clock, ArrowUpRight, Flame, Target 
} from 'lucide-react';

export default function Dashboard({ 
  userProfile, healthData, productivityData, habitsData, 
  setActiveTab, morningPlan, toggleTaskCheck 
}) {
  
  // Calculate dynamic stats
  const activeHabitStreak = Math.max(...habitsData.map(h => h.streak), 0);
  const doneTasks = productivityData.tasks.filter(t => t.done).length;
  const totalTasks = productivityData.tasks.length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  
  // Calculate scores
  const learningScore = Math.round(
    userProfile.lifeScoreHistory[userProfile.lifeScoreHistory.length - 1].learning
  );
  const habitsScore = Math.round(
    userProfile.lifeScoreHistory[userProfile.lifeScoreHistory.length - 1].habits
  );
  
  // Formula: 0.25*health + 0.3*prod + 0.25*learn + 0.2*habits
  const healthScore = healthData.healthScore;
  const overallLifeScore = Math.round(
    (0.25 * healthScore) + 
    (0.30 * taskCompletionRate) + 
    (0.25 * learningScore) + 
    (0.20 * habitsScore)
  );

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Top Welcome Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginBottom: '32px', flexWrap: 'wrap', gap: '16px' 
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>
            Welcome back, <span className="gradient-text">{userProfile.personalInfo.name}</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Optimizing toward: <span style={{ color: '#8B5CF6', fontWeight: '600' }}>{userProfile.personalInfo.targetCareer}</span>
          </p>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 16px', borderRadius: '12px', fontSize: '0.88rem', color: '#94A3B8'
        }}>
          {morningPlan.date}
        </div>
      </div>

      {/* AI Daily Focus Recommendation Banner */}
      <div className="glass-panel" style={{ 
        padding: '20px 24px', marginBottom: '32px', display: 'flex', 
        alignItems: 'center', gap: '16px', borderLeft: '4px solid #8B5CF6',
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%)'
      }}>
        <div style={{
          background: 'rgba(139, 92, 246, 0.15)', padding: '10px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Sparkles size={20} color="#8B5CF6" />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#C084FC', letterSpacing: '1px', textTransform: 'uppercase' }}>AI Recommendation</span>
          <p style={{ fontSize: '0.92rem', color: '#E2E8F0', marginTop: '4px', lineHeight: '1.4' }}>
            "Your productivity increased 18% compared to last month. However, sleep falls under 6 hours on high study days. We suggest targeting <strong>{userProfile.currentSituation.sleepDuration + 1} hours</strong> of sleep tonight to balance mental fatigue."
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('coach')}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
            color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: '600', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '6px'
          }}
          onMouseOver={e=>e.target.style.background='rgba(255,255,255,0.1)'}
          onMouseOut={e=>e.target.style.background='rgba(255,255,255,0.04)'}
        >
          <span>Ask Coach</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Grid of Main Dashboard widgets */}
      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        
        {/* Widget 1: Life Score circular dial (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Life Score Index</span>
          
          <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="75" cy="75" r="65" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="transparent" />
              <circle 
                cx="75" cy="75" r="65" 
                stroke="url(#lifeScoreGrad)" 
                strokeWidth="10" 
                fill="transparent" 
                strokeDasharray="408.4" 
                strokeDashoffset={408.4 - (408.4 * overallLifeScore) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
              <defs>
                <linearGradient id="lifeScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1' }}>{overallLifeScore}</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '600', marginTop: '4px' }}>Optimal</span>
            </div>
          </div>

          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Health</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#10B981' }}>{healthScore}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Productivity</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#2563EB' }}>{taskCompletionRate}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Learning</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#C084FC' }}>{learningScore}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Habits</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#EC4899' }}>{habitsScore}</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Today's Priorities / Checkables (5 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 5', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Today's AI Focus Actionables</span>
            <span style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: '600' }}>+50 XP per Task</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {productivityData.tasks.filter(t => t.focus).map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTaskCheck(task.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  background: task.done ? 'rgba(16, 185, 129, 0.04)' : 'rgba(255,255,255,0.01)',
                  border: task.done ? '1px solid rgba(16, 185, 129, 0.15)' : '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '12px', cursor: 'pointer', transition: '0.2s'
                }}
                onMouseOver={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}
                onMouseOut={e=>e.currentTarget.style.borderColor=task.done ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.04)'}
              >
                <div style={{ color: task.done ? '#10B981' : '#475569', display: 'flex', alignItems: 'center' }}>
                  <CheckCircle2 size={20} fill={task.done ? '#10B981' : 'transparent'} stroke={task.done ? '#0F172A' : 'currentColor'} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ 
                    fontSize: '0.88rem', fontWeight: '500',
                    color: task.done ? '#64748B' : 'white',
                    textDecoration: task.done ? 'line-through' : 'none'
                  }}>{task.title}</span>
                  <span style={{ 
                    display: 'block', fontSize: '0.7rem', color: '#8B5CF6', marginTop: '2px', fontWeight: '600' 
                  }}>{task.project}</span>
                </div>
                <div className={`item-badge ${task.priority === 'High' ? 'badge-primary' : 'badge-accent'}`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Streaks and Quick Stats (3 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Analytics</span>

          {/* Habit Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(236,72,153,0.04)', border: '1px solid rgba(236,72,153,0.1)', borderRadius: '12px' }}>
            <div style={{ background: 'rgba(236,72,153,0.15)', padding: '10px', borderRadius: '10px' }}>
              <Flame size={20} color="#EC4899" />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Active Habit Streak</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#EC4899' }}>{activeHabitStreak} Days</span>
            </div>
          </div>

          {/* Water log indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '12px' }}>
            <div style={{ background: 'rgba(59,130,246,0.15)', padding: '10px', borderRadius: '10px' }}>
              <Activity size={20} color="#3B82F6" />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Water Hydration</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#3B82F6' }}>{healthData.waterToday} L / {healthData.waterLogs[0].target} L</span>
            </div>
          </div>

          {/* Task Rate */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: '12px' }}>
            <div style={{ background: 'rgba(16,185,129,0.15)', padding: '10px', borderRadius: '10px' }}>
              <Clock size={20} color="#10B981" />
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8' }}>Task Executions</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#10B981' }}>{taskCompletionRate}% Rate</span>
            </div>
          </div>

        </div>
      </div>

      {/* Second Row: Detailed Module summaries */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Health Tracker Quick card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#10B981" />
              <span>Health Analytics</span>
            </h3>
            <button 
              onClick={() => setActiveTab('health')}
              style={{ background: 'none', border: 'none', color: '#10B981', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View Module</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>BMI Index</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block', marginTop: '4px' }}>24.1</span>
              <span style={{ fontSize: '0.65rem', color: '#10B981' }}>Normal</span>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Today's Steps</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block', marginTop: '4px' }}>{healthData.stepsToday}</span>
              <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Target: 10k</span>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Sleep Session</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block', marginTop: '4px' }}>{healthData.sleepToday}h</span>
              <span style={{ fontSize: '0.65rem', color: '#F59E0B' }}>Restless</span>
            </div>
          </div>
        </div>

        {/* Learning Hub Quick card */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="#8B5CF6" />
              <span>Skill Acquisition</span>
            </h3>
            <button 
              onClick={() => setActiveTab('learning')}
              style={{ background: 'none', border: 'none', color: '#8B5CF6', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View Module</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: '500' }}>Python Programming Masterclass</span>
              <span style={{ color: '#8B5CF6', fontWeight: '600' }}>85%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: '#8B5CF6' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: '6px' }}>
              <span style={{ fontWeight: '500' }}>Data Structures & Algorithms in JS</span>
              <span style={{ color: '#2563EB', fontWeight: '600' }}>42%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: '#2563EB' }} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
