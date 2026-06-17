import React, { useState } from 'react';
import { Users, Cpu, Activity, BookOpen, Lightbulb, Palette, Flame, ShieldAlert, Award, Star } from 'lucide-react';
import { INITIAL_COMMUNITIES } from '../data/defaultUserData';

export default function Community({ addXp }) {
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES);
  const [activeCommunity, setActiveCommunity] = useState('AI Engineers');
  const [loggedToday, setLoggedToday] = useState(false);
  const [notification, setNotification] = useState('');

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleJoinLeave = (name) => {
    if (activeCommunity === name) {
      setActiveCommunity(null);
      triggerNotification(`Left "${name}" community`);
    } else {
      setActiveCommunity(name);
      addXp(30);
      triggerNotification(`Joined "${name}" community! (+30 XP)`);
    }
  };

  // Contribute points to active community
  const handleContribute = () => {
    if (!activeCommunity || loggedToday) return;

    setCommunities(prev => {
      const updated = prev.map(c => {
        if (c.name === activeCommunity) {
          addXp(50);
          triggerNotification(`Contributed 100 points to ${c.name}! (+50 XP for you!)`);
          return {
            ...c,
            points: c.points + 100,
            weeklyStudyHours: c.weeklyStudyHours + 2,
            dailyConsistency: Math.min(c.dailyConsistency + 1, 100)
          };
        }
        return c;
      });
      // Sort by points descending to recalculate rank
      return [...updated].sort((a, b) => b.points - a.points);
    });

    setLoggedToday(true);
  };

  // Map icon strings to Lucide components
  const getIcon = (iconStr) => {
    switch (iconStr) {
      case 'Cpu': return <Cpu size={20} color="#8B5CF6" />;
      case 'Activity': return <Activity size={20} color="#10B981" />;
      case 'Book': return <BookOpen size={20} color="#3B82F6" />;
      case 'Lightbulb': return <Lightbulb size={20} color="#F59E0B" />;
      default: return <Palette size={20} color="#EC4899" />;
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={28} color="#2563EB" />
            <span>Competitive Communities</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Join focus guilds and collaborate on study hours and daily consistency indexes.
          </p>
        </div>
        <div className="item-badge badge-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Leaderboard Active
        </div>
      </div>

      {/* Floating Success Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', background: '#2563EB', color: 'white',
          padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)', zIndex: 1000, fontWeight: '600'
        }}>
          <Star size={16} fill="white" />
          <span>{notification}</span>
        </div>
      )}

      <div className="dashboard-grid">
        
        {/* Left Side: Communities List (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>Active Guild Leaderboards</span>
              <span style={{ fontSize: '0.75rem', color: '#475569' }}>Sorted by total points index</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {communities.map((c, index) => {
                const isJoined = activeCommunity === c.name;
                return (
                  <div 
                    key={c.name}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px',
                      background: isJoined ? 'rgba(37,99,235,0.03)' : 'rgba(255,255,255,0.01)',
                      border: isJoined ? '1px solid rgba(37,99,235,0.15)' : '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '14px', transition: '0.2s'
                    }}
                  >
                    {/* Rank Indicator */}
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: index === 0 ? 'rgba(245,158,11,0.15)' : (index === 1 ? 'rgba(148,163,184,0.15)' : 'transparent'),
                      color: index === 0 ? '#F59E0B' : (index === 1 ? '#94A3B8' : '#475569'),
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem'
                    }}>
                      #{index + 1}
                    </div>

                    {/* Icon */}
                    <div style={{
                      padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {getIcon(c.icon)}
                    </div>

                    {/* Channel name / members */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>{c.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{(c.members).toLocaleString()} members</span>
                    </div>

                    {/* Telemetry Metrics */}
                    <div style={{ display: 'flex', gap: '24px', textAlign: 'right', marginRight: '16px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B' }}>WEEKLY STUDY</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white' }}>{c.weeklyStudyHours}h avg</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B' }}>CONSISTENCY</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981' }}>{c.dailyConsistency}%</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B' }}>INDEX POINTS</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#8B5CF6' }}>{c.points}</span>
                      </div>
                    </div>

                    {/* Join/Leave Button */}
                    <button
                      onClick={() => handleJoinLeave(c.name)}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem',
                        background: isJoined ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255,255,255,0.03)',
                        border: isJoined ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(255,255,255,0.05)',
                        color: isJoined ? '#F87171' : 'white', transition: '0.2s'
                      }}
                    >
                      {isJoined ? 'Leave Guild' : 'Join'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Focus Contribution panel (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#8B5CF6" />
              <span>Guild Execution Portal</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Help your team climb rankings</span>
          </div>

          {activeCommunity ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', justifyContent: 'space-between' }}>
              <div style={{ background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.1)', padding: '16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>YOUR GUILD IN FOCUS</span>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', display: 'block', marginTop: '4px' }}>
                  {activeCommunity}
                </span>
                <p style={{ fontSize: '0.8rem', color: '#8B5CF6', marginTop: '6px', lineHeight: '1.4' }}>
                  Log focused studies to add +100 points to the board today.
                </p>
              </div>

              <button
                onClick={handleContribute}
                disabled={loggedToday}
                className="gradient-btn"
                style={{
                  padding: '14px', borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  opacity: loggedToday ? 0.6 : 1, cursor: loggedToday ? 'not-allowed' : 'pointer'
                }}
              >
                <Flame size={18} fill="white" />
                <span>{loggedToday ? 'Contributed Today' : 'Contribute 100 Points'}</span>
              </button>
            </div>
          ) : (
            <div style={{
              padding: '24px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px', border: '1px dashed rgba(255,255,255,0.06)',
              borderRadius: '12px', color: '#64748B', fontSize: '0.85rem'
            }}>
              <ShieldAlert size={28} />
              <span>Join a community from the list to contribute focus metrics and push weekly ranks.</span>
            </div>
          )}

          <div style={{
            background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)',
            padding: '16px', borderRadius: '12px', marginTop: 'auto'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '800', letterSpacing: '0.5px' }}>GUILD LAWS</span>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px', lineHeight: '1.4' }}>
              LifeOS communities compete purely on study speed, metrics completion rates, and habit consistency. Financial stakes are strictly forbidden.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
