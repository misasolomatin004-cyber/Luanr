import { createContext, useContext, useState, ReactNode } from 'react';
import { User, RegistrationData } from '../types';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  register: (data: RegistrationData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const OFFICIAL_ACCOUNT: User = {
  id: 'official-001',
  username: 'Eroblox_official',
  displayName: 'Eroblox_official',
  dateOfBirth: '2000-01-01',
  gender: 'male',
  ageGroup: '18plus',
  avatar: 'male',
  erobloBalance: 1000000,
  isPremium: true,
  isVerified: true,
  isOfficial: true,
  createdAt: '2024-01-01',
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    if (username === 'Eroblox_official' && password === '49491dbb1h') {
      setUser(OFFICIAL_ACCOUNT);
      return true;
    }
    return false;
  };

  const register = (data: RegistrationData) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      username: data.username,
      displayName: data.displayName || data.username,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      ageGroup: data.ageGroup,
      avatar: data.gender,
      erobloBalance: 0,
      isPremium: false,
      isVerified: false,
      isOfficial: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
