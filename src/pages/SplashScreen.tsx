import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-light tracking-widest text-zinc-900 mb-4 font-serif">
          LUNA
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Fashion</p>
      </motion.div>

      <div className="mt-12 w-64">
        <p className="text-xs text-center text-zinc-400 mb-2 tracking-wider">
          Loading new collection...
        </p>
        <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-zinc-900"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
