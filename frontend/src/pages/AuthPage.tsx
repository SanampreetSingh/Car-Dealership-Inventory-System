import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Car, ArrowLeft } from 'lucide-react';
import SlidingPanel from '../components/auth/SlidingPanel';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { loginUser, registerUser } from '../api/authApi';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';
import type { User } from '../types';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const redirectTo = (location.state as { from?: string })?.from || '/';

  const handleLogin = async (data: { email: string; password: string }) => {
    setSubmitting(true);
    try {
      const res = await loginUser(data);
      const user: User = {
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role,
      };
      dispatch(setCredentials({ user, token: res.token }));
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      navigate(redirectTo, { replace: true });
    } catch {
      // handled globally by axios interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setSubmitting(true);
    try {
      const res = await registerUser(data);
      dispatch(setCredentials({ user: res.user, token: res.token }));
      toast.success(`Account created! Welcome, ${res.user.name.split(' ')[0]}.`);
      navigate(redirectTo, { replace: true });
    } catch {
      // handled globally
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLogin ? 'login' : 'register'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
      >
        <h2 className="mb-1 text-2xl font-bold text-stone-50">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="mb-6 text-sm text-stone-500">
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-amber-500 hover:underline"
          >
            {isLogin ? 'Register here' : 'Sign in here'}
          </button>
        </p>

        {isLogin ? (
          <LoginForm onSubmit={handleLogin} submitting={submitting} />
        ) : (
          <RegisterForm onSubmit={handleRegister} submitting={submitting} />
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-stone-950 px-4 py-10">
      <Link
        to="/"
        className="absolute left-4 top-20 flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-amber-500 sm:left-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="relative flex w-full max-w-5xl overflow-hidden rounded-3xl border-2 border-stone-800 bg-stone-900 shadow-2xl shadow-black/40 lg:h-[600px]">
        {/* Desktop sliding brand panel — anchored LEFT, slides right on register */}
        <SlidingPanel isLogin={isLogin} />

        {/* Mobile brand header (shown only below lg) */}
        <div className="flex w-full flex-col items-center gap-2 border-b border-stone-800 bg-gradient-to-br from-stone-900 to-amber-950/30 px-6 py-8 lg:hidden">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700">
            <Car className="h-6 w-6 text-stone-950" />
          </div>
          <h1 className="text-xl font-bold text-stone-50">
            {isLogin ? 'Welcome Back' : 'Join ApexMotors'}
          </h1>
        </div>

        {/* Desktop form panel — anchored RIGHT, slides left on register (mirrors brand panel) */}
        <motion.div
          animate={{ x: isLogin ? '0%' : '-100%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="absolute right-0 top-0 hidden h-full w-1/2 flex-col justify-center px-12 lg:flex"
        >
          {formContent}
        </motion.div>

        {/* Mobile form (always visible below lg, no transform needed) */}
        <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:hidden">
          {formContent}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;