import React from 'react';
import { 
  LayoutDashboard, Brain, Activity, CheckSquare, 
  BookOpen, Calendar, MessageSquare, BarChart2, 
  Users, User, LogOut 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userProfile, onLogout }) {
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blueprint', label: 'AI Blueprint', icon: Brain },
    { id: 'health', label: 'Health Hub', icon: Activity },
    { id: 'productivity', label: 'Productivity', icon: CheckSquare },
    { id: 'learning', label: 'Learning Hub', icon: BookOpen },
    { id: 'habits', label: 'Habit Streaks', icon: Calendar },
    { id: 'coach', label: 'Gemini Coach', icon: MessageSquare },
    { id: 'monthly', label: 'Monthly Review', icon: BarChart2 },
    { id: 'community', label: 'Communities', icon: Users },
    { id: 'profile', label: 'Profile & Level', icon: User }
  ];

  const xpPercent = Math.min(((userProfile.gamification.xp - 1500) / 1500) * 100, 100);

  return (
    <div style={{
      width: '260px', height: '100vh', padding: '24px 16px', display: 'flex', flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,0.06)', background: '#0D1321', position: 'fixed', top: 0, left: 0, zIndex: 100
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
          padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Brain size={22} color="white" />
        </div>
        <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '0.5px' }}>Life<span style={{ color: '#8B5CF6' }}>OS</span></span>
      </div>

      {/* User Quick Gamified Widget */}
      <div style={{
        padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: '12px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem'
          }}>
            {userProfile.personalInfo.name.charAt(0)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {userProfile.personalInfo.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: '600' }}>
              Level {userProfile.gamification.level} • {userProfile.gamification.levelTitle}
            </div>
          </div>
        </div>

        {/* Progress Bar to next level */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8', marginBottom: '4px' }}>
            <span>Progress to Level 4</span>
            <span>{userProfile.gamification.xp} XP</span>
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${xpPercent}%`, height: '100%', background: 'linear-gradient(90deg, #2563EB, #8B5CF6)' }} />
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontWeight: isActive ? '600' : '500', fontSize: '0.88rem',
                background: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                color: isActive ? '#60A5FA' : '#94A3B8',
                transition: '0.2s',
                borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                textAlign: 'left'
              }}
              onMouseOver={e => {
                if(!isActive) {
                  e.target.style.background = 'rgba(255,255,255,0.03)';
                  e.target.style.color = 'white';
                }
              }}
              onMouseOut={e => {
                if(!isActive) {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#94A3B8';
                }
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#60A5FA' : '#64748B', transition: '0.2s' }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
          padding: '12px 14px', borderRadius: '10px', border: 'none', background: 'transparent',
          color: '#F87171', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '500',
          fontSize: '0.88rem', marginTop: '16px', textAlign: 'left'
        }}
        onMouseOver={e => e.target.style.background = 'rgba(239, 68, 68, 0.08)'}
        onMouseOut={e => e.target.style.background = 'transparent'}
      >
        <LogOut size={18} />
        <span>Return Home</span>
      </button>
    </div>
  );
}
