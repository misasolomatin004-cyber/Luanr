

interface ErobloxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function ErobloxLogo({ size = 'md', className = '' }: ErobloxLogoProps) {
  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg
          viewBox="0 0 60 60"
          className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : size === 'lg' ? 'w-16 h-16' : 'w-24 h-24'}`}
          fill="none"
        >
          <rect x="2" y="2" width="56" height="56" rx="12" fill="url(#logoGrad)" stroke="#fff" strokeWidth="2" />
          <text x="30" y="42" textAnchor="middle" fill="white" fontWeight="900" fontSize="32" fontFamily="Arial Black, Arial, sans-serif">E</text>
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="60" y2="60">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className={`font-black tracking-tight ${sizeMap[size]} bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent`}>
        Eroblox
      </span>
    </div>
  );
}
