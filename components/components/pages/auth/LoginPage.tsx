'use client';


import { useMemo, useState } from 'react';
import Link from 'next/link';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    remember: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!form.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return false;
    if (form.password.length < 6) return false;
    return true;
  }, [form.email, form.password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!canSubmit) {
      setError('Please enter valid email and password.');
      return;
    }

    setLoading(true);
    try {
      // Mock auth until real API is available
      await new Promise((r) => setTimeout(r, 650));

      setSuccess('Login successful! Redirecting…');
      window.setTimeout(() => {
        window.location.href = '/dashboard';
      }, 650);
    } catch {
      setError('Login failed. Check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border-glass/60 bg-surface-primary/60 backdrop-blur-xl shadow-glass p-6 md:p-7">
          <div className="text-center mb-5">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow">
              <span className="text-white font-extrabold">A</span>
            </div>
            <div className="mt-3 font-display font-extrabold text-white text-2xl tracking-tight">Welcome Back</div>
            <div className="text-text-secondary text-sm mt-1">Log in to play tournaments and earn rewards.</div>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200" role="status">
              {success}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="player@arenax.in"
                aria-required="true"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="••••••••"
                aria-required="true"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-xs text-text-secondary select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm((s) => ({ ...s, remember: e.target.checked }))}
                  className="accent-accent-primary"
                />
                Remember me
              </label>
              <Link href="/auth/forgot-password" className="text-xs font-semibold text-accent-purple hover:text-white transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary px-4 py-2.5 text-sm font-extrabold text-white shadow-glow disabled:opacity-60 disabled:cursor-not-allowed transition hover:opacity-95"
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-text-secondary">
            New here?{' '}
            <Link href="/register" className="text-accent-purple font-bold hover:text-white transition">
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

