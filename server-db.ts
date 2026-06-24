import fs from "fs";
import path from "path";
import crypto from "crypto";

// Interfaces
export interface DbQuestion {
  id: string; // hash of normalized question text to prevent duplicate questions across runs
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

export interface DbAttempt {
  id: string;
  userId: string;
  topic: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number; // in seconds
  timestamp: string;
  questions: string[]; // List of DbQuestion ID links
  answers: number[]; // User's choices corresponding to questions
}

interface DatabaseSchema {
  questions: DbQuestion[];
  attempts: DbAttempt[];
}

const DB_PATH = path.join(process.cwd(), "quiz-db.json");

// Utility to block file access collisions
let isWriting = false;

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDb: DatabaseSchema = { questions: [], attempts: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf-8");
      return initialDb;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Failed reading quiz-db.json, returning empty template:", error);
    return { questions: [], attempts: [] };
  }
}

function writeDb(data: DatabaseSchema) {
  if (isWriting) {
    // Retry shortly if locked
    setTimeout(() => writeDb(data), 50);
    return;
  }
  isWriting = true;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed writing quiz-db.json:", error);
  } finally {
    isWriting = false;
  }
}

// Generate unique hash based on normalized question text
export function generateQuestionHash(questionText: string): string {
  const normalized = questionText.toLowerCase().replace(/[^a-z0-9]/g, "");
  return crypto.createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

// Save list of questions to DB, ensuring they are unique
export function saveQuestions(questions: Omit<DbQuestion, "id" | "createdAt">[]): DbQuestion[] {
  const db = readDb();
  const saved: DbQuestion[] = [];

  for (const q of questions) {
    const questionId = generateQuestionHash(q.question);
    
    // Check if duplicate already exists
    const existing = db.questions.find((x) => x.id === questionId);
    if (existing) {
      saved.push(existing);
      continue;
    }

    const newQ: DbQuestion = {
      ...q,
      id: questionId,
      createdAt: new Date().toISOString()
    };
    db.questions.push(newQ);
    saved.push(newQ);
  }

  writeDb(db);
  return saved;
}

// Get attempted question IDs for a specific user
export function getUserAttemptedQuestionIds(userId: string): Set<string> {
  const db = readDb();
  const attempted = new Set<string>();
  
  // Find all attempts by user
  const userAttempts = db.attempts.filter((a) => a.userId.toLowerCase() === userId.toLowerCase());
  for (const attempt of userAttempts) {
    for (const qId of attempt.questions) {
      attempted.add(qId);
    }
  }
  return attempted;
}

// Save a completed quiz attempt
export function saveAttempt(attempt: Omit<DbAttempt, "id" | "timestamp">): DbAttempt {
  const db = readDb();
  const newAttempt: DbAttempt = {
    ...attempt,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString()
  };
  db.attempts.push(newAttempt);
  writeDb(db);
  return newAttempt;
}

// Fetch general history for a user
export function getUserAttempts(userId: string): DbAttempt[] {
  const db = readDb();
  return db.attempts
    .filter((a) => a.userId.toLowerCase() === userId.toLowerCase())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// Get all stored questions in db
export function getAllQuestions(): DbQuestion[] {
  const db = readDb();
  return db.questions;
}

// Search and fetch matching questions based on topic keywords and difficulty level, skipping attempted IDs
export function queryMatchingQuestions(
  topicQuery: string,
  difficulty: "Easy" | "Medium" | "Hard",
  skipIds: Set<string>
): DbQuestion[] {
  const db = readDb();
  const queryWords = topicQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  
  if (queryWords.length === 0) {
    // If empty keywords, match general
    return db.questions.filter(q => q.difficulty === difficulty && !skipIds.has(q.id));
  }

  return db.questions.filter((q) => {
    // Skip if already attempted
    if (skipIds.has(q.id)) return false;
    
    // Check difficulty match
    if (q.difficulty !== difficulty) return false;

    // Check keyword score matching
    const normQuestion = q.question.toLowerCase();
    const normTopic = q.topic.toLowerCase();
    const normSubject = q.subject.toLowerCase();
    
    let matchScore = 0;
    for (const word of queryWords) {
      if (normQuestion.includes(word)) matchScore += 1;
      if (normTopic.includes(word)) matchScore += 3;
      if (normSubject.includes(word)) matchScore += 2;
    }

    return matchScore > 0;
  });
}
