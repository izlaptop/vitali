
export interface HealthLog {
  date: string;
  steps: number;
  calories: number;
  waterIntake: number; // in ml
  sleepHours: number;
  weight: number; // in kg
  heartRate: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  code: string;
}

export interface VideoEntry {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  password?: string;
  avatar: string;
  targetWeight: number;
  logs: HealthLog[];
  preferences: string[];
  videos: VideoEntry[];
  role: 'user' | 'admin';
  lastAccess?: number;
}

export type AppView = 'dashboard' | 'recipes' | 'coach' | 'comm' | 'games' | 'vault' | 'admin';
