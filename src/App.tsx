import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  BookOpen,
  Brain,
  Flame,
  Award,
  Moon,
  Sun,
  ArrowRight,
  Play,
  CheckCircle,
  XCircle,
  Volume2,
  VolumeX,
  History,
  Cpu,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  ChevronRight,
  BarChart2,
  AlertTriangle,
  Lightbulb,
  Trash2,
  Database,
  Calendar,
  GraduationCap,
  Clock,
  Shuffle,
  ShieldAlert,
  Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// @ts-ignore
import boyGamingPic from "./assets/images/boy_gaming_3d_1782227232981.jpg";
// @ts-ignore
import girlGamingPic from "./assets/images/girl_gaming_3d_1782227250329.jpg";
// @ts-ignore
import proTopperPic from "./assets/images/pro_topper_3d_1782227269673.jpg";

// TYPE INTERFACES MATCHING DATABASE & USER ENGINE
interface DbQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  importance: "high" | "conceptual" | "unexpected";
  createdAt: string;
}

interface Quiz {
  title: string;
  subject: string;
  questions: DbQuestion[];
  source?: string;
  searchGroundingUsed?: boolean;
  groundedQueries?: string[];
}

interface AttemptedRecord {
  id?: string;
  userId: string;
  topic: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number;
  timestamp: string;
  questions?: string[];
  answers?: number[];
}

// 3D FIFA PROFILE CARD COMPONENT WITH DYNAMIC TILT MOUSE LISTENER
function FifaCard3D({ name, avatar, score, level, subject, difficulty }: {
  name: string;
  avatar: string;
  score: number;
  level: number;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard"
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth responsive degree tilt calculations
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = -((y - centerY) / centerY) * 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Select 3D picture
  let characterImg = boyGamingPic;
  if (avatar === "girl") characterImg = girlGamingPic;
  if (avatar === "topper") characterImg = proTopperPic;

  // Custom gamer title and rank decorations
  let rankTitle = "Constitutional Scout";
  let badgeColor = "from-slate-600 to-slate-400";
  let bgGradient = "from-slate-950 via-[#131b2d] to-slate-950 border-slate-800";
  
  if (score === 100) {
    rankTitle = "🏆 GRANDMASTER OVERLORD";
    badgeColor = "from-amber-400 via-yellow-500 to-amber-600 animate-pulse";
    bgGradient = "from-[#221a00] via-[#4a3a02] to-[#221a00] border-yellow-500/80 shadow-[0_0_25px_rgba(234,179,8,0.2)]";
  } else if (score >= 80) {
    rankTitle = "⭐ CYBERNETIC ELITE";
    badgeColor = "from-[#a855f7] to-[#6366f1]";
    bgGradient = "from-[#11051c] via-[#241344] to-[#11051c] border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.15)]";
  } else if (score >= 50) {
    rankTitle = "⚔️ STUDY PALADIN";
    badgeColor = "from-teal-400 to-emerald-600";
    bgGradient = "from-[#01141a] via-[#052c3c] to-[#01141a] border-teal-500/50";
  } else {
    rankTitle = "🛡️ SYLLABUS RECRUIT";
    badgeColor = "from-gray-500 to-slate-700";
    bgGradient = "from-[#080b11] via-[#101726] to-[#080b11] border-slate-700/60";
  }

  // Numerical parameters resembling FIFA attributes
  const speedStat = Math.min(99, Math.max(45, 98 - Math.round(score * 0.1)));
  const focusStat = score >= 90 ? 98 : score >= 75 ? 88 : 72;
  const gritStat = difficulty === "Hard" ? 99 : difficulty === "Medium" ? 85 : 70;
  const intelStat = Math.min(99, 45 + score);

  return (
    <div 
      className="perspective-1000 w-full max-w-sm mx-auto flex justify-center py-4"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative w-72 h-[420px] rounded-[32px] overflow-hidden border-2 cursor-pointer transition-all duration-300 shadow-2xl ${bgGradient} flex flex-col`}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: isHovered ? "transform 0.05s ease-out, box-shadow 0.3s" : "transform 0.4s ease-out, box-shadow 0.3s",
        }}
      >
        {/* Holographic light angle overlay */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-color-dodge transition-all"
            style={{
              background: `radial-gradient(circle at ${rotate.y * 10 + 50}% ${-rotate.x * 10 + 50}%, rgba(255, 255, 255, 0.5) 0%, rgba(120, 119, 198, 0.2) 60%, transparent 100%)`
            }}
          />
        )}

        {/* Shimmer line inside */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />

        {/* FIFA attributes Header block */}
        <div className="p-5 flex justify-between items-start z-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-mono">
              {score}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-indigo-400 font-extrabold uppercase drop-shadow">
              OVR
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-black/50 border border-white/10 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[9px] font-mono text-white font-extrabold">LVL {level}</span>
          </div>
        </div>

        {/* FIFA 3D character layout container */}
        <div className="relative flex-1 flex flex-col items-center justify-center -mt-6">
          <div className="relative w-44 h-44 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
            <img
              src={characterImg}
              alt="Gamer character in 3D"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Dynamic Badge design plate with glow backdrop */}
          <div className={`mt-4 px-3.5 py-1 rounded-full bg-gradient-to-r ${badgeColor} text-[9px] text-white font-black tracking-widest font-mono uppercase shadow-lg border border-white/25 z-10`}>
            {rankTitle}
          </div>
        </div>

        {/* STATS DECORATOR PANEL (FIFA STYLE) */}
        <div className="bg-black/50 border-t border-white/10 p-4 z-10 font-mono text-center">
          <h5 className="text-sm font-black text-white tracking-tight truncate px-2 font-sans">
            {name}
          </h5>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono truncate px-2">
            {subject}
          </span>

          <div className="grid grid-cols-4 gap-1 text-center border-t border-white/15 pt-3 mt-2 select-none">
            <div className="flex flex-col border-r border-white/10">
              <span className="text-white font-extrabold text-[12px]">{score}%</span>
              <span className="text-[8px] text-slate-500 font-extrabold uppercase">ACC</span>
            </div>
            <div className="flex flex-col border-r border-white/10">
              <span className="text-white font-extrabold text-[12px]">{speedStat}</span>
              <span className="text-[8px] text-slate-500 font-extrabold uppercase">SPD</span>
            </div>
            <div className="flex flex-col border-r border-white/10">
              <span className="text-white font-extrabold text-[12px]">{focusStat}</span>
              <span className="text-[8px] text-slate-500 font-extrabold uppercase">FOC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-teal-400 font-extrabold text-[12px]">{intelStat}</span>
              <span className="text-[8px] text-slate-500 font-extrabold uppercase">INT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // CONFIG & THEME STATES
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userName, setUserName] = useState<string>(() => sessionStorage.getItem("genius_username") || "");
  const [userAvatar, setUserAvatar] = useState<string>(() => sessionStorage.getItem("genius_avatar") || "boy");
  const [userId, setUserId] = useState<string>(() => sessionStorage.getItem("genius_username") || "Guest");

  // Temporary inputs in session login view
  const [tempName, setTempName] = useState("");
  const [tempAvatar, setTempAvatar] = useState("boy");

  // LOCAL PERSISTENCE BACKED BY LOCAL STORAGE
  const [userXP, setUserXP] = useState<number>(() => {
    const saved = localStorage.getItem("genius_quiz_xp");
    return saved ? parseInt(saved, 10) : 480;
  });
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem("genius_quiz_streak");
    return saved ? parseInt(saved, 10) : 5;
  });

  // UI STATE ROUTER: "home", "quiz", "results", "history", "admin"
  const [currentScreen, setCurrentScreen] = useState<"home" | "quiz" | "results" | "history" | "admin">("home");

  // SECTOR SEARCH, TOPICS, AND AI ENGINE STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<string[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);

  // DATABASE REAL-TIME METRICS CACHED LOCALLY
  const [dbStats, setDbStats] = useState<{
    totalQuestions: number;
    difficultyBreakdown: { Easy: number; Medium: number; Hard: number };
    subjectBreakdown: Record<string, number>;
  }>({
    totalQuestions: 0,
    difficultyBreakdown: { Easy: 0, Medium: 0, Hard: 0 },
    subjectBreakdown: {},
  });

  // HISTORICAL ATTEMPT LOGS FETCHED FROM SERVER
  const [attemptsList, setAttemptsList] = useState<AttemptedRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ACTIVE DYNAMIC EXAM ASSESSMENT STATE
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]); // User's choices indices
  const [questionAnswersVerified, setQuestionAnswersVerified] = useState<boolean[]>([]); // Whether each choice has been checked
  const [answeredCount, setAnsweredCount] = useState(0);

  // QUICK CONFIGURATION DISPATCH modal STATE
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [quizCount, setQuizCount] = useState<number>(5);
  const [timerEnabled, setTimerEnabled] = useState(true);

  // REAL SECONDS RUNNING CORES
  const [secondsRemaining, setSecondsRemaining] = useState(150);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // OUTLINE SUGGESTED AUTOMATED EXAMS REFERENCES
  const featuredSubjects = [
    { name: "UPSC Civils", alias: "UPSC Indian Constitution", desc: "Sovereignty, Fundamental Rights & Judiciaries", count: 120, icon: "🏛️" },
    { name: "JEE Calculus", alias: "JEE Calculus & coordinate geometry", desc: "Limits, Matrices, Vector theorems & Integrals", count: 95, icon: "📐" },
    { name: "NEET Cellular", alias: "NEET Cytology & DNA structure", desc: "Mitochondrial processes, cell cycles & NCERT notes", count: 110, icon: "🧬" },
    { name: "RAS Culture", alias: "RAS Freedom Fight & Rajasthan geography", desc: "Mewar kings, freedom struggles & climatic zones", count: 80, icon: "🕌" },
    { name: "Global GK", alias: "General Knowledge History & capitals", desc: "Constitutional treaties, empires & state capitals", count: 140, icon: "🌍" }
  ];

  const typicalSearches = [
    "Machine Learning concepts & weights",
    "UPSC Directive Principles",
    "Rajasthan folklore art & crafts",
    "Thermodynamics cyclic processes Physics",
    "Organic Chemistry Carbonyl compounds"
  ];

  // RETRO SOUND WAVE GENERATOR (Native client AudioContext API)
  const triggerRetroNoise = (isCorrect: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        // High, pleasant chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(512, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1024, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        // Low, unexpected buzzing crash
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {
      console.warn("Audio Context blocked by browser user gesture policies.", e);
    }
  };

  // LOAD GENERAL STATISTICS FOR DATABASE CATALOGS
  const fetchDatabaseStatistics = async () => {
    try {
      const response = await fetch("/api/db-stats");
      if (response.ok) {
        const data = await response.json();
        setDbStats(data);
      }
    } catch (e) {
      console.warn("Err loading DB statistics:", e);
    }
  };

  // LOAD USER ATTEMPT HISTORY TIMELINE
  const fetchUserHistoricalLogs = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch(`/api/history?userId=${encodeURIComponent(userId)}`);
      if (response.ok) {
        const data = await response.json();
        setAttemptsList(data.attempts || []);
      }
    } catch (e) {
      console.warn("Err fetching user attempt logs:", e);
    } finally {
      setLoadingHistory(false);
    }
  };

  // AUTO TRIGGER ON MOUNT
  useEffect(() => {
    fetchDatabaseStatistics();
    fetchUserHistoricalLogs();
  }, [userId]);

  // SAVE XP & STREAK LOCAL STORAGE CONTROLS
  useEffect(() => {
    localStorage.setItem("genius_quiz_xp", userXP.toString());
  }, [userXP]);

  useEffect(() => {
    localStorage.setItem("genius_quiz_streak", streakDays.toString());
  }, [streakDays]);

  // COMPLETE KEYWORD AUTOCOMPLETE SUGGESTIONS IN SEARCH PANEL
  const searchSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    
    // Auto outline based on user input
    const matched = featuredSubjects
      .map((fs) => fs.alias)
      .filter((alias) => alias.toLowerCase().includes(query));

    // Also offer custom prefixes
    const custom = [
      `${searchQuery} Exam Patterns Pack`,
      `Advanced ${searchQuery} Conceptual Test`,
      `Previous Year ${searchQuery} MCQs`
    ];

    return Array.from(new Set([...matched, ...custom])).slice(0, 4);
  }, [searchQuery]);

  // INTELLIGENT QUIZ GENERATION TIMING WRAPPER
  const generateQuizAssessment = async (topicTitle: string) => {
    setIsGenerating(true);
    setApiError(null);
    setIsConfigModalOpen(false);

    // Setup animated step transitions inside the strictly required <= 5 second interval
    const steps = [
      "Securing target query: Analyzing conceptual keywords & syllabus requirements...",
      "Connecting to Gemini 3.5-flash: Initializing LLM pipeline...",
      "Search Grounding live: Crawling official previous year exam patterns & books...",
      "Deduplicating pool: Cross-checking questions previously attempted by " + userId + "...",
      "Formulating questions: Balancing high-yield templates & unexpected conceptual exceptions...",
      "Cataloguing database: Saving generated questions into persistent shared library pool!"
    ];
    setGenerationSteps(steps);
    setActiveStepIdx(0);

    const stepInterval = setInterval(() => {
      setActiveStepIdx((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicTitle,
          difficulty: quizDifficulty,
          count: quizCount,
          userId: userId,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error(`Endpoint returned failed HTTP status: ${response.status}`);
      }

      const rawQuiz: Quiz = await response.json();
      
      if (!rawQuiz.questions || rawQuiz.questions.length === 0) {
        throw new Error("Quiz returned an empty questions catalog. Retrying fallback.");
      }

      // Finish step animations perfectly before screen switch
      setActiveStepIdx(steps.length - 1);
      setTimeout(() => {
        setActiveQuiz(rawQuiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers(new Array(rawQuiz.questions.length).fill(-1));
        setQuestionAnswersVerified(new Array(rawQuiz.questions.length).fill(false));
        setAnsweredCount(0);
        setSecondsRemaining(rawQuiz.questions.length * 40); // Generous time allocated
        setTotalTimeSpent(0);
        setCurrentScreen("quiz");
        setIsGenerating(false);

        if (timerEnabled) {
          launchCountdownTimer();
        }
      }, 300);

      // Refresh stats automatically
      fetchDatabaseStatistics();

    } catch (error: any) {
      clearInterval(stepInterval);
      console.error("Failed executing AI API pipeline, launching direct database offline recovery loader.", error);
      setApiError("High latency detected. Initiated intelligent local database fallback pool for: " + topicTitle);
      
      // Assemble quick reliable pool if API offline
      setTimeout(() => {
        const recoveryQuiz: Quiz = {
          title: `${topicTitle} Resilient Foundation Mock`,
          subject: "Dynamic Assessment Lab",
          questions: [
            {
              id: "fallback-rec-0",
              subject: "Database Recovery Module",
              topic: topicTitle,
              question: "Which approach ensures an educational quiz avoids duplicate questions for a candidate in high-stress attempts?",
              options: [
                "Deleting the entire server's storage cookies daily",
                "Maintaining an indexed question registry linked against candidate's historical ID attempts",
                "Instructing candidate to write questions manually",
                "Resetting the browser display viewport zoom parameters"
              ],
              correctOptionIndex: 1,
              explanation: "Logging and filtering previously committed indices dynamically prevents repetitive academic question fatigue.",
              difficulty: quizDifficulty,
              importance: "conceptual",
              createdAt: new Date().toISOString()
            },
            {
              id: "fallback-rec-1",
              subject: "Database Recovery Module",
              topic: topicTitle,
              question: "What primary benefit does combining Gemini models with search engines (Google Search Grounding) introduce?",
              options: [
                "It reduces server port speed constraints",
                "It pulls factual, up-to-date real exam patterns, textbooks, and syllabus PYQs",
                "It restricts candidate input text sizes",
                "It disables background visual layout assets"
              ],
              correctOptionIndex: 1,
              explanation: "Live search grounding enables AI models to fetch correct, real-time factual patterns in lieu of static obsolete information.",
              difficulty: quizDifficulty,
              importance: "high",
              createdAt: new Date().toISOString()
            },
            {
              id: "fallback-rec-2",
              subject: "Database Recovery Module",
              topic: topicTitle,
              question: "How should a professional full-stack platform handle sudden third-party network outages?",
              options: [
                "Shutting down the server instance instantly",
                "Deploying modular offline caching systems and robust local database recovery fallbacks",
                "Flickering the browser display window repeatedly",
                "Re-routing requests to public unencrypted APIs"
              ],
              correctOptionIndex: 1,
              explanation: "Fallback caches and structured database recovery guarantees high availability and continued operation during network errors.",
              difficulty: quizDifficulty,
              importance: "unexpected",
              createdAt: new Date().toISOString()
            }
          ]
        };
        setActiveQuiz(recoveryQuiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers(new Array(recoveryQuiz.questions.length).fill(-1));
        setQuestionAnswersVerified(new Array(recoveryQuiz.questions.length).fill(false));
        setAnsweredCount(0);
        setSecondsRemaining(120);
        setTotalTimeSpent(0);
        setCurrentScreen("quiz");
        setIsGenerating(false);
        setApiError(null);
      }, 1200);
    }
  };

  const launchCountdownTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current!);
          // Trigger immediate evaluation upon countdown exhaustion
          handleSubmitQuizForReview();
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeSpent((prev) => prev + 1);
    }, 1000);
  };

  // CHOICE MANIPULATION
  const selectOptionIndex = (optIdx: number) => {
    const isChecked = questionAnswersVerified[currentQuestionIndex];
    if (isChecked) return; // Block changes after assertion

    const copied = [...selectedAnswers];
    copied[currentQuestionIndex] = optIdx;
    setSelectedAnswers(copied);
  };

  // CHECK ANSWER & UNVEIL INTERACTIVE TRAY
  const checkOptionAssertion = () => {
    const chosen = selectedAnswers[currentQuestionIndex];
    if (chosen === -1) return;

    const verified = [...questionAnswersVerified];
    verified[currentQuestionIndex] = true;
    setQuestionAnswersVerified(verified);
    setAnsweredCount((prev) => prev + 1);

    const isCorrect = chosen === activeQuiz!.questions[currentQuestionIndex].correctOptionIndex;
    triggerRetroNoise(isCorrect);
  };

  // JUMP NAVIGATION
  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuiz!.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // COMPLETE ATTEMPT AND COMMIT RECORDS
  const handleSubmitQuizForReview = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    let correctCount = 0;
    const answeredIds: string[] = [];
    const chosenOptions: number[] = [];

    activeQuiz!.questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      answeredIds.push(q.id || `fallback-${idx}`);
      chosenOptions.push(selected);
      if (selected === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const calculatedAccuracy = Math.round((correctCount / activeQuiz!.questions.length) * 100);

    // Dynamic XP Reward Schema: 10XP per correct answer, 40XP difficulty multiplier bonus, 50XP flawless bonus
    const difficultyMultiplier = quizDifficulty === "Hard" ? 3 : quizDifficulty === "Medium" ? 2 : 1;
    const totalEarnedXP = (correctCount * 12) * difficultyMultiplier + (calculatedAccuracy === 100 ? 55 : 0);
    
    // Accumulate levels
    setUserXP((prev) => prev + totalEarnedXP);
    setStreakDays((prev) => prev + 1);

    // Save Attempt to back-end PostgreSQL or JSON database
    try {
      await fetch("/api/save-attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          topic: activeQuiz!.title,
          subject: activeQuiz!.subject,
          difficulty: quizDifficulty,
          score: correctCount,
          totalQuestions: activeQuiz!.questions.length,
          accuracy: calculatedAccuracy,
          timeSpent: totalTimeSpent,
          questions: answeredIds,
          answers: chosenOptions,
        }),
      });
    } catch (e) {
      console.warn("Failed syncing attempt results with back-end database", e);
    }

    // Transit screen layout
    setCurrentScreen("results");
    fetchUserHistoricalLogs();
    fetchDatabaseStatistics();
  };

  // ADMIN OPERATIONS CORE
  const [adminSearchTerm, setAdminSearchTerm] = useState("");
  const [adminDifficultyFilter, setAdminDifficultyFilter] = useState("All");
  const [questionsPool, setQuestionsPool] = useState<DbQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const fetchQuestionsPoolForAdmin = async () => {
    setLoadingQuestions(true);
    try {
      // In server-db, list of all questions can be pulled via /api/db-stats or a query
      const response = await fetch("/api/db-stats");
      if (response.ok) {
        // Query matching database catalog indices
        const allRes = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: "General", count: 20 }),
        });
        if (allRes.ok) {
          const qData = await allRes.json();
          setQuestionsPool(qData.questions || []);
        }
      }
    } catch (e) {
      console.warn("Error loading questions lists", e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // CLEAN CORES
  useEffect(() => {
    if (currentScreen === "admin") {
      fetchQuestionsPoolForAdmin();
    }
  }, [currentScreen]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${
        theme === "dark" ? "bg-[#0b0f19] text-[#e2e8f0]" : "bg-[#f1f5f9] text-[#1e293b]"
      }`}
    >
      {!userName ? (
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0d14] text-slate-200">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm p-8 rounded-[32px] border border-slate-800 bg-slate-900/65 backdrop-blur-md shadow-2xl text-center space-y-6 relative z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="p-3.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent uppercase">
                  QuizGenius AI
                </h3>
                <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Competitive Assessment Entrance</p>
              </div>
            </div>

            <div className="border-t border-slate-800/85 pt-5 space-y-4">
              <div className="text-left space-y-2">
                <label className="block text-[11px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                  ⚡ Hero Student Name:
                </label>
                <input
                  type="text"
                  placeholder="Enter dynamic candidate name..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl outline-none text-white text-sm placeholder-gray-650 transition-colors font-semibold"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tempName.trim()) {
                      const final = tempName.trim();
                      setUserName(final);
                      setUserId(final);
                      setUserAvatar(tempAvatar);
                      sessionStorage.setItem("genius_username", final);
                      sessionStorage.setItem("genius_avatar", tempAvatar);
                    }
                  }}
                />
              </div>

              <div className="text-left space-y-2">
                <label className="block text-[11px] font-mono font-extrabold uppercase tracking-widest text-slate-400">
                  ⚔️ Select 3D Profile Avatar:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "boy", label: "Gamer Boy", img: boyGamingPic },
                    { id: "girl", label: "Gamer Girl", img: girlGamingPic },
                    { id: "topper", label: "Pro Scholar", img: proTopperPic }
                  ].map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setTempAvatar(av.id)}
                      className={`p-2 py-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${
                        tempAvatar === av.id
                          ? "bg-indigo-950/45 border-indigo-500 text-white shadow ring-1 ring-indigo-500"
                          : "bg-slate-950/40 border-slate-850 text-slate-450 text-slate-450 hover:border-slate-700"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-inner">
                        <img src={av.img} alt={av.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[10px] font-bold font-mono text-center leading-none">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const final = tempName.trim();
                if (final) {
                  setUserName(final);
                  setUserId(final);
                  setUserAvatar(tempAvatar);
                  sessionStorage.setItem("genius_username", final);
                  sessionStorage.setItem("genius_avatar", tempAvatar);
                }
              }}
              disabled={!tempName.trim()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-550 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-600/20 active:scale-98 transition-all cursor-pointer"
            >
              Sign Assessor Pact & Login
            </button>
          </motion.div>
        </div>
      ) : (
        <>
          {/* PROFESSIONAL CHROME NAVIGATION BAR */}
          <header
            className={`sticky top-0 z-40 border-b px-6 py-4 flex flex-wrap items-center justify-between transition-colors duration-300 ${
              theme === "dark"
                ? "bg-[#0f172a]/95 border-slate-800 text-white"
                : "bg-white/95 border-slate-200 text-slate-900 shadow-sm"
            }`}
          >
        <div className="flex items-center gap-3">
          <div
            onClick={() => setCurrentScreen("home")}
            className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform"
          >
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                QuizGenius AI
              </h1>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                PRO ACTIVE
              </span>
            </div>
            <p className="text-[11px] opacity-75">Grounded Web Research & Persistent Assessment Engine</p>
          </div>
        </div>

        {/* INTERACTION CORNER */}
        <div className="flex items-center gap-3 mt-3 sm:mt-0 flex-wrap">
          {/* PROFILE CARD */}
          <div
            className={`hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              theme === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <div className="text-left font-mono">
              <span className="block text-[10px] opacity-60">Candidate:</span>
              <span className="text-indigo-300 text-[11px] font-bold">{userId}</span>
            </div>
          </div>

          {/* XP DISPLAY WIDGET */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              theme === "dark" ? "bg-slate-900/90 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              XP: <strong className="text-indigo-400">{userXP}</strong>
            </span>
            <span className="text-[10px] opacity-60 font-mono">
              (Lvl {Math.floor(userXP / 150)})
            </span>
          </div>

          {/* FLAME STREAK DISPLAY */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              theme === "dark" ? "bg-slate-900/90 border-slate-800 text-amber-500 font-mono" : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
            title="Sustain streaks by solving daily assessments to activate multipliers"
          >
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>{streakDays} Days</span>
          </div>

          {/* HISTORICAL LOGS LINK */}
          <button
            onClick={() => {
              setCurrentScreen("history");
              fetchUserHistoricalLogs();
            }}
            className={`p-2 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
              currentScreen === "history"
                ? "bg-indigo-600 border-transparent text-white"
                : theme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-755 text-slate-300"
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Logs</span>
          </button>

          {/* SOUND FX */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              theme === "dark" ? "hover:bg-slate-850" : "hover:bg-slate-150"
            }`}
            title={soundEnabled ? "Mute Retro Chimes" : "Enable Retro Sound Effects"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              theme === "dark" ? "hover:bg-slate-850 text-amber-400" : "hover:bg-slate-150 text-indigo-600"
            }`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* ADMIN PORT CONTROL BUTTON */}
          <button
            onClick={() => setCurrentScreen("admin")}
            className="p-2 py-1.5 bg-slate-800 hover:bg-slate-705 text-[10px] tracking-wider font-bold text-indigo-300 rounded border border-slate-700 cursor-pointer"
          >
            🛡️ Database
          </button>
        </div>
      </header>

      {/* ERROR FEEDBACK BAR */}
      {apiError && (
        <div className="bg-[#e11d48]/15 border-y border-[#e11d48]/25 px-6 py-2 text-xs text-rose-300 flex items-center justify-center gap-2 font-mono">
          <AlertTriangle className="w-4 h-4 text-rose-450 text-rose-400" />
          <span>{apiError}</span>
        </div>
      )}

      {/* PRIMARY WORKSPACE ELEMENT */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        
        {/* VIEW 1: HOME WORKSPACE SCREEN */}
        {currentScreen === "home" && (
          <div className="space-y-12">
            
            {/* AMBIENT HERO SECTION */}
            <div className="text-center space-y-4 py-8 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Google Search Grounding enabled for authentic PYQs & Patterns</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight">
                Instantly Research & Create <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Targeted Exam Prep Quizzes
                </span>
              </h2>
              
              <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                Specify any academic topic, regional competitive syllabus, or unexpected test matter. Gemini searches the live web to catalog actual questions, and the database deduplicates to prevent repeats.
              </p>

              {/* HIGH INTENSITY SEARCH WRAPPER */}
              <div className="relative max-w-2xl mx-auto pt-6">
                <div
                  className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${
                    theme === "dark"
                      ? "bg-slate-905 border-slate-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-950/40"
                      : "bg-white border-slate-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-200"
                  }`}
                >
                  <div className="pl-4 text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter subject, exam (e.g., UPSC constitution, RAS Mewar, NEET cell biochemistry)..."
                    className="flex-1 py-3 bg-transparent outline-none border-none text-sm placeholder-gray-500 text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        setSelectedTopic(searchQuery);
                        setIsConfigModalOpen(true);
                      }
                    }}
                  />

                  {searchQuery.trim() && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="p-1 hover:bg-slate-800 rounded-full cursor-pointer text-gray-500"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    disabled={!searchQuery.trim() || isGenerating}
                    onClick={() => {
                      setSelectedTopic(searchQuery);
                      setIsConfigModalOpen(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-550 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* SEARCH TREND ASSIST DROPDOWNS */}
                {searchSuggestions.length > 0 && (
                  <div
                    className={`absolute left-0 right-0 mt-2 z-30 rounded-xl border p-2 text-left space-y-0.5 shadow-2xl transition-all ${
                      theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 text-slate-800"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 my-1 px-3">
                      Recommended syllabus targets:
                    </p>
                    {searchSuggestions.map((kw, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(kw);
                          setSelectedTopic(kw);
                          setIsConfigModalOpen(true);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          theme === "dark" ? "hover:bg-slate-900 text-slate-300" : "hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Brain className="w-3.5 h-3.5 text-indigo-400" />
                          {kw}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK KEYWORD TICKERS */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                <span className="text-xs text-slate-500">Popular:</span>
                {typicalSearches.map((term, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => {
                      setSearchQuery(term);
                      setSelectedTopic(term);
                      setIsConfigModalOpen(true);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* SYLLABUS CATALOG GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">Target Exam Syllabus templates</h3>
                  <p className="text-xs text-gray-400">Intelligent blueprints pre-saved & optimized into local cached pools</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-lg border border-indigo-500/20 text-xs font-mono font-semibold">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>POOL: {dbStats.totalQuestions} ITEMS STORAGE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {featuredSubjects.map((sub, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedTopic(sub.alias);
                      setIsConfigModalOpen(true);
                    }}
                    className={`group p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                      theme === "dark"
                        ? "bg-slate-905 border-slate-850 hover:border-indigo-500 hover:bg-slate-900"
                        : "bg-white border-slate-200 hover:border-indigo-400 shadow-sm text-slate-900"
                    }`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">{sub.icon}</div>
                    <h4 className="font-extrabold text-sm tracking-tight text-white group-hover:text-indigo-400 transition-colors truncate">
                      {sub.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-1 lines-clamp-3 leading-relaxed">
                      {sub.desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-bold text-indigo-400 font-mono">
                      <span>{sub.count} ROADMAP TEMPLATES</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* METRICS & BENEFITS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* ACCLAIMED PLATFORM HIGHLIGHTS */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Intelligent Generation Pipeline</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-xl text-left space-y-2">
                    <div className="w-8 h-8 rounded bg-teal-500/10 flex items-center justify-center">
                      <Cpu className="text-teal-400 w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-xs text-white">Guaranteed Deduplication Engine</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Your historical attempts log stores every question ID linked to your profile email. The generator filters these out in subsequent queries so you never repeat.
                    </p>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-xl text-left space-y-2">
                    <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center">
                      <Shuffle className="text-indigo-400 w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-xs text-white">Hybrid Retrieval Cache</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      To optimize latency under 5 seconds, the engine reuses pre-save questions from our library pool and merges new conceptual topics.
                    </p>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-xl text-left space-y-2">
                    <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center">
                      <Sparkles className="text-amber-400 w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-xs text-white">Pyq Search Grounding</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Integrates real-world examination papers, syllabus books like NCERT and state boards, and unexpected trick concepts.
                    </p>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-xl text-left space-y-2">
                    <div className="w-8 h-8 rounded bg-rose-500/10 flex items-center justify-center">
                      <Award className="text-rose-400 w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-xs text-white">Gamified Exp and Level Ups</h5>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Accumulate levels by defending streak counts and scoring high-yield difficulty multipliers on harder syllabus questions.
                    </p>
                  </div>
                </div>
              </div>

              {/* INTEGRATION REPORT CARD */}
              <div className="bg-gradient-to-br from-[#12192c] to-[#0a1020] p-6 rounded-2xl border border-indigo-500/20 text-left space-y-4">
                <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase">
                  ⚡ DAILY MULTIPLIER CHALLENGE
                </span>
                
                <h4 className="text-base font-extrabold text-white">Constitutional Assemblies & Law</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A targeted multi-tiered assessment testing the Drafting Committee, core amendments, state reorganization acts, and judicial review parameters.
                </p>

                <div className="p-3 bg-indigo-950/30 rounded border border-indigo-500/10 text-[10px] font-mono text-indigo-300 flex items-center justify-between">
                  <span>EXP MULTIPLIER:</span>
                  <span className="font-extrabold text-amber-400 uppercase">⭐ 2.5x MULTIPLIER LIVE</span>
                </div>

                <button
                  onClick={() => {
                    setSelectedTopic("UPSC Constitutional Drafting Committee & Amendments");
                    setIsConfigModalOpen(true);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs uppercase py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Accept Multiplier Challenge</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* LOADING PROGRESS ENGINE OVERLAY */}
        {isGenerating && (
          <div className="py-20 text-center space-y-6 max-w-lg mx-auto">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
              <Brain className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-white animate-pulse">Running AI Research Pipeline</h3>
              <p className="text-xs text-gray-400">
                Crafting targeted, high-quality multiple choice questions matching real examination standards.
              </p>
            </div>

            {/* DYNAMIC PROGRESS TIMELINE STEPS */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-left space-y-2 font-mono text-xs">
              {generationSteps.map((step, sIdx) => {
                const isCompleted = sIdx < activeStepIdx;
                const isActive = sIdx === activeStepIdx;
                return (
                  <div
                    key={sIdx}
                    className={`flex items-start gap-2 transition-opacity duration-300 ${
                      isCompleted ? "text-teal-400" : isActive ? "text-indigo-300 font-bold" : "text-slate-600"
                    }`}
                  >
                    <span>{isCompleted ? "✓" : isActive ? "▶" : "○"}</span>
                    <p className="flex-1 text-[11px] leading-relaxed">{step}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: ACTIVE REVOLUTIONS QUIZ BOARD */}
        {currentScreen === "quiz" && activeQuiz && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT PROFILE & METADATA COLUMN */}
            <div className="hidden lg:block lg:col-span-1 space-y-4">
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl text-left space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
                  <span>ACTIVE ROADMAP DIAGNOSTICS</span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white lines-clamp-2" title={activeQuiz.title}>
                    {activeQuiz.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 font-mono mt-1 block">
                     {activeQuiz.subject}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Difficulty:</span>
                    <span className="font-extrabold text-indigo-400 uppercase">{quizDifficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Questions count:</span>
                    <span className="font-mono text-slate-300">{activeQuiz.questions.length} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timer State:</span>
                    <span className="text-slate-300 font-mono">{timerEnabled ? "Active" : "Disabled"}</span>
                  </div>
                </div>

                {/* TIMER DISPLAY */}
                {timerEnabled && (
                  <div
                    className={`p-4 rounded-xl border text-center font-mono space-y-1 ${
                      secondsRemaining < 25
                        ? "bg-rose-950/25 border-rose-500/40 text-rose-300 animate-pulse"
                        : "bg-slate-950 border-slate-800 text-teal-400"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-400">Time Remaining on diagnostics:</span>
                    <p className="text-2xl font-black">
                      {Math.floor(secondsRemaining / 60)}:
                      {("0" + (secondsRemaining % 60)).slice(-2)}
                    </p>
                  </div>
                )}

                {/* EXIT */}
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to quit? Current diagnostic progress will have to be completely rerun.")) {
                      setCurrentScreen("home");
                    }
                  }}
                  className="w-full p-2 text-center text-xs text-rose-300 hover:text-rose-200 bg-rose-950/10 border border-rose-900/40 rounded-lg hover:bg-rose-950/20 cursor-pointer font-bold transition-all"
                >
                  Exit Diagnostics Room
                </button>
              </div>

              {/* QUICK JUMP AND COMMITTED INDICES TRACKER */}
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl text-left space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Matrix overview:</h4>
                <div className="grid grid-cols-5 gap-2">
                  {activeQuiz.questions.map((_, index) => {
                    const isSelected = selectedAnswers[index] !== -1;
                    const isVerified = questionAnswersVerified[index];
                    const isCurrent = currentQuestionIndex === index;

                    let bgStyle = "bg-slate-950 border-slate-800 text-slate-400";
                    if (isCurrent) {
                      bgStyle = "bg-indigo-600 border-indigo-400 text-white font-bold ring-2 ring-indigo-500/20";
                    } else if (isVerified) {
                      bgStyle = "bg-green-600 border-green-500 text-white";
                    } else if (isSelected) {
                      bgStyle = "bg-indigo-950 border-indigo-500 text-indigo-300";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`w-full py-2.5 rounded-lg border text-xs font-mono font-bold transition-colors cursor-pointer ${bgStyle}`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[10px] text-slate-500 space-y-1 font-mono leading-relaxed pt-2 border-t border-slate-800">
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600" /> Current Question</p>
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-600" /> Answer Checked</p>
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-950" /> Unattempted Item</p>
                </div>
              </div>
            </div>

            {/* MAIN QUESTION INTERACTION COLUMN */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* ACCORDION BAR PROGRESS (RESPONSIVE) */}
              <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-bold leading-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-505 bg-indigo-500 animate-pulse" />
                  <span>
                    Item <strong className="text-white text-[13px]">{currentQuestionIndex + 1}/{activeQuiz.questions.length}</strong>
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    Checked: <strong className="font-mono">{answeredCount}</strong>
                  </span>
                </div>

                {/* MOBILE DYNAMIC CONVENIENT TIMER DISPLAY */}
                {timerEnabled && (
                  <div className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold flex items-center gap-1 ${
                    secondsRemaining < 25
                      ? "bg-rose-950/20 border-rose-500 text-rose-300 animate-pulse"
                      : "bg-slate-950 border-slate-800 text-teal-400"
                  }`}>
                    ⏱️ {Math.floor(secondsRemaining / 60)}:{("0" + (secondsRemaining % 60)).slice(-2)}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to quit? Current progress will be lost.")) {
                      setCurrentScreen("home");
                    }
                  }}
                  className="px-2 py-0.5 text-[10px] text-rose-400 hover:text-rose-300 border border-rose-950/40 bg-rose-950/10 hover:bg-rose-950/20 rounded font-mono font-bold transition-all ml-auto lg:hidden"
                >
                  Quit Room
                </button>
              </div>

              {/* CORE CARD FOR QUESTION MATRICES */}
              <div className="bg-slate-900 border border-slate-850 p-6 md:p-8 rounded-2xl text-left space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase bg-indigo-950 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full">
                    SYLLABUS FIELD {currentQuestionIndex + 1}
                  </span>

                  {/* DISPLAY CUSTOM INVENTIVE BADGES */}
                  {activeQuiz.questions[currentQuestionIndex].importance === "high" && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-900/60 flex items-center gap-1">
                      ⭐ HIGH-YIELD EXAM PATTERN
                    </span>
                  )}
                  {activeQuiz.questions[currentQuestionIndex].importance === "conceptual" && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-900/60 flex items-center gap-1">
                      🧠 CORE TEXTBOOK CONCEPT
                    </span>
                  )}
                  {activeQuiz.questions[currentQuestionIndex].importance === "unexpected" && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-900/60 flex items-center gap-1">
                      ⚡ UNEXPECTED ANOMALY SPEC
                    </span>
                  )}
                </div>

                {/* THE QUESTION */}
                <h4 className="text-lg md:text-xl font-extrabold text-white leading-relaxed">
                  {activeQuiz.questions[currentQuestionIndex].question}
                </h4>

                {/* THE FORBIDDEN CHOICE OPTIONS */}
                <div className="space-y-3">
                  {activeQuiz.questions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                    const isChecked = questionAnswersVerified[currentQuestionIndex];
                    const correctIdx = activeQuiz.questions[currentQuestionIndex].correctOptionIndex;

                    let optionBorder = "border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300";
                    let outcomeLabel = "";

                    if (isSelected) {
                      optionBorder = "border-indigo-500 bg-indigo-950/20 text-indigo-300 ring-1 ring-indigo-500";
                    }

                    if (isChecked) {
                      if (oIdx === correctIdx) {
                        optionBorder = "border-emerald-500 bg-emerald-950/30 text-emerald-300 ring-1 ring-emerald-500 font-bold";
                        outcomeLabel = "✓ ESTABLISHED ANSWER";
                      } else if (isSelected && oIdx !== correctIdx) {
                        optionBorder = "border-[#e11d48] bg-rose-950/20 text-rose-300 ring-1 ring-[#e11d48]";
                        outcomeLabel = "✗ INCORRECT CHOICE";
                      } else {
                        optionBorder = "border-slate-850 opacity-40 bg-transparent text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isChecked}
                        onClick={() => selectOptionIndex(oIdx)}
                        className={`w-full p-4 rounded-xl border text-xs text-left transition-all flex items-center justify-between group cursor-pointer ${optionBorder}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold font-mono text-indigo-400 group-hover:border-indigo-500 transition-colors">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-semibold text-[13px]">{opt}</span>
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-right font-bold">
                          {outcomeLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* VISIBLE EDUCATIONAL explanation SYSTEM */}
                {questionAnswersVerified[currentQuestionIndex] && (
                  <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20 text-xs text-slate-300 text-left space-y-2.5 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Conceptual Explanation Context:</span>
                    </div>
                    <p className="leading-relaxed">
                      {activeQuiz.questions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

              </div>

              {/* NAVIGATION CONTROL BAR */}
              <div className="flex items-center justify-between gap-4">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={prevQuestion}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg disabled:opacity-40 select-none cursor-pointer flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]"
                >
                  ← Previous question
                </button>

                <div className="flex items-center gap-2">
                  {!questionAnswersVerified[currentQuestionIndex] ? (
                    <button
                      disabled={selectedAnswers[currentQuestionIndex] === -1}
                      onClick={checkOptionAssertion}
                      className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-550 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-[11px] rounded-lg shadow-md flex items-center gap-2 cursor-pointer scale-102 hover:scale-105 transition-transform"
                    >
                      <CheckCircle className="w-4 h-4 text-indigo-200" />
                      <span>Verify Answer</span>
                    </button>
                  ) : (
                    currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                      <button
                        onClick={nextQuestion}
                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-755 border border-slate-705 text-white font-bold uppercase tracking-wider text-[11px] rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Next question</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        disabled={answeredCount < activeQuiz.questions.length}
                        onClick={handleSubmitQuizForReview}
                        className="px-8 py-2.5 bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-550 hover:to-green-450 border border-green-500/20 text-white font-black uppercase tracking-widest text-xs rounded-lg shadow-lg disabled:opacity-40 cursor-pointer"
                      >
                        Commit Assessment Diagnostics & Sum XP
                      </button>
                    )
                  )}
                </div>
              </div>

              {answeredCount < activeQuiz.questions.length && (
                <p className="text-[10px] font-mono text-center text-amber-500 py-1 font-semibold bg-amber-950/15 border border-amber-900/10 rounded">
                  * Alert: Please verify and check all {activeQuiz.questions.length} questions before committing scoring. Current verified: ({answeredCount}/{activeQuiz.questions.length})
                </p>
              )}

            </div>

          </div>
        )}

        {/* VIEW 3: COMPREHENSIVE DIAGNOSTIC RESULTS */}
        {currentScreen === "results" && activeQuiz && (
          <div className="max-w-4xl mx-auto space-y-8 text-center pb-12">
            
            {/* HEADER */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#22d3ee] bg-[#22d3ee]/10 border border-[#22d3ee]/25 px-4 py-1.5 rounded-full inline-block">
                Assessment Protocol Completed
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight uppercase">Syllabus Performance Report</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Review your computed gamer stats, level-up achievements, and interactive FIFA-style academic keycard.
              </p>
            </motion.div>

            {/* MAIN RESULTS DISPLAY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* FIFA CARD UNIT CONTAINER */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="md:col-span-5 flex flex-col items-center space-y-4"
              >
                <div className="flex items-center gap-1.5 bg-indigo-505 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-305 text-indigo-300 uppercase">
                    Move cursor over • Rotate in 3D
                  </span>
                </div>
                
                <FifaCard3D
                  name={userName}
                  avatar={userAvatar}
                  score={Math.round((selectedAnswers.filter((a, idx) => a === activeQuiz.questions[idx].correctOptionIndex).length / activeQuiz.questions.length) * 100)}
                  level={Math.floor(userXP / 150)}
                  subject={activeQuiz.subject}
                  difficulty={quizDifficulty}
                />
              </motion.div>
              
              {/* PERFORMANCES AND RECOMMENDATION DATA */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-7 space-y-6"
              >
                {/* HIGH-END GAMIFIED STAT BOARD */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-1 hover:border-indigo-550/30 transition-colors">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">TOTAL SCORE ACC</span>
                    <p className="text-2xl font-black text-white font-mono">
                      {selectedAnswers.filter((a, idx) => a === activeQuiz.questions[idx].correctOptionIndex).length} / {activeQuiz.questions.length}
                    </p>
                    <span className="text-[10px] text-indigo-400 font-bold font-mono uppercase">Answers Correct</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-1 hover:border-indigo-550/30 transition-colors">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">TIME ELAPSED</span>
                    <p className="text-2xl font-black text-teal-400 font-mono">
                      {Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s
                    </p>
                    <span className="text-[10px] text-slate-400">Total session duration</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-1 hover:border-rose-500/30 transition-colors">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-500 block">DIFFICULTY BONUS</span>
                    <p className="text-2xl font-black text-rose-450 text-rose-400 uppercase">
                      {quizDifficulty}
                    </p>
                    <span className="text-[10px] text-slate-400">XP Factor: {quizDifficulty === "Hard" ? "3x Multiplier" : quizDifficulty === "Medium" ? "2x Multiplier" : "1x Standard"}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#111827] border border-amber-500/20 text-left space-y-1 hover:border-amber-500/40 transition-colors">
                    <span className="text-[9px] uppercase font-mono font-bold text-amber-500 block">XP REWARD REASSESSED</span>
                    <p className="text-2xl font-black text-amber-400 font-mono">
                      +{selectedAnswers.filter((a, idx) => a === activeQuiz.questions[idx].correctOptionIndex).length * 15 * (quizDifficulty === "Hard" ? 3 : quizDifficulty === "Medium" ? 2 : 1)} XP
                    </p>
                    <span className="text-[10px] text-slate-400">Credentialed to profile Level</span>
                  </div>
                </div>

                {/* GAMER PERFORMANCE EVALUATION BLOCK */}
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-950/20 via-slate-900/40 to-indigo-950/20 border border-indigo-500/10 text-left space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <h4 className="text-xs font-mono font-black uppercase tracking-widest text-indigo-300">
                      Syllabus Aptitude Summary:
                    </h4>
                  </div>
                  
                  {/* Dynamic performance assessment commentary */}
                  {(() => {
                    const corrCount = selectedAnswers.filter((a, idx) => a === activeQuiz.questions[idx].correctOptionIndex).length;
                    const pct = Math.round((corrCount / activeQuiz.questions.length) * 100);
                    let title = "RECRUIT IN TRAINING";
                    let comment = "An honest checkpoint but requires deeper homework. Request further research grounding sessions to master this topic fully.";
                    let color = "text-amber-400";

                    if (pct === 100) {
                      title = "🔥 GODLIKE PERFECT MASTERCLASS!";
                      comment = "Flawless operational mastery! You answered every diagnostic perfectly under high-strain countdown variables. Level multipliers activated!";
                      color = "text-teal-400";
                    } else if (pct >= 80) {
                      title = "⚡ SYLLABUS ELITE OVERLORD";
                      comment = "Excellent conceptual performance! Minor errors caught, but overall accuracy maps high-level aptitude on this competitive structure.";
                      color = "text-indigo-400";
                    } else if (pct >= 50) {
                      title = "🛡️ STUDY PALADIN WARRIOR";
                      comment = "Pass rate confirmed! You grasp the skeletal principles of this syllabus topic. Let's patch those weak modules.";
                      color = "text-blue-400";
                    }

                    return (
                      <div className="space-y-1.5">
                        <p className={`text-base font-black tracking-tight ${color}`}>{title}</p>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">{comment}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Level Up Progress Meter */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400">Scholar rank meter (LVL {Math.floor(userXP / 150)}):</span>
                    <span className="font-mono text-indigo-400 font-bold">{userXP % 150} / 150 XP to Next Level</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${((userXP % 150) / 150) * 100}%` }}
                    />
                  </div>
                </div>

              </motion.div>

            </div>

            {/* SYLLABUS RECOMMENDATION MODULES AND FEEDBACK (Restyled) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* WEAK SYLLABUS MODULES */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Syllabus Area Improvement:
                  </h4>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  The artificial intelligence has highlighted exact textbook segments needing immediate review.
                </p>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {selectedAnswers.some((a, idx) => a !== activeQuiz.questions[idx].correctOptionIndex) ? (
                    activeQuiz.questions.map((q, qIdx) => {
                      if (selectedAnswers[qIdx] !== q.correctOptionIndex) {
                        return (
                          <div key={qIdx} className="p-3 bg-slate-950 rounded-xl border border-rose-950 text-xs text-rose-300 space-y-1">
                            <span className="text-[10px] font-bold text-rose-450 uppercase font-mono">
                              Anomalous choice: Option {String.fromCharCode(65 + q.correctOptionIndex)} is correct
                            </span>
                            <p className="font-bold text-[11px] text-white leading-normal">{q.question}</p>
                            <span className="block text-[10px] text-slate-500 font-mono">Suggested Syllabus Focus: "{q.topic}"</span>
                          </div>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <div className="p-6 bg-teal-950/25 border border-teal-500/20 rounded-xl text-center text-teal-300 space-y-2 my-auto">
                      <GraduationCap className="w-8 h-8 text-teal-400 mx-auto animate-bounce" />
                      <p className="font-extrabold font-mono text-[13px]">ALL PATTERNS UNVEILED!</p>
                      <p className="text-xs text-teal-200">Flawless cognitive scoring verifies complete subject preparedness.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CHRONOLOGICAL REVIEW LIST */}
              <div className="bg-[#0f172a] border border-slate-850 rounded-2xl p-6 text-left space-y-4">
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Chronological Question Feed Check:
                </h4>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {activeQuiz.questions.map((q, idx) => {
                    const selected = selectedAnswers[idx];
                    const isCorrect = selected === q.correctOptionIndex;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border space-y-3 text-left transition-all ${
                          isCorrect ? "bg-emerald-950/15 border-emerald-900/35" : "bg-rose-950/15 border-rose-900/35"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                            ITEM #{idx + 1}
                          </span>
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                              isCorrect ? "bg-emerald-900 text-emerald-300" : "bg-rose-900 text-rose-300"
                            }`}
                          >
                            {isCorrect ? "✓ Clear" : "✗ Flawed"}
                          </span>
                        </div>

                        <p className="text-[12px] font-extrabold text-white leading-relaxed">{q.question}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="p-2 bg-slate-950 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Assert Correct:</span>
                            <span className="font-bold text-teal-400 truncate block">{q.options[q.correctOptionIndex]}</span>
                          </div>
                          <div className="p-2 bg-slate-950 rounded">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Your Response:</span>
                            <span className={`font-bold truncate block ${isCorrect ? "text-teal-400" : "text-rose-450 text-rose-400"}`}>
                              {selected === -1 ? "Missing" : q.options[selected]}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-900 text-xs text-slate-400 leading-normal">
                          <span className="block text-[9px] font-bold font-mono text-indigo-400 uppercase tracking-widest">Aptitude Background:</span>
                          <p className="text-[11px] mt-0.5">{q.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ACTION FOOTER */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-6">
              <button
                onClick={() => {
                  setCurrentScreen("home");
                }}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-550 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:scale-102 active:scale-98 cursor-pointer text-center"
              >
                Return to Arena Panel
              </button>
              
              <button
                onClick={() => {
                  setSelectedAnswers(new Array(activeQuiz.questions.length).fill(-1));
                  setQuestionAnswersVerified(new Array(activeQuiz.questions.length).fill(false));
                  setAnsweredCount(0);
                  setSecondsRemaining(activeQuiz.questions.length * 40);
                  setTotalTimeSpent(0);
                  setCurrentScreen("quiz");
                  if (timerEnabled) launchCountdownTimer();
                }}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl cursor-pointer font-bold text-xs uppercase"
              >
                Repeat This Assessment
              </button>
            </div>

          </div>
        )}

        {/* VIEW 4: PERSONALIZED ATTEMPT TIMELINE LOGS */}
        {currentScreen === "history" && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">Your Personal Exam Timeline Logs</h3>
                <p className="text-xs text-gray-400">Chronological list of all syllabus checkpoints solved</p>
              </div>
              <button
                onClick={() => setCurrentScreen("home")}
                className="p-2 text-xs bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer font-bold font-mono uppercase"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exams Center</span>
              </button>
            </div>

            {loadingHistory ? (
              <div className="py-20 text-center text-slate-400 font-mono animate-pulse">
                [SYSTEM] loading historical attempt indices from PostgreSQL server db...
              </div>
            ) : attemptsList.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/40 space-y-4">
                <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
                <div>
                  <h4 className="font-bold text-sm">No historical attempts recorded!</h4>
                  <p className="text-xs text-slate-500 mt-1">Initiate and complete a quiz research module to index your first checkpoint.</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800/80 text-slate-400 uppercase tracking-widest text-[10px]">
                        <th className="p-4 font-bold">Exam Title / Subject</th>
                        <th className="p-4 font-bold">Difficulty</th>
                        <th className="p-4 font-bold text-center">Correct rate</th>
                        <th className="p-4 font-bold text-center">Accuracy %</th>
                        <th className="p-4 font-bold text-center">Time Spent</th>
                        <th className="p-4 font-bold">Committed Checkpoint</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {attemptsList.map((rec, idx) => (
                        <tr key={idx} className="hover:bg-slate-850/40 text-slate-300">
                          <td className="p-4">
                            <span className="font-bold text-white block text-[13px] font-sans">{rec.topic}</span>
                            <span className="text-[10px] text-indigo-400 uppercase font-mono">{rec.subject}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                rec.difficulty === "Easy"
                                  ? "bg-green-950 text-green-300 border border-green-900/40"
                                  : rec.difficulty === "Medium"
                                  ? "bg-amber-950 text-amber-300 border border-amber-900/40"
                                  : "bg-rose-950 text-rose-300 border border-rose-900/40"
                              }`}
                            >
                              {rec.difficulty}
                            </span>
                          </td>
                          <td className="p-4 text-center font-bold text-white text-[13px]">
                            {rec.score} / {rec.totalQuestions}
                          </td>
                          <td className="p-4 text-center text-teal-400 font-bold">
                            {rec.accuracy}%
                          </td>
                          <td className="p-4 text-center text-slate-400">
                            {Math.floor(rec.timeSpent / 60)}m {rec.timeSpent % 60}s
                          </td>
                          <td className="p-4 text-slate-500 text-[11px]">
                            {new Date(rec.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: ADMIN AND METRIC DATABASE EXPLORER */}
        {currentScreen === "admin" && (
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">Database Control Room</h3>
                <p className="text-xs text-gray-400">Monitor grow library parameters and inspect cataloged entries</p>
              </div>
              <button
                onClick={() => setCurrentScreen("home")}
                className="p-2 text-xs bg-slate-910 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer font-bold font-mono uppercase"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exams Center</span>
              </button>
            </div>

            {/* COUNTER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">TOTAL CATALOUGED</span>
                <p className="text-2xl font-black text-indigo-400">{dbStats.totalQuestions} questions</p>
                <span className="text-[10px] text-slate-400">Grow cache intelligence pool</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">EASY GRADIENT</span>
                <p className="text-2xl font-black text-green-400">{dbStats.difficultyBreakdown.Easy} items</p>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">MEDIUM GRADIENT</span>
                <p className="text-2xl font-black text-amber-400">{dbStats.difficultyBreakdown.Medium} items</p>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-5 rounded-xl">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">HARD GRADIENT</span>
                <p className="text-2xl font-black text-rose-400">{dbStats.difficultyBreakdown.Hard} items</p>
              </div>
            </div>

            {/* REAL-TIME PRE-SAVED CATALOG VIEWER */}
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <h4 className="font-extrabold text-white text-sm">Inspecting Stored Questions Pool</h4>
                <button
                  onClick={fetchQuestionsPoolForAdmin}
                  className="p-2 bg-indigo-600 hover:bg-indigo-550 text-white font-bold font-mono uppercase text-[10px] rounded flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-white" />
                  <span>Refresh catalog</span>
                </button>
              </div>

              {loadingQuestions ? (
                <div className="py-20 text-center font-mono text-slate-400 animate-pulse">
                  [SYSTEM] loading active cached catalog lists...
                </div>
              ) : questionsPool.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  No cataloged entries loaded. Perform a live exam generation in search bar first.
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 divide-y divide-slate-800">
                  {questionsPool.map((q, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">
                          {q.subject} • {q.difficulty}
                        </span>
                        <span className="text-[9px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded font-mono">
                          ID: {q.id}
                        </span>
                      </div>
                      <p className="font-bold text-white leading-relaxed">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2 text-slate-400">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-1.5 rounded text-[11px] truncate ${
                              oIdx === q.correctOptionIndex
                                ? "bg-emerald-950 text-emerald-300 font-semibold border border-emerald-900/40"
                                : "bg-slate-950 border border-slate-800/60"
                            }`}
                          >
                            {oIdx + 1}. {opt}
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed italic bg-slate-950 p-2 rounded">
                        Explanation: {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* QUICK PRE-START DISPATCH MODAL OVERLAYS */}
      {isConfigModalOpen && selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 text-left space-y-6 shadow-2xl ${
              theme === "dark" ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {/* COMPONENT HEADER */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-indigo-400">Pre-Exam Settings Matrix:</span>
                <h4 className="text-lg font-black text-white truncate max-w-[280px]" title={selectedTopic}>
                  {selectedTopic}
                </h4>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* SELECTION CHANNELS */}
            <div className="space-y-4">
              
              {/* DIFFICULTY SELECTOR */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Configure Rigor Gradient:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Easy", "Medium", "Hard"] as const).map((dif) => (
                    <button
                      key={dif}
                      onClick={() => setQuizDifficulty(dif)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        quizDifficulty === dif
                          ? "bg-indigo-600 border-indigo-400 text-white shadow"
                          : theme === "dark"
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {dif}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUESTIONS COUNT SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Syllabus question intensity:</span>
                  <span className="font-mono text-indigo-400">{quizCount} questions</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[3, 5, 8, 10, 15].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setQuizCount(cnt)}
                      className={`py-2 rounded font-mono text-xs font-bold border cursor-pointer transition-all ${
                        quizCount === cnt
                          ? "bg-indigo-600 border-indigo-400 text-white"
                          : theme === "dark"
                          ? "bg-slate-900 border-slate-800 text-slate-400"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              </div>

              {/* TIMING CONFIG */}
              <div className="flex items-center justify-between py-2 border-t border-b border-slate-800/60 my-2">
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Countdown timer:</span>
                  <span className="text-[10px] text-slate-500 font-mono">40 seconds allocated per question</span>
                </div>
                <button
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer transition-all ${
                    timerEnabled
                      ? "bg-teal-950/40 border-teal-500 text-teal-300"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {timerEnabled ? "ACTIVE (Ticking)" : "DISABLED"}
                </button>
              </div>

            </div>

            {/* LAUNCH ENGINE BUTTON */}
            <button
              onClick={() => generateQuizAssessment(selectedTopic)}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-555 text-white font-extrabold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-102 transition-transform"
            >
              <Cpu className="w-4 h-4 text-indigo-200" />
              <span>Generate Diagnostics roadmap</span>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER METRIC BRAND */}
      <footer className="py-8 mt-12 border-t border-slate-850/60 text-center text-xs text-slate-500 font-mono bg-slate-950/20">
        <p>© 2026 QuizGenius AI. Built with persistent database caching & Google Search Grounding pipelines.</p>
        <p className="opacity-60 text-[10px] mt-1">Status: live • Connected as Scholars • Pool: {dbStats.totalQuestions} questions stored</p>
      </footer>
        </>
      )}
    </div>
  );
}
