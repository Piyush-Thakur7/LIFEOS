import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckSquare, Clock, Plus, Trash2, Play, Pause, 
  RotateCcw, Sparkles, AlertCircle, CheckCircle, Flame 
} from 'lucide-react';

export default function ProductivityTracker({ productivityData, setProductivityData, addXp }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newProject, setNewProject] = useState('General Academic');
  const [newPriority, setNewPriority] = useState('Medium');
  
  // Pomodoro states
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // focus or break
  const intervalRef = useRef(null);

  const [notification, setNotification] = useState('');

  // Pomodoro countdown timer logic
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setTimerRunning(false);
            
            // Timer complete actions
            if (timerMode === 'focus') {
              addXp(100);
              triggerNotification('🏆 Pomodoro Session Complete! Earned +100 XP!');
              setTimeLeft(5 * 60); // switch to break
              setTimerMode('break');
            } else {
              addXp(20);
              triggerNotification('🍵 Break over. Time to focus! Earned +20 XP!');
              setTimeLeft(25 * 60); // switch to focus
              setTimerMode('focus');
            }
            return 0;
          }
          return prev - 1;
        });
      } , 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerRunning, timerMode]);

  const toggleTimer = () => setTimerRunning(prev => !prev);
  
  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Add task helper
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      project: newProject,
      priority: newPriority,
      focus: newPriority === 'High', // High priority automatically goes to daily focus
      done: false,
      date: new Date().toISOString().split('T')[0]
    };

    setProductivityData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    addXp(15);
    triggerNotification(`Added task: "${newTaskTitle}" (Earned +15 XP)`);
    setNewTaskTitle('');
  };

  // Delete task helper
  const handleDeleteTask = (taskId) => {
    setProductivityData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== taskId)
    }));
  };

  // Toggle complete task
  const handleToggleTask = (taskId) => {
    setProductivityData(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          const newState = !t.done;
          if (newState) {
            addXp(40);
            triggerNotification('Task Completed! Earned +40 XP!');
          }
          return { ...t, done: newState };
        }
        return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
  };

  // Toggle focus checkbox
  const handleToggleFocus = (taskId) => {
    setProductivityData(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, focus: !t.focus };
        }
        return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
  };

  // AI Planner sorting algorithm
  const handleAIPlanner = () => {
    setProductivityData(prev => {
      const tasksCopy = [...prev.tasks];
      // Sort: High -> Medium -> Low, then Uncompleted -> Completed
      const priorityWeights = { High: 3, Medium: 2, Low: 1 };
      tasksCopy.sort((a, b) => {
        if (a.done !== b.done) {
          return a.done ? 1 : -1; // Uncompleted first
        }
        return priorityWeights[b.priority] - priorityWeights[a.priority]; // High priority first
      });

      // Highlight top 3 high priority tasks in Daily Focus
      const updatedTasks = tasksCopy.map((t, idx) => {
        if (idx < 3 && t.priority === 'High' && !t.done) {
          return { ...t, focus: true };
        }
        return t;
      });

      triggerNotification('🧠 AI Planner activated: Backlog re-prioritized and Focus items locked!');
      return { ...prev, tasks: updatedTasks };
    });
  };

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckSquare size={28} color="#2563EB" />
            <span>Productivity & Execution</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Coordinate assignments, schedule deadlines, and use Pomodoro sprints.
          </p>
        </div>
        <button 
          onClick={handleAIPlanner}
          className="gradient-btn"
          style={{ padding: '10px 18px', borderRadius: '10px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Sparkles size={16} />
          <span>Run AI Planner</span>
        </button>
      </div>

      {/* Floating Success Banner */}
      {notification && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', background: '#2563EB', color: 'white',
          padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)', zIndex: 1000, fontWeight: '600'
        }}>
          <CheckCircle size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Layout split: Left side Pomodoro, Right side Task Board */}
      <div className="dashboard-grid">
        
        {/* Left Side: Pomodoro Timer (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'fit-content' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Focus Session Mode
          </span>

          <div style={{
            width: '180px', height: '180px', borderRadius: '50%',
            border: `6px solid ${timerMode === 'focus' ? '#2563EB' : '#10B981'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.01)', position: 'relative',
            boxShadow: timerRunning ? (timerMode === 'focus' ? '0 0 20px rgba(37, 99, 235, 0.2)' : '0 0 20px rgba(16, 185, 129, 0.2)') : 'none',
            transition: '0.4s'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'monospace' }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{ fontSize: '0.75rem', color: timerMode === 'focus' ? '#60A5FA' : '#34D399', fontWeight: '600', textTransform: 'uppercase', marginTop: '4px' }}>
              {timerMode === 'focus' ? 'Focus Interval' : 'Short Break'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '24px', width: '100%' }}>
            <button 
              onClick={toggleTimer}
              style={{
                flex: 2, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: timerRunning ? '#EF4444' : (timerMode === 'focus' ? '#2563EB' : '#10B981'),
                color: timerRunning ? 'white' : '#0F172A', fontWeight: '700',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s'
              }}
            >
              {timerRunning ? <Pause size={16} /> : <Play size={16} />}
              <span>{timerRunning ? 'Pause' : 'Start Focus'}</span>
            </button>
            
            <button 
              onClick={resetTimer}
              className="btn-secondary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={12} color="#EC4899" />
            <span>Complete focus sprint to earn +100 XP</span>
          </div>
        </div>

        {/* Right Side: Backlog & Tasks Board (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Add Task Quick Form */}
          <form onSubmit={handleAddTask} className="glass-panel" style={{ padding: '20px', display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.5fr', gap: '12px', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Task Title</label>
              <input 
                required 
                type="text" 
                value={newTaskTitle} 
                onChange={e => setNewTaskTitle(e.target.value)} 
                placeholder="What needs execution?" 
                className="input-field" 
                style={{ padding: '10px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Project Hub</label>
              <select value={newProject} onChange={e => setNewProject(e.target.value)} className="input-field" style={{ padding: '10px' }}>
                <option value="General Academic">General Academic</option>
                <option value="Academic Portfolio Website">Academic Portfolio Website</option>
                <option value="Smart Habit Tracker App (React)">Smart Habit Tracker App (React)</option>
                <option value="Data Structures & Algorithms Mastery">DSA Mastery</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Self Study">Self Study</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Priority</label>
              <select value={newPriority} onChange={e => setNewPriority(e.target.value)} className="input-field" style={{ padding: '10px' }}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <button type="submit" className="gradient-btn" style={{ height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Plus size={20} />
            </button>
          </form>

          {/* Tasks List */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>Task Backlog & Daily Focus</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
              {productivityData.tasks.map(task => (
                <div 
                  key={task.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                    background: task.done ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '10px', transition: '0.2s',
                    opacity: task.done ? 0.6 : 1
                  }}
                >
                  {/* Complete Checkbox */}
                  <div 
                    onClick={() => handleToggleTask(task.id)}
                    style={{ cursor: 'pointer', color: task.done ? '#10B981' : '#475569', display: 'flex', alignItems: 'center' }}
                  >
                    <CheckSquare size={18} fill={task.done ? '#10B981' : 'transparent'} stroke={task.done ? '#0F172A' : 'currentColor'} />
                  </div>

                  {/* Task details */}
                  <div style={{ flex: 1 }}>
                    <span style={{ 
                      fontSize: '0.88rem', fontWeight: '500',
                      textDecoration: task.done ? 'line-through' : 'none',
                      color: task.done ? '#64748B' : 'white'
                    }}>
                      {task.title}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                      {task.project}
                    </span>
                  </div>

                  {/* Daily Focus status toggle */}
                  <button
                    onClick={() => handleToggleFocus(task.id)}
                    disabled={task.done}
                    style={{
                      background: task.focus ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                      border: task.focus ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                      color: task.focus ? '#C084FC' : '#475569',
                      padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600',
                      cursor: task.done ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {task.focus ? 'Focus Locked' : 'Add Focus'}
                  </button>

                  {/* Priority Badge */}
                  <div className={`item-badge ${task.priority === 'High' ? 'badge-primary' : (task.priority === 'Medium' ? 'badge-accent' : 'badge-success')}`}>
                    {task.priority}
                  </div>

                  {/* Delete button */}
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', opacity: 0.6 }}
                    onMouseOver={e=>e.currentTarget.style.opacity=1}
                    onMouseOut={e=>e.currentTarget.style.opacity=0.6}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
