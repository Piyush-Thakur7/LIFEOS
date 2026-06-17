import React, { useState } from 'react';
import { Activity, Droplet, Footprints, Moon, Weight, Scale, PlusCircle, CheckCircle } from 'lucide-react';

export default function HealthTracker({ healthData, setHealthData, addXp }) {
  const [logWeight, setLogWeight] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Add water helper
  const handleAddWater = () => {
    setHealthData(prev => {
      const newVal = Math.min(prev.waterToday + 0.25, 5.0);
      addXp(15);
      triggerSuccess('Logged +250ml Water (Earned +15 XP!)');
      return { ...prev, waterToday: parseFloat(newVal.toFixed(2)) };
    });
  };

  // Add steps helper
  const handleAddSteps = () => {
    setHealthData(prev => {
      const newVal = prev.stepsToday + 1000;
      addXp(25);
      triggerSuccess('Logged +1,000 Steps (Earned +25 XP!)');
      return { ...prev, stepsToday: newVal };
    });
  };

  // Add sleep helper
  const handleAddSleep = () => {
    setHealthData(prev => {
      const newVal = Math.min(prev.sleepToday + 0.5, 15.0);
      addXp(20);
      triggerSuccess('Logged +30 mins Sleep (Earned +20 XP!)');
      return { ...prev, sleepToday: parseFloat(newVal.toFixed(1)) };
    });
  };

  // Log weight helper
  const handleLogWeight = (e) => {
    e.preventDefault();
    if (!logWeight || isNaN(logWeight)) return;
    
    setHealthData(prev => {
      const weightNum = parseFloat(logWeight);
      const newHistory = [...prev.weightHistory, { date: 'Jun 17', weight: weightNum }];
      addXp(50);
      triggerSuccess(`Logged weight ${weightNum} kg! (Earned +50 XP)`);
      return { ...prev, weightHistory: newHistory };
    });
    setLogWeight('');
  };

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Weight SVG calculations
  const weightPoints = healthData.weightHistory.map(w => w.weight);
  const minW = Math.min(...weightPoints) - 1;
  const maxW = Math.max(...weightPoints) + 1;
  const rangeW = maxW - minW || 1;
  
  const widthSVG = 500;
  const heightSVG = 150;
  const paddingSVG = 25;

  const pointsString = healthData.weightHistory.map((w, index) => {
    const x = paddingSVG + (index * (widthSVG - paddingSVG * 2)) / (healthData.weightHistory.length - 1);
    const y = heightSVG - paddingSVG - ((w.weight - minW) * (heightSVG - paddingSVG * 2)) / rangeW;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={28} color="#10B981" />
            <span>Health & Fitness Hub</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Manage calories, hydration, workout logs, and weight progressions.
          </p>
        </div>
        <div className="item-badge badge-success" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Health Score: {healthData.healthScore}/100
        </div>
      </div>

      {/* Floating Success Notification */}
      {successMsg && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', background: '#10B981', color: 'white',
          padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)', zIndex: 1000, fontWeight: '600',
          animation: 'float 3s ease'
        }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Top Telemetry Widgets */}
      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        
        {/* Weight / Scale widget */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981' }}>
            <Weight size={20} />
            <span style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Weight Metric</span>
          </div>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>
              {healthData.weightHistory[healthData.weightHistory.length - 1].weight} <span style={{ fontSize: '1rem', color: '#94A3B8' }}>kg</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
              Target Weight: 70.0 kg
            </span>
          </div>
          
          <form onSubmit={handleLogWeight} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <input 
              type="number" 
              step="0.1" 
              value={logWeight} 
              onChange={e => setLogWeight(e.target.value)} 
              placeholder="e.g. 77.5" 
              className="input-field" 
              style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
            />
            <button type="submit" style={{ background: '#10B981', border: 'none', color: '#0F172A', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={18} />
            </button>
          </form>
        </div>

        {/* Water widget */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3B82F6', marginBottom: '8px' }}>
              <Droplet size={20} />
              <span style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Hydration Tracker</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>
              {healthData.waterToday} <span style={{ fontSize: '1rem', color: '#94A3B8' }}>/ 3.0 Liters</span>
            </span>
          </div>
          
          <button 
            onClick={handleAddWater}
            style={{
              background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60A5FA', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(59, 130, 246, 0.25)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(59, 130, 246, 0.15)'}
          >
            <PlusCircle size={16} />
            <span>Drink +250ml</span>
          </button>
        </div>

        {/* Steps widget */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F59E0B', marginBottom: '8px' }}>
              <Footprints size={20} />
              <span style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Daily Steps</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>
              {healthData.stepsToday} <span style={{ fontSize: '1rem', color: '#94A3B8' }}>/ 10,000</span>
            </span>
          </div>
          
          <button 
            onClick={handleAddSteps}
            style={{
              background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#FBBF24', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(245, 158, 11, 0.25)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(245, 158, 11, 0.15)'}
          >
            <PlusCircle size={16} />
            <span>Walk +1,000 steps</span>
          </button>
        </div>

        {/* Sleep widget */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8B5CF6', marginBottom: '8px' }}>
              <Moon size={20} />
              <span style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Rest & Sleep</span>
            </div>
            <span style={{ fontSize: '2rem', fontWeight: '800' }}>
              {healthData.sleepToday} <span style={{ fontSize: '1rem', color: '#94A3B8' }}>/ 7.5 hrs</span>
            </span>
          </div>
          
          <button 
            onClick={handleAddSleep}
            style={{
              background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#C084FC', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer',
              fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(139, 92, 246, 0.25)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(139, 92, 246, 0.15)'}
          >
            <PlusCircle size={16} />
            <span>Rest +30 mins</span>
          </button>
        </div>

      </div>

      {/* Analytics Charts & Trends */}
      <div className="dashboard-grid">
        
        {/* SVG Weight Line Chart (8 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 8', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Weight Progress Analysis</h3>
            <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '600' }}>Linear Loss Deficit Trend</span>
          </div>
          
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <svg viewBox={`0 0 ${widthSVG} ${heightSVG}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Grid Lines */}
              {[0, 1, 2, 3].map(i => {
                const y = paddingSVG + (i * (heightSVG - paddingSVG * 2)) / 3;
                const value = Math.round(maxW - (i * rangeW) / 3);
                return (
                  <g key={i}>
                    <line x1={paddingSVG} y1={y} x2={widthSVG - paddingSVG} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <text x={paddingSVG - 8} y={y + 4} fill="#475569" fontSize="9" textAnchor="end">{value}kg</text>
                  </g>
                );
              })}

              {/* Connected Line Path */}
              <path 
                d={`M ${pointsString}`} 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(16, 185, 129, 0.3))' }}
              />

              {/* Circular Data Nodes */}
              {healthData.weightHistory.map((w, index) => {
                const x = paddingSVG + (index * (widthSVG - paddingSVG * 2)) / (healthData.weightHistory.length - 1);
                const y = heightSVG - paddingSVG - ((w.weight - minW) * (heightSVG - paddingSVG * 2)) / rangeW;
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="5" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
                    <text x={x} y={y - 10} fill="#94A3B8" fontSize="8" textAnchor="middle">{w.weight}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0 10px', borderTop: '1px solid rgba(255,255,255,0.03)', marginTop: '10px' }}>
            {healthData.weightHistory.map((w, index) => (
              <span key={index} style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '500' }}>{w.date}</span>
            ))}
          </div>
        </div>

        {/* Weekly Trend Explainer Widget (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: '#E2E8F0' }}>AI Health Patterns</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.5' }}>
              <p>
                ⚖️ <strong>Weight Trend:</strong> You have lost <strong>3.2 kg</strong> over the last 6 weeks, placing you at a consistent 0.5kg/week loss velocity. 
              </p>
              <p>
                💧 <strong>Water intake:</strong> Your consistency sits at <strong>85%</strong>. Logging 3.0L water correlates with a 12% lower morning cortisol level.
              </p>
              <p>
                🚶 <strong>Daily Steps:</strong> You average <strong>8,250 steps</strong>. Walking helps sustain your metabolic deficit target of 450 kcal/day.
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '16px', marginTop: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700', display: 'block', letterSpacing: '1px', textTransform: 'uppercase' }}>Weekly Insight</span>
            <p style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '4px' }}>
              Deficit is highly stable. Rest quality requires optimization; recommend logging sleep before 11 PM.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
