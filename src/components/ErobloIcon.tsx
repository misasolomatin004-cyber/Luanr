

interface ErobloIconProps {
  size?: number;
  className?: string;
}

export default function ErobloIcon({ size = 20, className = '' }: ErobloIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <circle cx="12" cy="12" r="11" fill="url(#coinGrad)" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="12" y="16.5" textAnchor="middle" fill="#fff" fontWeight="900" fontSize="13" fontFamily="Arial Black, Arial, sans-serif">E</text>
      <defs>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}
