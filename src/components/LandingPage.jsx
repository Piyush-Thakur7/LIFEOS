import React, { useState } from 'react';
import { 
  Sparkles, Brain, ArrowRight, Play, Cpu, 
  Activity, BookOpen, Clock, BarChart3, CheckCircle2 
} from 'lucide-react';

export default function LandingPage({ onStartJourney, onTryCoach }) {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    { icon: Activity, title: "Health & Vitality", desc: "Integrate sleep patterns, steps tracking, hydration, and calories into a unified health score." },
    { icon: Clock, title: "Productivity Engine", desc: "Structure daily tasks with deep priority rules, Pomodoro focus cycles, and automated AI planner scheduling." },
    { icon: BookOpen, title: "Learning Hub", desc: "Master technical skills and language certifications with structured modules and progress analytics." },
    { icon: BarChart3, title: "Habit Streak Grid", desc: "Gamify daily consistency with GitHub-style habit maps that track streaks and completion metrics." },
    { icon: Brain, title: "Gemini Life Coach", desc: "Consult the core intelligence layer to generate personalized roadmaps, diagnose failures, and get reports." },
    { icon: Cpu, title: "Life Score Metrics", desc: "Synthesize all health, learning, habit, and execution stats into one absolute index representing life balance." }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glows */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        padding: '24px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.03)'
      }} className="glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
            padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Brain size={24} color="white" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.4rem', letterSpacing: '1px' }}>Life<span style={{ color: '#8B5CF6' }}>OS</span></span>
        </div>

        <nav style={{ display: 'flex', gap: '32px', fontSize: '0.95rem' }}>
          <a href="#features" style={{ color: '#94A3B8', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='#94A3B8'}>Features</a>
          <a href="#system" style={{ color: '#94A3B8', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='#94A3B8'}>Core Philosophy</a>
          <a href="#demo" style={{ color: '#94A3B8', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='#94A3B8'}>Preview</a>
        </nav>

        <button onClick={onStartJourney} className="gradient-btn" style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>
          Launch App
        </button>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 5% 60px 5%', zIndex: 5, textAlign: 'center' }}>
        <div className="float-animation" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', marginBottom: '32px' }}>
          <Sparkles size={14} color="#8B5CF6" />
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#C084FC', letterSpacing: '1px', textTransform: 'uppercase' }}>Next-Generation AI Life OS</span>
        </div>

        <h1 style={{ fontSize: '4.2rem', fontWeight: '800', lineHeight: '1.1', maxWidth: '900px', marginBottom: '24px', letterSpacing: '-1px' }}>
          Your Life. Organized. <br/>Optimized. <span className="gradient-text">Powered by AI.</span>
        </h1>

        <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '720px', lineHeight: '1.6', marginBottom: '48px' }}>
          LifeOS uses AI to help you improve your health, productivity, learning, habits, and long-term goals through personalized insights and intelligent planning.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
          <button onClick={onStartJourney} className="gradient-btn" style={{ padding: '16px 32px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Start Your Journey</span>
            <ArrowRight size={18} />
          </button>
          
          <button onClick={onTryCoach} className="btn-secondary" style={{ padding: '16px 32px', borderRadius: '12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain size={18} color="#8B5CF6" />
            <span>Try AI Coach</span>
          </button>

          <button onClick={() => setShowDemo(true)} className="btn-secondary" style={{ padding: '16px 32px', borderRadius: '12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Play size={18} color="#10B981" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Dashboard Teaser Mockup */}
        <div id="demo" className="glass-panel" style={{ width: '100%', maxWidth: '1000px', padding: '6px', borderRadius: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }} onClick={onStartJourney}>
          <div style={{ overflow: 'hidden', borderRadius: '14px', background: '#0B0F19', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            {/* Top window decorations */}
            <div style={{ display: 'flex', gap: '6px', padding: '14px 20px', background: '#0D1321', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '0.75rem', color: '#475569', marginLeft: '20px', fontFamily: 'monospace' }}>dashboard.lifeos.ai</span>
            </div>

            {/* Dashboard Visual Mock */}
            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', textAlign: 'left', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Life Score widget */}
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>OVERALL LIFE SCORE</span>
                    <span style={{ color: '#10B981', fontWeight: 'bold' }}>+4%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800' }}>83</h3>
                    <div style={{ flex: 1, background: '#1E293B', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '83%', height: '100%', background: 'linear-gradient(90deg, #2563EB, #8B5CF6)' }} />
                    </div>
                  </div>
                </div>

                {/* AI Plan widget */}
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ color: '#C084FC', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>AI DAILY PLANNER</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Complete 5 LeetCode DSA questions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span>Hydrate: Log 3.0L water</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={14} color="#475569" />
                    <span style={{ color: '#64748B' }}>15-min intensive home workout</span>
                  </div>
                </div>
              </div>

              {/* Chart widget */}
              <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>STUDY HOURS TREND</span>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '6px' }}>4.8 hrs/day average <span style={{ fontSize: '0.85rem', color: '#10B981' }}>(+18% study speed)</span></h4>
                </div>
                <div style={{ height: '120px', display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '20px' }}>
                  {[35, 45, 60, 40, 50, 75, 90, 80, 70, 85, 95].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.4) 0%, rgba(37, 99, 235, 0.1) 100%)', borderTop: '2px solid #8B5CF6', borderRadius: '2px' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Philosophy Section */}
      <section id="features" style={{ padding: '100px 8%', position: 'relative', zIndex: 5 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>Life is Complex. <span className="gradient-text">LifeOS Simplifies It.</span></h2>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            "You have an operating system for your computer. Why not for your life?"
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {features.map((feat, index) => (
            <div key={index} className="glass-panel glass-panel-accent" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '16px' }}>
              <div style={{
                background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)',
                padding: '12px', borderRadius: '12px', width: 'fit-content'
              }}>
                <feat.icon size={24} color="#8B5CF6" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{feat.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.6' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Modal Overlay */}
      {showDemo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '800px', padding: '24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }} className="gradient-text">LifeOS Dynamic Simulator</h3>
              <button 
                onClick={() => setShowDemo(false)} 
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.25rem', cursor: 'pointer' }}
                onMouseOver={e=>e.target.style.color='white'} onMouseOut={e=>e.target.style.color='#94A3B8'}
              >
                ✕
              </button>
            </div>
            
            <div style={{ background: '#0B0F19', padding: '32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.5' }}>
                Welcome to the LifeOS experience! This prototype is fully operational. When you click **Proceed** or close this box and click **Start Your Journey**, you will:
              </p>
              <ul style={{ color: '#E2E8F0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                <li>📋 Complete a custom **AI Onboarding flow** to define your target goals (e.g. IAS Officer, AI Engineer, Entrepreneur).</li>
                <li>🎯 Immediately generate your custom visual **AI Life Blueprint** containing gap analysis scores and timeline roadmaps.</li>
                <li>📊 Experience fully reactive tracking: update sleep, tasks, and water to witness your **Life Score** adjust dynamically.</li>
                <li>💬 Interact with the **Gemini AI Coach Chat** to query plans, weight regimens, and study routines.</li>
              </ul>
              <button 
                onClick={() => { setShowDemo(false); onStartJourney(); }} 
                className="gradient-btn" 
                style={{ padding: '14px 28px', borderRadius: '8px', fontWeight: '700', alignSelf: 'center', marginTop: '10px' }}
              >
                Enter Platform Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '40px 8%', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.03)', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
        <p>© 2026 LifeOS AI. Flagship Productive Optimization Operating System. All rights reserved.</p>
      </footer>
    </div>
  );
}
