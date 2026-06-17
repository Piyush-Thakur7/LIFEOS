import React, { useState, useEffect, useRef } from 'react';
import { Brain, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { generateGeminiReply } from '../data/defaultUserData';

export default function AICoach({ userProfile, healthData, productivityData, habitsData, learningData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello Aarav! I am **Gemini**, the core intelligence layer of your **LifeOS**.

I analyze your steps, sleep logs, Pomodoro cycles, habit checklists, and learning progress to help you transition from a **BCA Student** to an **AI Engineer**.

Here are some strategies I can run for you:
- 🗺️ *Generate a personalized career roadmap*
- ⚖️ *Diagnose weight loss performance*
- 📅 *Generate an optimized weekly study schedule*
- 📊 *Review your productivity logs and streaks*

Select one of the suggestion chips below or ask me any question directly!`,
      timestamp: '14:40'
    }
  ]);
  
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking and reply streaming
    setTimeout(() => {
      const aiReplyData = generateGeminiReply(
        query, 
        userProfile, 
        healthData, 
        productivityData, 
        learningData, 
        habitsData
      );

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: aiReplyData.suggestedPrompts
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const presetSuggestions = [
    "How do I become an AI Engineer?",
    "Create a study plan.",
    "How can I lose weight?",
    "Analyze my last month."
  ];

  // Helper to format bot markdown text to styled HTML paragraphs
  const renderMessageText = (text) => {
    // Basic parser for **bold** and ### headers and list items
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;
      
      // Headers
      if (content.startsWith('### ')) {
        return <h3 key={idx} style={{ fontSize: '1.15rem', fontWeight: '800', marginTop: '16px', marginBottom: '8px', color: '#C084FC' }}>{content.replace('### ', '')}</h3>;
      }
      if (content.startsWith('#### ')) {
        return <h4 key={idx} style={{ fontSize: '0.98rem', fontWeight: '700', marginTop: '12px', marginBottom: '6px', color: '#60A5FA' }}>{content.replace('#### ', '')}</h4>;
      }

      // Bold formatting helper
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      const formattedElements = [];
      let lastIndex = 0;
      
      while ((match = boldRegex.exec(content)) !== null) {
        // text before bold
        if (match.index > lastIndex) {
          formattedElements.push(content.substring(lastIndex, match.index));
        }
        // bold text
        formattedElements.push(<strong key={match.index} style={{ color: 'white' }}>{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        formattedElements.push(content.substring(lastIndex));
      }

      const finalLine = formattedElements.length > 0 ? formattedElements : content;

      // Table formatting check
      if (content.startsWith('|') && content.endsWith('|') && !content.includes('---')) {
        const cells = content.split('|').map(c => c.trim()).filter(Boolean);
        return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 3fr 2fr', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.85rem' }}>
            {cells.map((cell, cidx) => <span key={cidx}>{cell}</span>)}
          </div>
        );
      } else if (content.includes('---') && content.includes('|')) {
        return null; // Skip table header separator line
      }

      // Bullets
      if (content.trim().startsWith('- ') || content.trim().startsWith('• ')) {
        return (
          <ul key={idx} style={{ paddingLeft: '20px', margin: '4px 0' }}>
            <li style={{ fontSize: '0.92rem', color: '#E2E8F0' }}>{finalLine}</li>
          </ul>
        );
      }

      return <p key={idx} style={{ fontSize: '0.92rem', color: '#E2E8F0', lineHeight: '1.6', marginBottom: '8px' }}>{finalLine}</p>;
    });
  };

  return (
    <div style={{ padding: '30px', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Coach Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Brain size={28} color="#8B5CF6" className="glow-pulse" style={{ borderRadius: '50%' }} />
            <span>Gemini AI Life Coach</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Ask questions, generate strategy audits, and optimize schedule priorities.
          </p>
        </div>
        <button 
          onClick={() => setMessages(m => [m[0]])}
          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          onMouseOver={e=>e.currentTarget.style.color='white'}
          onMouseOut={e=>e.currentTarget.style.color='#94A3B8'}
        >
          <RefreshCw size={14} />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Chat Messages Viewport */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
        {messages.map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              gap: '12px',
              alignSelf: msg.sender === 'ai' ? 'flex-start' : 'flex-end',
              flexDirection: msg.sender === 'ai' ? 'row' : 'row-reverse',
              maxWidth: '85%'
            }}
          >
            {/* Avatar Icon */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: msg.sender === 'ai' ? 'linear-gradient(135deg, #2563EB, #8B5CF6)' : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {msg.sender === 'ai' ? <Brain size={18} color="white" /> : <User size={18} color="white" />}
            </div>

            {/* Bubble */}
            <div style={{
              padding: '16px 20px',
              background: msg.sender === 'ai' ? 'rgba(30,41,59,0.5)' : 'linear-gradient(135deg, #2563EB, #8B5CF6)',
              border: msg.sender === 'ai' ? '1px solid rgba(255,255,255,0.05)' : 'none',
              borderRadius: msg.sender === 'ai' ? '0 16px 16px 16px' : '16px 0 16px 16px',
              color: 'white',
              boxShadow: msg.sender === 'ai' ? 'none' : '0 8px 24px rgba(37,99,235,0.2)'
            }}>
              <div style={{ fontSize: '0.92rem' }}>
                {renderMessageText(msg.text)}
              </div>
              
              {/* Message Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px', fontSize: '0.7rem', color: '#64748B' }}>
                {msg.timestamp}
              </div>

              {/* Dynamic suggestion chips inside response */}
              {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  {msg.suggestedPrompts.map((chip, cidx) => (
                    <button
                      key={cidx}
                      onClick={() => handleSend(chip)}
                      style={{
                        padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(139,92,246,0.3)',
                        background: 'rgba(139,92,246,0.08)', color: '#C084FC', fontSize: '0.8rem',
                        cursor: 'pointer', transition: '0.2s'
                      }}
                      onMouseOver={e=>e.currentTarget.style.background='rgba(139,92,246,0.18)'}
                      onMouseOut={e=>e.currentTarget.style.background='rgba(139,92,246,0.08)'}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Brain size={18} color="white" />
            </div>
            <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '0 16px 16px 16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6', animation: 'float 1s infinite' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6', animation: 'float 1s infinite 0.2s' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B5CF6', animation: 'float 1s infinite 0.4s' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Prompt Chips */}
      {messages.length === 1 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px', paddingLeft: '4px' }}>
          {presetSuggestions.map((prompt, pidx) => (
            <button
              key={pidx}
              onClick={() => handleSend(prompt)}
              style={{
                padding: '10px 16px', borderRadius: '9999px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                color: '#94A3B8', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: '0.2s'
              }}
              onMouseOver={e=>{e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';}}
              onMouseOut={e=>{e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.05)';}}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input panel */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask Gemini to analyze productivity, compile roadmaps, suggest weight programs..."
          className="input-field"
          style={{ padding: '16px 20px', fontSize: '0.95rem', borderRadius: '12px' }}
        />
        <button 
          onClick={() => handleSend()}
          className="gradient-btn"
          style={{ width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <Send size={20} color="white" />
        </button>
      </div>

    </div>
  );
}
