import React, { useState } from 'react';
import { Calendar, Flame, CheckCircle, PlusCircle, Sparkles, TrendingUp } from 'lucide-react';

export default function HabitsTracker({ habitsData, setHabitsData, addXp }) {
  const [successMsg, setSuccessMsg] = useState('');
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Learning');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Check habit today helper
  const handleCheckHabit = (habitId) => {
    setHabitsData(prev => {
      return prev.map(habit => {
        if (habit.id === habitId) {
          const alreadyChecked = habit.history[habit.history.length - 1] === true;
          if (alreadyChecked) {
            triggerSuccess(`"${habit.name}" already checked today!`);
            return habit;
          }
          
          // Append true, increment streak
          const newHistory = [...habit.history];
          newHistory[newHistory.length - 1] = true;
          const newStreak = habit.streak + 1;
          const newCompletions = habit.completionsThisMonth + 1;
          
          addXp(30);
          triggerSuccess(`Checked off "${habit.name}"! Streak increased to ${newStreak}! (+30 XP!)`);
          return { 
            ...habit, 
            streak: newStreak, 
            maxStreak: Math.max(newStreak, habit.maxStreak),
            completionsThisMonth: newCompletions,
            history: newHistory 
          };
        }
        return habit;
      });
    });
  };

  // Add habit helper
  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      category: newHabitCategory,
      streak: 0,
      maxStreak: 0,
      completionsThisMonth: 0,
      frequency: 'Daily',
      // Start with 14 empty slots and 1 today
      history: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    };

    setHabitsData(prev => [...prev, newHabit]);
    addXp(40);
    triggerSuccess(`Created new habit: "${newHabitName}" (+40 XP!)`);
    setNewHabitName('');
  };

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calendar size={28} color="#EC4899" />
            <span>Habit Streak Matrix</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Gamify consistency, build multi-day streaks, and review grid maps.
          </p>
        </div>
        <div className="item-badge badge-accent" style={{ padding: '8px 16px', fontSize: '0.9rem', background: 'rgba(236,72,153,0.15)', color: '#EC4899', border: '1px solid rgba(236,72,153,0.3)' }}>
          Active Streaks
        </div>
      </div>

      {/* Floating Success Banner */}
      {successMsg && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', background: '#EC4899', color: 'white',
          padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)', zIndex: 1000, fontWeight: '600'
        }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid containing core lists */}
      <div className="dashboard-grid">
        
        {/* Habit Cards & check-offs list (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Add Habit form */}
          <form onSubmit={handleAddHabit} className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Habit Trigger</label>
              <input 
                required 
                type="text" 
                value={newHabitName} 
                onChange={e => setNewHabitName(e.target.value)} 
                placeholder="e.g. 30m Meditation, Code LeetCode, Gym Session" 
                className="input-field" 
                style={{ padding: '10px' }}
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Category</label>
              <select value={newHabitCategory} onChange={e => setNewHabitCategory(e.target.value)} className="input-field" style={{ padding: '10px' }}>
                <option value="Learning">Learning</option>
                <option value="Health">Health</option>
                <option value="Mental Wellness">Mental Wellness</option>
                <option value="Career Development">Career Development</option>
              </select>
            </div>

            <button type="submit" className="gradient-btn" style={{ padding: '10px 20px', borderRadius: '8px', height: '42px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PlusCircle size={18} />
              <span>Create</span>
            </button>
          </form>

          {/* Habits listing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {habitsData.map(habit => {
              const isTodayChecked = habit.history[habit.history.length - 1] === true;
              return (
                <div key={habit.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Card header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>{habit.name}</h3>
                      <span className="item-badge badge-accent" style={{ fontSize: '0.65rem', marginTop: '6px', background: habit.category === 'Health' ? 'rgba(16,185,129,0.1)' : 'rgba(139,92,246,0.1)', color: habit.category === 'Health' ? '#10B981' : '#C084FC', border: 'none' }}>
                        {habit.category}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Streak display */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EC4899', fontWeight: '700' }}>
                        <Flame size={20} fill={habit.streak > 0 ? '#EC4899' : 'transparent'} />
                        <span style={{ fontSize: '1rem' }}>{habit.streak} Day Streak</span>
                      </div>

                      {/* Check off button */}
                      <button
                        onClick={() => handleCheckHabit(habit.id)}
                        style={{
                          padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                          background: isTodayChecked ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                          border: isTodayChecked ? '1px solid #10B981' : 'none',
                          color: isTodayChecked ? '#10B981' : 'white',
                          fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s'
                        }}
                      >
                        <CheckCircle size={16} />
                        <span>{isTodayChecked ? 'Completed Today' : 'Mark Done'}</span>
                      </button>
                    </div>
                  </div>

                  {/* GitHub contribution style Grid representation */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '8px' }}>
                      <span>Habit Consistency Timeline (Past 15 days)</span>
                      <span>Max Streak: {habit.maxStreak} Days</span>
                    </div>

                    {/* Heatmap Row */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {habit.history.map((checked, i) => (
                        <div 
                          key={i} 
                          style={{
                            width: '32px', height: '32px', borderRadius: '6px',
                            background: checked ? 'rgba(236,72,153,0.8)' : 'rgba(255,255,255,0.03)',
                            border: checked ? '1px solid #EC4899' : '1px solid rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem',
                            fontWeight: 'bold', color: checked ? '#0F172A' : '#475569',
                            boxShadow: checked ? '0 0 10px rgba(236,72,153,0.2)' : 'none',
                            transition: '0.3s'
                          }}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Sidebar consistency widgets (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#EC4899" />
              <span>Habit Analytics</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AI analysis on daily behavior patterns</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'block' }}>Monthly Completion Rate</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '800', display: 'block', marginTop: '6px', color: '#EC4899' }}>83.4%</span>
            <span style={{ fontSize: '0.7rem', color: '#10B981' }}>+8.2% since April</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
            <p>
              🧘 <strong>Meditation Sync:</strong> Maintaining a 12-day streak has lowered your cognitive fatigue index by 15% on daily studies.
            </p>
            <p>
              💻 <strong>Coding Streak:</strong> Logging 8 consecutive days of DSA practice is unlocking high visual clarity in your AI blueprint progress.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(139,92,246,0.05) 100%)',
            border: '1px solid rgba(236,72,153,0.15)', padding: '16px', borderRadius: '12px', marginTop: 'auto'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#EC4899', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} />
              <span>AI HABIT INSIGHT</span>
            </span>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px', lineHeight: '1.4' }}>
              We detected a pattern: on days when you skip Meditation, you have a 40% higher chance of missing study targets. Meditate first to clear focus filters.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
