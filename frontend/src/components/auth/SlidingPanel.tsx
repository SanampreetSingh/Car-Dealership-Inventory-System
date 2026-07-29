import { motion } from 'framer-motion';
import { Car, ShieldCheck, Sparkles } from 'lucide-react';

interface SlidingPanelProps {
  isLogin: boolean;
}

const SlidingPanel = ({ isLogin }: SlidingPanelProps) => {
  return (
    <motion.div
      animate={{ x: isLogin ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="absolute z-10 hidden h-full w-1/2 flex-col justify-center bg-linear-to-br from-stone-900 via-stone-900 to-amber-950/40 lg:flex"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500 to-amber-700 shadow-xl shadow-amber-900/40">
          <Car className="h-8 w-8 text-stone-950" />
        </div>

        <motion.div
          key={isLogin ? 'login-copy' : 'register-copy'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-stone-50">
            {isLogin ? 'Welcome Back' : 'Join ApexMotors'}
          </h1>
          <p className="mt-4 max-w-sm text-stone-400">
            {isLogin
              ? 'Sign in to continue browsing and purchasing certified vehicles from our inventory.'
              : 'Create an account to unlock purchasing, saved searches, and exclusive listings.'}
          </p>
        </motion.div>

        <div className="mt-4 flex flex-col gap-3 text-left">
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-amber-500" />
            Secure JWT-based authentication
          </div>
          <div className="flex items-center gap-3 text-sm text-stone-400">
            <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
            Instant access to full inventory
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SlidingPanel;