
import { EcoChallenge, EcoArticle, EcoVideo, UserProfile } from './types';

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
    completed: true
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

export const VIDEOS: EcoVideo[] = [
  {
    id: "v1",
    title: "Quick Guide to Home Composting",
    duration: "0:45",
    thumbnail: "https://picsum.photos/seed/compost/400/600"
  },
  {
    id: "v2",
    title: "Recycling: Common Myths Busted",
    duration: "1:12",
    thumbnail: "https://picsum.photos/seed/recycle/400/600"
  }
];
