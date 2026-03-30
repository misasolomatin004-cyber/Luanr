import { useState, useCallback } from 'react';
import { UserProvider } from './context/UserContext';
import LoadingScreen from './pages/LoadingScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import './App.css';

type Page = 'loading' | 'login' | 'register' | 'home' | 'store';

function AppContent() {
  const [page, setPage] = useState<Page>('loading');

  const handleLoadingComplete = useCallback(() => {
    setPage('login');
  }, []);

  switch (page) {
    case 'loading':
      return <LoadingScreen onComplete={handleLoadingComplete} />;
    case 'login':
      return (
        <LoginPage
          onLogin={() => setPage('home')}
          onGoToRegister={() => setPage('register')}
        />
      );
    case 'register':
      return (
        <RegisterPage
          onRegister={() => setPage('home')}
          onGoToLogin={() => setPage('login')}
        />
      );
    case 'home':
      return (
        <HomePage
          onOpenStore={() => setPage('store')}
          onLogout={() => setPage('login')}
        />
      );
    case 'store':
      return <StorePage onBack={() => setPage('home')} />;
    default:
      return null;
  }
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
