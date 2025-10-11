// Guest mode utility functions

export const isGuestMode = () => {
  return window.location.pathname.startsWith('/guest') || 
         (!localStorage.getItem('auth-storage') && window.location.pathname === '/');
};

export const generateGuestAnalysis = () => {
  const fillerWords = ['um', 'ah', 'uh', 'like', 'you know', 'so', 'well', 'actually', 'basically'];
  const transcript = "Hello, this is a sample speech analysis. Um, I think that speaking clearly is important. Ah, it helps with communication. You know, when we speak with confidence, people listen better. So, practice makes perfect. Actually, this is just a demonstration of our analysis capabilities.";
  
  // Generate random filler word counts
  const fillerWordCounts = {};
  fillerWords.forEach(word => {
    fillerWordCounts[word] = Math.floor(Math.random() * 8);
  });
  
  const totalFillerWords = Object.values(fillerWordCounts).reduce((sum, count) => sum + count, 0);
  
  // Generate scores with some variation
  const clarityScore = Math.floor(Math.random() * 30) + 70; // 70-100
  const confidenceScore = Math.floor(Math.random() * 25) + 75; // 75-100
  const fluencyScore = Math.floor(Math.random() * 20) + 80; // 80-100
  const paceScore = Math.floor(Math.random() * 35) + 65; // 65-100
  const toneScore = Math.floor(Math.random() * 25) + 75; // 75-100
  
  const overallScore = Math.round((clarityScore + confidenceScore + fluencyScore + paceScore + toneScore) / 5);
  
  return {
    overallScore,
    transcript,
    metrics: {
      clarity: clarityScore,
      confidence: confidenceScore,
      fluency: fluencyScore,
      pace: paceScore,
      tone: toneScore
    },
    fillerWords: fillerWordCounts,
    totalFillerWords,
    pace: {
      wordsPerMinute: Math.floor(Math.random() * 40) + 140, // 140-180 WPM
      status: Math.random() > 0.5 ? 'Good' : Math.random() > 0.5 ? 'Too Fast' : 'Too Slow'
    },
    recommendations: [
      "Try to reduce filler words like 'um' and 'ah'",
      "Practice speaking at a steady pace",
      "Work on projecting confidence in your voice",
      "Consider pausing instead of using filler words",
      "Focus on clear pronunciation of consonants"
    ],
    strengths: [
      "Good vocal clarity",
      "Appropriate volume level",
      "Clear pronunciation",
      "Engaging tone variation"
    ],
    areasForImprovement: [
      "Reduce filler word usage",
      "Maintain consistent pace",
      "Build more confidence in delivery",
      "Practice smooth transitions between ideas"
    ],
    isGuestMode: true,
    createdAt: new Date().toISOString()
  };
};

export const getGuestBenefits = () => {
  return {
    features: [
      "Try speech recording and analysis",
      "Experience all core features",
      "No account required",
      "Instant results"
    ],
    limitations: [
      "Results are not saved",
      "No progress tracking",
      "No analysis history",
      "Limited to current session"
    ]
  };
};

export const getAccountBenefits = () => {
  return {
    features: [
      "Save all analysis results",
      "Track progress over time",
      "Access complete history",
      "Personalized recommendations",
      "Export data and reports",
      "Advanced analytics"
    ],
    premium: [
      "Unlimited recordings",
      "Advanced AI insights",
      "Custom practice plans",
      "Priority support"
    ]
  };
};

export const showGuestPrompt = (context = 'analysis') => {
  const prompts = {
    analysis: {
      title: "Want to save your results?",
      description: "Create an account to save this analysis and track your progress over time.",
      showProgress: true
    },
    recording: {
      title: "Unlock full features",
      description: "Sign up to save your recordings and access advanced analytics.",
      showProgress: false
    },
    progress: {
      title: "Track your improvement",
      description: "Create an account to see your speech improvement over time.",
      showProgress: true
    }
  };
  
  return prompts[context] || prompts.analysis;
};

export const redirectToAuth = (type = 'register') => {
  const url = type === 'login' ? '/login' : '/register';
  window.location.href = url;
};

export const saveGuestData = (data) => {
  // Save to sessionStorage for guest users (temporary)
  const guestData = {
    ...data,
    timestamp: Date.now(),
    sessionId: generateSessionId()
  };
  
  sessionStorage.setItem('guest-analysis', JSON.stringify(guestData));
  return guestData;
};

export const getGuestData = () => {
  const data = sessionStorage.getItem('guest-analysis');
  return data ? JSON.parse(data) : null;
};

export const clearGuestData = () => {
  sessionStorage.removeItem('guest-analysis');
};

const generateSessionId = () => {
  return 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};
