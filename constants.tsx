
import { EcoChallenge, EcoArticle, UserProfile, QuizQuestion } from './types';

export const MOCK_USER: UserProfile = {
  name: "Sarah Green",
  level: 12,
  title: "Eco-Warrior",
  points: 1250,
  avatar: "https://picsum.photos/seed/sarah/200/200"
};

export const DAILY_QUESTS: EcoChallenge[] = [
  {
    id: "q1",
    title: "Meatless Monday",
    description: "Eat only plant-based meals today",
    points: 30,
    progress: 1,
    total: 3,
    unit: "Meals",
    icon: "restaurant",
    image: "https://picsum.photos/seed/salad/600/400"
  },
  {
    id: "q2",
    title: "Commute by Bike",
    description: "Cycle to work or school",
    points: 50,
    progress: 1,
    total: 1,
    unit: "Ride",
    icon: "pedal_bike",
    completed: false
  }
];

export const WEEKLY_GOALS: EcoChallenge[] = [
  {
    id: "w1",
    title: "Zero Plastic Week",
    description: "Avoid all single-use plastics for 7 days",
    points: 150,
    progress: 4,
    total: 7,
    unit: "Days",
    icon: "shopping_bag"
  }
];

export const ARTICLES: EcoArticle[] = [
  {
    id: "a1",
    category: "CONSERVATION",
    title: "Preserving the Amazon: A Global Imperative",
    author: "Elena Vance",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/forest/600/400"
  },
  {
    id: "a2",
    category: "RENEWABLE ENERGY",
    title: "The Unstoppable Rise of Solar Power",
    author: "Marcus Thorne",
    readTime: "4 min read",
    image: "https://picsum.photos/seed/solar/600/400"
  }
];

export const MICROPLASTICS_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary source of primary microplastics in the ocean?",
    options: ["Degraded plastic bags", "Cosmetic microbeads & fibers", "Shipwrecks", "Fish waste"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Roughly how many tons of plastic enter our oceans every year?",
    options: ["1 million", "4 million", "8-12 million", "50 million"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Microplastics are defined as plastic particles smaller than...",
    options: ["5 millimeters", "1 centimeter", "1 micrometer", "50 millimeters"],
    correctAnswer: 0
  }
];

export const HALL_OF_FAME = [
  { name: "EcoTom", points: 4520, level: 45, avatar: "https://i.pravatar.cc/150?u=tom" },
  { name: "GreenQueen", points: 3890, level: 39, avatar: "https://i.pravatar.cc/150?u=queen" },
  { name: "SolarSam", points: 3120, level: 31, avatar: "https://i.pravatar.cc/150?u=sam" },
  { name: " Sarah Green (You)", points: 1250, level: 12, avatar: "https://picsum.photos/seed/sarah/200/200", current: true }
];
