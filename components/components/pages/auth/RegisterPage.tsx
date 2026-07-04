'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type RegisterForm = {
  username: string;
  email: string;
  phone: string;
  password: string;
  ffUid: string;
  ffUsername: string;
};

function validate(form: RegisterForm) {
  if (!form.username || form.username.trim().length < 3) {
    return 'Username must be at least 3 characters.';
  }
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    return 'Please provide a valid email address.';
  }
  if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone.trim())) {
    return 'Please enter a valid 10-digit Indian mobile number.';
  }
  if (!form.password || form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
    return 'Password must be at least 8 characters and contain letters and numbers.';
  }
  if (!form.ffUid || !form.ffUid.trim()) {
    return 'Free Fire UID is required.';
  }
  if (!form.ffUsername || !form.ffUsername.trim()) {
    return 'Free Fire Username is required.';
  }
  return null;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    phone: '',
    password: '',
    ffUid: '',
    ffUsername: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const strength = useMemo(() => {
    const pwd = form.password;
    if (!pwd) return 0;
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Za-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return Math.min(4, s);
  }, [form.password]);

  const canSubmit = useMemo(() => !validate(form), [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const message = validate(form);
    if (message) {
      setError(message);
      return;
    }

    setLoading(true);
    try {
      // Mock until API is available
      await new Promise((r) => setTimeout(r, 850));
      setSuccess('Registration successful! Redirecting to login…');
      window.setTimeout(() => {
        window.location.href = '/login?registered=1';
      }, 1200);
    } catch {
      setError('Registration failed. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  }

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong', 'Strong'][strength] || 'Weak';

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border-glass/60 bg-surface-primary/60 backdrop-blur-xl shadow-glass p-6 md:p-7">
          <div className="text-center mb-5">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-glow">
              <span className="text-white font-extrabold">A</span>
            </div>
            <div className="mt-3 font-display font-extrabold text-white text-2xl tracking-tight">Create Account</div>
            <div className="text-text-secondary text-sm mt-1">Claim your glory—enter tournaments and earn rewards.</div>
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
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="username">
                Platform Username
              </label>
              <input
                id="username"
                value={form.username}
                onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="e.g. shadow_slayer"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="10-digit Indian number"
                autoComplete="tel"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                placeholder="Min 8 chars, letter + number"
                autoComplete="new-password"
                required
              />

              {form.password ? (
                <div className="mt-3">
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${i < strength ? 'bg-accent-secondary' : 'bg-border-glass/30'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-text-secondary">
                    Strength: <span className="font-semibold text-text-primary">{strengthLabel}</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="ffUid">
                  Free Fire UID
                </label>
                <input
                  id="ffUid"
                  value={form.ffUid}
                  onChange={(e) => setForm((s) => ({ ...s, ffUid: e.target.value }))}
                  className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                  placeholder="In-game UID"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2" htmlFor="ffUsername">
                  FF Username
                </label>
                <input
                  id="ffUsername"
                  value={form.ffUsername}
                  onChange={(e) => setForm((s) => ({ ...s, ffUsername: e.target.value }))}
                  className="w-full rounded-xl border border-border-glass/50 bg-surface-secondary/60 px-3 py-2.5 text-sm outline-none focus:ring-4 focus:ring-accent-primary/20"
                  placeholder="In-game Name"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="w-full rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary px-4 py-2.5 text-sm font-extrabold text-white shadow-glow disabled:opacity-60 disabled:cursor-not-allowed transition hover:opacity-95"
            >
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-accent-purple font-bold hover:text-white transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

