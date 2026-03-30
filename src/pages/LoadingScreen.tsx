import { useEffect, useState } from 'react';
import ErobloxLogo from '../components/ErobloxLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl opacity-40">
            <ErobloxLogo size="xl" />
          </div>
          <ErobloxLogo size="xl" />
        </div>

        {/* Loading bar */}
        <div className="w-80 mt-6">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-violet-600 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-3 text-center font-medium">
            {progress < 30 && 'Connecting to servers...'}
            {progress >= 30 && progress < 60 && 'Loading assets...'}
            {progress >= 60 && progress < 90 && 'Preparing experience...'}
            {progress >= 90 && 'Almost ready!'}
          </p>
        </div>

        <p className="text-gray-600 text-xs mt-4">v1.0.0 &copy; 2024 Eroblox Corporation</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
