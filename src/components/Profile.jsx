import React from 'react';
import { User, Award, Shield, Compass, Target, Flame, Activity, Zap, CheckCircle, Code, Droplet, Timer, BookOpen } from 'lucide-react';

export default function Profile({ userProfile }) {
  const profile = userProfile;

  // Badge icon selector helper
  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={20} color="#8B5CF6" />;
      case 'Droplet': return <Droplet size={20} color="#2563EB" />;
      case 'Timer': return <Timer size={20} color="#10B981" />;
      default: return <BookOpen size={20} color="#EC4899" />;
    }
  };

  // SVGs for historical Life Score
  const scoreHistory = profile.lifeScoreHistory;
  const scores = scoreHistory.map(h => h.overall);
  const minS = Math.min(...scores) - 5;
  const maxS = Math.max(...scores) + 5;
  const rangeS = maxS - minS || 1;

  const wSVG = 500;
  const hSVG = 150;
  const padSVG = 25;

  const pointsStr = scoreHistory.map((h, idx) => {
    const x = padSVG + (idx * (wSVG - padSVG * 2)) / (scoreHistory.length - 1);
    const y = hSVG - padSVG - ((h.overall - minS) * (hSVG - padSVG * 2)) / rangeS;
    return `${x},${y}`;
  }).join(' ');

  const xpPercent = Math.min(((profile.gamification.xp - 1500) / 1500) * 100, 100);

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User size={28} color="#8B5CF6" />
            <span>Profile & Gamification Engine</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Review character stats, unlocked skill badges, and historical metrics progression.
          </p>
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        
        {/* Profile Card & Demographics (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', fontWeight: 'bold', border: '3px solid rgba(255,255,255,0.06)'
            }}>
              {profile.personalInfo.name.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{profile.personalInfo.name}</h2>
              <span style={{ fontSize: '0.8rem', color: '#8B5CF6', fontWeight: '600' }}>{profile.personalInfo.profession}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Age:</span>
              <span>{profile.personalInfo.age} yrs</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Gender:</span>
              <span>{profile.personalInfo.gender}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Country:</span>
              <span>{profile.personalInfo.country}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94A3B8' }}>Target:</span>
              <span style={{ color: '#60A5FA', fontWeight: '600' }}>{profile.personalInfo.targetCareer}</span>
            </div>
          </div>
        </div>

        {/* Level & XP progression panel (8 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 8', padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Character Level</span>
              <span style={{ fontSize: '0.8rem', color: '#8B5CF6', fontWeight: '700' }}>Next level: Level 4 Achiever</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '2px', flexShrink: 0
              }}>
                <Shield size={24} color="#8B5CF6" />
                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'white' }}>Lvl {profile.gamification.level}</span>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white' }}>{profile.gamification.levelTitle}</h3>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '2px' }}>XP determines execution capability ranking. Earn XP by tracking routines.</p>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '6px' }}>
                <span>XP Accumulation</span>
                <span>{profile.gamification.xp} / 3000 XP</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${xpPercent}%`, height: '100%', background: 'linear-gradient(90deg, #2563EB, #8B5CF6)' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '20px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Weekly Habits</span>
              <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>92%</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Focus Sprints</span>
              <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', color: '#2563EB', marginTop: '4px' }}>24 logged</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Unlocks</span>
              <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '800', color: '#8B5CF6', marginTop: '4px' }}>4 Badges</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Badges Grid & Life Score History */}
      <div className="dashboard-grid">
        
        {/* Badges Display (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Earned Skill Badges</h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Unlocked by completing targets</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {profile.gamification.badges.map(badge => (
              <div 
                key={badge.id}
                style={{
                  padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '12px'
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(139,92,246,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {getBadgeIcon(badge.icon)}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: 'white' }}>{badge.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', lineHeight: '1.3' }}>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Life Score Trajectory line graph (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Life Score History</h3>
            <span style={{ fontSize: '0.8rem', color: '#8B5CF6', fontWeight: '700' }}>Index Velocity</span>
          </div>

          <div style={{ width: '100%', overflow: 'hidden' }}>
            <svg viewBox={`0 0 ${wSVG} ${hSVG}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Grid Lines */}
              {[0, 1, 2, 3].map(i => {
                const y = padSVG + (i * (hSVG - padSVG * 2)) / 3;
                const val = Math.round(maxS - (i * rangeS) / 3);
                return (
                  <g key={i}>
                    <line x1={padSVG} y1={y} x2={wSVG - padSVG} y2={y} stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <text x={padSVG - 8} y={y + 4} fill="#475569" fontSize="9" textAnchor="end">{val}</text>
                  </g>
                );
              })}

              {/* Line path */}
              <path 
                d={`M ${pointsStr}`} 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(139, 92, 246, 0.3))' }}
              />

              {/* Data points */}
              {scoreHistory.map((h, idx) => {
                const x = padSVG + (idx * (wSVG - padSVG * 2)) / (scoreHistory.length - 1);
                const y = hSVG - padSVG - ((h.overall - minS) * (hSVG - padSVG * 2)) / rangeS;
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="5" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
                    <text x={x} y={y - 10} fill="#94A3B8" fontSize="8" textAnchor="middle">{h.overall}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 10px 0 10px', borderTop: '1px solid rgba(255,255,255,0.03)', marginTop: '10px' }}>
            {scoreHistory.map((h, index) => (
              <span key={index} style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '500' }}>{h.month}</span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
