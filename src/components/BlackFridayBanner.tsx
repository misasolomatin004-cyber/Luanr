import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer } from 'lucide-react';

interface BlackFridayBannerProps {
  onShopNow?: () => void;
}

export default function BlackFridayBanner({ onShopNow }: BlackFridayBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setIsVisible(false);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-black text-white py-12 sm:py-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/20 text-red-500 border border-red-600/30 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase">Limited Time Offer</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500"
          >
            BLACK FRIDAY
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-zinc-300"
          >
            Up to <span className="font-bold text-red-500 text-3xl">-70%</span> off everything
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={onShopNow}
              className="px-8 py-4 bg-white text-black font-bold text-lg tracking-wider uppercase rounded-full hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              Shop Now
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 md:gap-6"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-2 shadow-2xl">
                <span className="text-2xl md:text-3xl font-bold font-mono">{String(item.value).padStart(2, '0')}</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-zinc-500">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
