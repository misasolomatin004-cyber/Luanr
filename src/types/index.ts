export interface User {
  id: string;
  username: string;
  displayName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  ageGroup: string;
  avatar: string;
  erobloBalance: number;
  isPremium: boolean;
  isVerified: boolean;
  isOfficial: boolean;
  createdAt: string;
}

export interface GamePlace {
  id: string;
  title: string;
  thumbnail: string;
  creator: string;
  players: number;
  maxPlayers: number;
  likes: number;
  genre: string;
}

export interface ErobloPackage {
  id: string;
  amount: number;
  price: number;
  bonus: number;
  popular: boolean;
}

export type AgeGroup = 'under13' | '13to17' | '18plus';

export interface RegistrationData {
  username: string;
  password: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  ageGroup: AgeGroup;
  displayName: string;
}
