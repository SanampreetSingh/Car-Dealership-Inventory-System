import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => Promise<void>;
  submitting: boolean;
}

const LoginForm = ({ onSubmit, submitting }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-stone-300">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2.5 pl-10 pr-4 text-sm text-stone-100 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-stone-300">Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            placeholder="••••••••"
            className="w-full rounded-lg border border-stone-700 bg-stone-900 py-2.5 pl-10 pr-10 text-sm text-stone-100 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 py-2.5 font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogIn className="h-4 w-4" />
        {submitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;