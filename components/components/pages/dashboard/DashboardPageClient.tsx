'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { walletService, type Wallet, tournamentService } from '@/services';
import { session } from '@/services/mock/session';

type QuickStat = {
  label: string;
  value: string;
  sub?: string;
};

function formatINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function timeFromNow(iso: string) {
  const d = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(d);
  const minutes = Math.max(0, Math.round(abs / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}

export default function DashboardPageClient() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nextTournaments, setNextTournaments] = useState<Awaited<ReturnType<typeof tournamentService.listUpcoming>>>([]);

  const user = useMemo(() => session.getUser(), []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [w, t] = await Promise.all([walletService.getWallet(), tournamentService.listUpcoming()]);
        if (!alive) return;
        setWallet(w);
        setNextTournaments(t.slice(0, 3));
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : 'Failed to load dashboard');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const stats: QuickStat[] = useMemo(() => {
    return [
      { label: 'Wallet Balance', value: wallet ? formatINR(wallet.balance) : '—', sub: 'INR balance' },
      { label: 'Bonus Balance', value: wallet ? formatINR(wallet.bonusBalance) : '—', sub: 'Claim perks' },
      { label: 'Next Match', value: nextTournaments[0]?.title || '—', sub: nextTournaments[0] ? `Starts in ${timeFromNow(nextTournaments[0].startsAt)}` : undefined }
    ];
  }, [nextTournaments, wallet]);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-glass/60 bg-surface-primary/40 px-3 py-1.5">
                <span aria-hidden="true">⚡</span>
                <span className="text-xs font-semibold text-text-secondary">Dashboard</span>
              </div>
              <h1 className="mt-4 font-display font-extrabold tracking-tight text-white text-3xl leading-[1.1]">
                Welcome{user?.username ? `, ${user.username}` : ''}
              </h1>
              <p className="mt-2 text-sm text-text-secondary">Your next tournaments, wallet status, and rewards—updated instantly (mock).</p>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <Link
                href="/tournaments"
                className="rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary px-4 py-2 text-sm font-extrabold text-white shadow-glow hover:opacity-95 transition"
              >
                Explore Tournaments
              </Link>
              <Link
                href="/wallet"
                className="text-xs font-semibold text-accent-purple hover:text-white transition"
              >
                View wallet & bonus
              </Link>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((s, idx) => (
              <div key={s.label + idx} className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 p-4">
                <div className="h-3 w-32 bg-white/10 rounded mb-3 animate-pulse" />
                <div className="h-7 w-40 bg-white/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200" role="alert">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 p-4"
              >
                <div className="text-xs font-semibold text-text-secondary">{s.label}</div>
                <div className="mt-2 font-display font-extrabold text-white text-xl">{s.value}</div>
                {s.sub ? <div className="mt-1 text-xs text-text-secondary">{s.sub}</div> : null}
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <section className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 p-4 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-text-secondary">Next tournaments</div>
                <div className="mt-2 font-display font-extrabold text-white text-lg">Pick your battle</div>
              </div>
              <Link href="/tournaments" className="text-xs font-semibold text-accent-purple hover:text-white transition">
                View all
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {nextTournaments.map((t) => (
                <motion.div key={t.id} whileHover={{ y: -4 }} className="rounded-xl border border-border-glass/60 bg-surface-secondary/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-text-secondary">{t.game}</div>
                      <div className="mt-1 font-display font-extrabold text-white text-sm">{t.title}</div>
                    </div>
                    <div className="rounded-full border border-border-glass/60 bg-surface-primary/30 px-2 py-1 text-[11px] font-extrabold text-accent-cyan">
                      {t.status}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-text-secondary">Starts in {timeFromNow(t.startsAt)}</div>
                  <Link href={`/tournaments/${t.id}`} className="mt-3 inline-flex text-xs font-extrabold text-white/90 hover:text-white transition">
                    View details →
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 p-4">
            <div className="text-xs font-semibold text-text-secondary">Quick actions</div>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/leaderboard" className="rounded-xl border border-border-glass/60 bg-surface-secondary/40 px-3 py-2 text-sm font-extrabold text-white hover:border-accent-primary/60 transition">
                🏆 View leaderboard
              </Link>
              <Link href="/notifications" className="rounded-xl border border-border-glass/60 bg-surface-secondary/40 px-3 py-2 text-sm font-extrabold text-white hover:border-accent-primary/60 transition">
                🔔 Notifications
              </Link>
              <Link href="/profile" className="rounded-xl border border-border-glass/60 bg-surface-secondary/40 px-3 py-2 text-sm font-extrabold text-white hover:border-accent-primary/60 transition">
                👤 Profile
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

