import React from 'react';
import { BarChart2, Award, AlertTriangle, Lightbulb, TrendingUp, CheckCircle, Flame } from 'lucide-react';
import { MOCK_MONTHLY_REPORT } from '../data/defaultUserData';

export default function MonthlyAnalysis({ userProfile }) {
  const report = MOCK_MONTHLY_REPORT;

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChart2 size={28} color="#8B5CF6" />
            <span>Monthly Performance Analysis</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            AI-generated summary of habits, metrics, milestones, and strategic correlations.
          </p>
        </div>
        <div className="item-badge badge-accent" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Report Period: {report.monthName}
        </div>
      </div>

      {/* Top Review Scores cards */}
      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        
        {/* Overall life score */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>OVERALL LIFE SCORE</span>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>{report.overallLifeScore}</span>
          <span style={{ fontSize: '0.7rem', color: '#10B981' }}>Optimal Execution Balance</span>
        </div>

        {/* Health average */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>HEALTH SUMMARIES</span>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: '#10B981' }}>{report.healthScore}</span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Avg Weight Loss Deficit: 0.5kg/wk</span>
        </div>

        {/* Productivity execution */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>PRODUCTIVITY SUMMARIES</span>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: '#2563EB' }}>{report.productivityScore}</span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Task completion rate: 72%</span>
        </div>

        {/* Habits consistency */}
        <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', letterSpacing: '0.5px' }}>HABITS CONSISTENCY</span>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: '#EC4899' }}>{report.habitsScore}</span>
          <span style={{ fontSize: '0.7rem', color: '#10B981' }}>Consistency: 85% check rate</span>
        </div>

      </div>

      {/* Row 2: Achievements vs Missed Goals */}
      <div className="dashboard-grid" style={{ marginBottom: '32px' }}>
        
        {/* Achievements (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', marginBottom: '20px' }}>
            <Award size={18} />
            <span>Key Achievements</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {report.achievements.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#E2E8F0', lineHeight: '1.4' }}>
                <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missed Goals (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', marginBottom: '20px' }}>
            <AlertTriangle size={18} />
            <span>Missed Objectives</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {report.missedGoals.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#94A3B8', lineHeight: '1.4' }}>
                <AlertTriangle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Strengths/Weaknesses and AI Recommendation */}
      <div className="dashboard-grid">
        
        {/* Strengths & Weaknesses (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', marginBottom: '16px' }}>Behavioral Diagnostics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10B981', display: 'block', marginBottom: '8px' }}>STRENGTHS</span>
                <ul style={{ paddingLeft: '14px', fontSize: '0.82rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {report.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#EF4444', display: 'block', marginBottom: '8px' }}>WEAKNESSES</span>
                <ul style={{ paddingLeft: '14px', fontSize: '0.82rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {report.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight report card (6 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(37,99,235,0.03) 100%)', border: '1px solid rgba(139,92,246,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="#8B5CF6" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>Gemini Correlative Insight</h3>
          </div>
          
          <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: '1.5' }}>
            {report.aiInsights}
          </p>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: '#C084FC', fontWeight: '700', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recommended adjustments</span>
            <ul style={{ paddingLeft: '14px', fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {report.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
