import React, { useState } from 'react';
import { BookOpen, Award, PlusCircle, CheckCircle, GraduationCap, ChevronRight } from 'lucide-react';

export default function LearningTracker({ learningData, setLearningData, addXp }) {
  const [successMsg, setSuccessMsg] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Core Development');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Log study session helper
  const handleLogStudy = (courseId) => {
    setLearningData(prev => {
      const updatedCourses = prev.courses.map(course => {
        if (course.id === courseId) {
          const newProgress = Math.min(course.progress + 5, 100);
          addXp(30);
          triggerSuccess(`Logged 1 hour study for ${course.name}! (+5% progress, +30 XP!)`);
          return { ...course, progress: newProgress };
        }
        return course;
      });
      return { ...prev, courses: updatedCourses };
    });
  };

  // Add course helper
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;

    const newCourse = {
      id: Date.now(),
      name: newCourseName,
      category: newCourseCategory,
      progress: 0,
      duration: '20h total',
      instructor: 'Self-Directed Study'
    };

    setLearningData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
    addXp(50);
    triggerSuccess(`Enrolled in new skill course: "${newCourseName}" (+50 XP!)`);
    setNewCourseName('');
  };

  return (
    <div style={{ padding: '30px' }}>
      
      {/* Module Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={28} color="#8B5CF6" />
            <span>Learning & Skill Acquisition</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Master technical topics, languages, and track certification blueprints.
          </p>
        </div>
        <div className="item-badge badge-accent" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Active Courses: {learningData.courses.length}
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', background: '#8B5CF6', color: 'white',
          padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)', zIndex: 1000, fontWeight: '600'
        }}>
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid of Courses & Certifications */}
      <div className="dashboard-grid">
        
        {/* Main Courses list (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Add Course Quick Form */}
          <form onSubmit={handleAddCourse} className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Course/Skill Name</label>
              <input 
                required 
                type="text" 
                value={newCourseName} 
                onChange={e => setNewCourseName(e.target.value)} 
                placeholder="e.g. Next.js Architecture, System Design" 
                className="input-field" 
                style={{ padding: '10px' }}
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Category</label>
              <select value={newCourseCategory} onChange={e => setNewCourseCategory(e.target.value)} className="input-field" style={{ padding: '10px' }}>
                <option value="Core Development">Core Development</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Software Architecture">Software Architecture</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>

            <button type="submit" className="gradient-btn" style={{ padding: '10px 20px', borderRadius: '8px', height: '42px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PlusCircle size={18} />
              <span>Enroll</span>
            </button>
          </form>

          {/* Courses Progress Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {learningData.courses.map(course => (
              <div key={course.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justify: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="item-badge badge-accent" style={{ fontSize: '0.65rem' }}>{course.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{course.duration}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginTop: '10px', lineHeight: '1.4' }}>{course.name}</h3>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>Instructor: {course.instructor}</span>
                </div>

                <div>
                  {/* Progress bar and ring combo */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '6px' }}>
                    <span>Curriculum Progress</span>
                    <span style={{ color: '#8B5CF6', fontWeight: '700' }}>{course.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, #2563EB, #8B5CF6)' }} />
                  </div>

                  <button 
                    onClick={() => handleLogStudy(course.id)}
                    style={{
                      width: '100%', padding: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s'
                    }}
                    onMouseOver={e=>e.currentTarget.style.background='rgba(139, 92, 246, 0.15)'}
                    onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.03)'}
                  >
                    <GraduationCap size={16} />
                    <span>Study 1 Hour (+5%)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Certifications & Milestone panel (4 cols) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#8B5CF6" />
              <span>Certificates & Badges</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Validating skill milestones</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {learningData.certifications.map((cert, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '16px', borderRadius: '12px',
                  background: cert.status === 'Earned' ? 'rgba(16,185,129,0.03)' : 'rgba(255,255,255,0.01)',
                  border: cert.status === 'Earned' ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', gap: '12px'
                }}
              >
                <div style={{
                  padding: '8px', borderRadius: '8px',
                  background: cert.status === 'Earned' ? 'rgba(16,185,129,0.15)' : 'rgba(139,92,246,0.1)'
                }}>
                  <Award size={18} color={cert.status === 'Earned' ? '#10B981' : '#8B5CF6'} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#E2E8F0' }}>{cert.name}</h4>
                  <span style={{ fontSize: '0.72rem', color: cert.status === 'Earned' ? '#10B981' : '#8B5CF6', fontWeight: '600', display: 'block', marginTop: '2px' }}>
                    {cert.status} • {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(139,92,246,0.05) 100%)',
            border: '1px solid rgba(37,99,235,0.15)', padding: '16px', borderRadius: '12px', marginTop: 'auto'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#60A5FA', letterSpacing: '0.5px' }}>LEARNING PATHWAY</span>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px', lineHeight: '1.4' }}>
              Your DSA progress is at <strong>42%</strong>. Completing recursion modules will unlock the <strong>"Stack Overload"</strong> learning badge next week.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
