import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Brain, User, Target, ClipboardList } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    age: 21,
    gender: "Male",
    country: "India",
    profession: "BCA Student",
    targetCareer: "AI Engineer",
    weight: 78,
    targetWeight: 70,
    studyHours: 4,
    sleepDuration: 6.5,
    fitnessLevel: "Beginner",
    biggestChallenge: "Procrastination & lack of structured roadmap"
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  const careers = ["AI Engineer", "Software Engineer", "Doctor", "Entrepreneur", "IAS Officer", "Designer"];
  const fitnessLevels = ["Beginner", "Intermediate", "Athletic", "Elite"];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', background: 'radial-gradient(circle at center, #1E1B4B 0%, #0F172A 100%)'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px' }}>
        
        {/* Onboarding Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain size={20} color="#8B5CF6" />
            <span style={{ fontWeight: '800', letterSpacing: '1px', fontSize: '1.1rem' }}>Life<span style={{ color: '#8B5CF6' }}>OS</span></span>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{
                width: '32px', height: '6px', borderRadius: '3px',
                background: s <= step ? 'linear-gradient(90deg, #2563EB, #8B5CF6)' : 'rgba(255,255,255,0.06)',
                transition: '0.3s'
              }} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(37, 99, 235, 0.15)', borderRadius: '8px' }}>
                  <User size={20} color="#2563EB" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Personal Profile</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Tell us about who you are</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="Enter your name" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Age</label>
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" placeholder="Age" min="12" max="120" />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Country</label>
                  <input required type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" placeholder="Country" />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Profession</label>
                  <input required type="text" name="profession" value={formData.profession} onChange={handleChange} className="input-field" placeholder="e.g. BCA Student, Designer" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Future Ambition */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.15)', borderRadius: '8px' }}>
                  <Target size={20} color="#8B5CF6" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Future Ambitions</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>What do you want to become?</p>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Select Target Career</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  {careers.map(career => (
                    <button
                      key={career}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, targetCareer: career }))}
                      style={{
                        padding: '12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', fontWeight: '600',
                        fontSize: '0.9rem', transition: '0.3s',
                        background: formData.targetCareer === career ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.02)',
                        border: formData.targetCareer === career ? '1px solid #8B5CF6' : '1px solid rgba(255,255,255,0.06)',
                        color: formData.targetCareer === career ? 'white' : '#94A3B8'
                      }}
                    >
                      {career}
                    </button>
                  ))}
                </div>
                <input
                  required
                  type="text"
                  name="targetCareer"
                  value={formData.targetCareer}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Or write custom career role..."
                />
              </div>
            </div>
          )}

          {/* STEP 3: Current Situation */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '8px' }}>
                  <ClipboardList size={20} color="#10B981" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Current Health & Habits</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Establish metrics to design your blueprint</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Current Weight (kg)</label>
                  <input required type="number" name="weight" value={formData.weight} onChange={handleChange} className="input-field" placeholder="e.g. 78" min="30" max="250" />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Target Weight (kg)</label>
                  <input required type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} className="input-field" placeholder="e.g. 70" min="30" max="250" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Daily Study Hours</label>
                  <input required type="number" step="0.5" name="studyHours" value={formData.studyHours} onChange={handleChange} className="input-field" placeholder="Hours" min="0" max="24" />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Sleep Duration (hrs)</label>
                  <input required type="number" step="0.5" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange} className="input-field" placeholder="Sleep" min="1" max="24" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Fitness Level</label>
                  <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className="input-field">
                    {fitnessLevels.map(fl => (
                      <option key={fl} value={fl}>{fl}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'block', marginBottom: '8px' }}>Biggest Challenge</label>
                  <input required type="text" name="biggestChallenge" value={formData.biggestChallenge} onChange={handleChange} className="input-field" placeholder="e.g. Sleep quality, Procrastination" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', fontWeight: '600' }}>
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '8px', fontWeight: '700' }}>
                <Sparkles size={16} />
                <span>Generate Life OS Blueprint</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
