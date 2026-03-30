

interface AvatarProps {
  gender: 'male' | 'female';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showCircle?: boolean;
}

export default function Avatar({ gender, size = 'md', className = '', showCircle = true }: AvatarProps) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40',
  };

  const svgSize = {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 160,
  };

  const s = svgSize[size];

  // Roblox-style blocky character
  if (gender === 'male') {
    // Noob skin - yellow body, blue pants, green shirt
    return (
      <div className={`${showCircle ? 'rounded-full overflow-hidden bg-gradient-to-b from-sky-400 to-sky-600' : ''} ${sizeMap[size]} flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" width={s * 0.8} height={s * 0.8}>
          {/* Head - yellow */}
          <rect x="30" y="5" width="40" height="35" rx="4" fill="#F5CD30" />
          {/* Eyes */}
          <circle cx="42" cy="22" r="3.5" fill="#1a1a1a" />
          <circle cx="58" cy="22" r="3.5" fill="#1a1a1a" />
          {/* Smile */}
          <path d="M42 30 Q50 36 58 30" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Torso - bright green shirt */}
          <rect x="25" y="40" width="50" height="28" rx="3" fill="#00B251" />
          {/* Arms - yellow */}
          <rect x="12" y="40" width="14" height="26" rx="3" fill="#F5CD30" />
          <rect x="74" y="40" width="14" height="26" rx="3" fill="#F5CD30" />
          {/* Legs - blue pants */}
          <rect x="28" y="68" width="20" height="28" rx="3" fill="#00539F" />
          <rect x="52" y="68" width="20" height="28" rx="3" fill="#00539F" />
        </svg>
      </div>
    );
  }

  // Girl default skin - lighter skin, pink top, purple hair
  return (
    <div className={`${showCircle ? 'rounded-full overflow-hidden bg-gradient-to-b from-pink-400 to-pink-600' : ''} ${sizeMap[size]} flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" width={s * 0.8} height={s * 0.8}>
        {/* Hair behind */}
        <rect x="26" y="2" width="48" height="44" rx="6" fill="#6B21A8" />
        {/* Head */}
        <rect x="30" y="8" width="40" height="32" rx="4" fill="#FDBCB4" />
        {/* Eyes */}
        <circle cx="42" cy="22" r="3.5" fill="#2563EB" />
        <circle cx="58" cy="22" r="3.5" fill="#2563EB" />
        {/* Eye highlights */}
        <circle cx="43.5" cy="20.5" r="1.2" fill="white" />
        <circle cx="59.5" cy="20.5" r="1.2" fill="white" />
        {/* Smile */}
        <path d="M44 30 Q50 35 56 30" stroke="#e11d48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Hair bangs */}
        <rect x="28" y="2" width="44" height="14" rx="4" fill="#6B21A8" />
        {/* Side hair */}
        <rect x="22" y="10" width="10" height="34" rx="3" fill="#6B21A8" />
        <rect x="68" y="10" width="10" height="34" rx="3" fill="#6B21A8" />
        {/* Torso - pink top */}
        <rect x="25" y="42" width="50" height="26" rx="3" fill="#EC4899" />
        {/* Arms */}
        <rect x="12" y="42" width="14" height="24" rx="3" fill="#FDBCB4" />
        <rect x="74" y="42" width="14" height="24" rx="3" fill="#FDBCB4" />
        {/* Legs - dark purple skirt/pants */}
        <rect x="25" y="68" width="50" height="10" rx="2" fill="#7C3AED" />
        <rect x="28" y="78" width="20" height="20" rx="3" fill="#4C1D95" />
        <rect x="52" y="78" width="20" height="20" rx="3" fill="#4C1D95" />
      </svg>
    </div>
  );
}
