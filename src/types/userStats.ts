export interface IUserStats {
  projects: number;
  archived: number;
  starMarked: number;
  reputation: number;
  streak: number;
  maxStreak: number;
  lastCountedStreak: Date;
  achievements: IAchievement[];
  rank: IRank;
}

export interface IRank {
  _id: string;
  name: string;
  rank: string;
  description: string;
  badge: string;
  minReputation: number;
  minStreak: number;
}

export interface IAchievement {
  _id: string;
  name: string;
  badge: string;
  description: string;
}