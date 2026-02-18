
export enum Tab {
  Home = 'home',
  Challenges = 'challenges',
  Scan = 'scan',
  Learn = 'learn',
  Calculator = 'calculator'
}

export interface UserProfile {
  name: string;
  level: number;
  title: string;
  points: number;
  avatar: string;
}

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  unit: string;
  icon: string;
  image?: string;
  completed?: boolean;
}

export interface EcoArticle {
  id: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
}

export interface EcoVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}
