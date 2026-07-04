'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="px-4 pt-6">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary shadow-glow flex items-center justify-center" aria-hidden="true">
              <span className="text-white text-lg font-extrabold">A</span>
            </div>
            <div>
              <div className="font-display font-extrabold tracking-tight text-white text-xl">ArenaX</div>
              <div className="text-text-secondary text-xs -mt-0.5">Esports tournaments</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-border-glass/60 px-3 py-2 text-sm font-semibold text-text-primary/90 hover:text-white hover:border-accent-primary/60 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary px-3 py-2 text-sm font-extrabold text-white shadow-glow hover:opacity-95 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 pt-10 pb-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border-glass/60 bg-surface-primary/40 px-3 py-1.5">
              <span aria-hidden="true">🔥</span>
              <span className="text-xs font-semibold text-text-secondary">Free Fire • BGMI • Daily tournaments</span>
            </div>

            <h1 className="mt-5 font-display font-extrabold tracking-tight text-white text-4xl leading-[1.05]">
              Compete. Win. Dominate.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
              ArenaX is your mobile-first arena for elite esports tournaments. Join squads, climb leaderboards, and get instant wallet updates.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary px-5 py-3 text-sm sm:text-base font-extrabold text-white shadow-glow hover:opacity-95 transition"
              >
                🎮 Go to Dashboard
              </Link>
              <Link
                href="/tournaments"
                className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 px-5 py-3 text-sm sm:text-base font-bold text-text-primary/90 hover:text-white hover:border-accent-primary/60 transition"
              >
                🏆 Explore Tournaments
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{
                title: 'Premium match flow',
                desc: 'Smooth registration + instant updates.'
              }, {
                title: 'Real-time leaderboards',
                desc: 'Track ranks and rewards.'
              }, {
                title: 'Wallet & bonuses',
                desc: 'Earn, withdraw, and claim perks.'
              }].map((c) => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border-glass/60 bg-surface-primary/40 px-4 py-4 text-left"
                >
                  <div className="font-display font-extrabold text-white text-sm">{c.title}</div>
                  <div className="mt-1 text-xs text-text-secondary leading-relaxed">{c.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="px-4 pb-8">
        <div className="mx-auto max-w-2xl text-center text-xs text-text-secondary/90">
          © {new Date().getFullYear()} ArenaX Esports Platform. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

