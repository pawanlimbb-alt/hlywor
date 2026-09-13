import React, { useState } from 'react';

const PROMPTS = [
  { q: "What is a conversation you rehearsed 100 times in your head, but never actually had?", title: "The Conversation I Never Had" },
  { q: "What is something you forgave someone for, but will never forget?", title: "Forgiven, But Never Forgotten" },
  { q: "Tell us about a place you can never visit the same way again.", title: "A Place That Changed" },
  { q: "What was the text you typed out at 2:47 AM and then deleted?", title: "The Message I Deleted" },
  { q: "Who was someone that changed your life, but doesn't even know it?", title: "To The Stranger Who Changed Me" }
];

export default function PromptSheet() {
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);

  const fetchAI3AMPrompt = async () => {
    const key = window.HLYWOR_GEMINI_KEY || localStorage.getItem('hlywor_gemini_key');
    if (!key) return null;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Generate ONE deeply emotional, nostalgic 3 AM journaling prompt question for HlyWor. Return JSON: {\"q\": \"...\", \"title\": \"...\"}"
            }]
          }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (parsed.q && parsed.title) return parsed;
      }
    } catch (e) {
      console.warn("AI prompt fallback", e);
    }
    return null;
  };

  const handleShuffle = async () => {
    setRotation(prev => prev + 360);
    setLoading(true);
    const aiPrompt = await fetchAI3AMPrompt();
    if (aiPrompt) {
      setCurrentPrompt(aiPrompt);
    } else {
      const nextIdx = (index + 1) % PROMPTS.length;
      setIndex(nextIdx);
      setCurrentPrompt(PROMPTS[nextIdx]);
    }
    setLoading(false);
  };

  return (
    <div className="midnight-prompt-sheet reveal">
      <div className="midnight-pin"></div>
      <div className="prompt-header">
        <span className="prompt-label">✨ 3 AM PROMPT</span>
        <button 
          type="button" 
          className="prompt-shuffle-btn" 
          onClick={handleShuffle}
          disabled={loading}
          style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s' }}
        >
          {loading ? '✨ Generating...' : '⟳ shuffle'}
        </button>
      </div>
      <p className="prompt-question">"{currentPrompt.q}"</p>
      <div className="prompt-actions">
        <a 
          href={`/submit?prompt=${encodeURIComponent(currentPrompt.q)}&title=${encodeURIComponent(currentPrompt.title)}`} 
          className="prompt-write-btn"
        >
          Write this ✍️
        </a>
      </div>
    </div>
  );
}