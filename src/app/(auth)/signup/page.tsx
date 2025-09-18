'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import AuthBackground from '../AuthBackground';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <AuthBackground>
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_10px_30px_rgba(0,0,0,.12)]"
      >
        <div className="rounded-2xl bg-white text-black ring-1 ring-black/5 max-h-[85dvh] overflow-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary" />
              <h1 className="text-xl font-semibold tracking-tight text-center">
                Create your Kalibur account
              </h1>
            </div>
            <p className="mt-2 text-black/60 text-sm text-center">
              Start exploring AI-powered ops insights.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                setTimeout(() => setLoading(false), 900);
              }}
            >
              <div className="space-y-2">
                <label className="text-sm" htmlFor="name">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Doe"
                    className="w-full rounded-md border border-black/10 bg-white pl-10 pr-4 py-2.5 outline-none focus:ring-2 ring-primary/40"
                    required
                    aria-label="Full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm" htmlFor="email">
                  Work email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-black/10 bg-white pl-10 pr-4 py-2.5 outline-none focus:ring-2 ring-primary/40"
                    required
                    aria-label="Work email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-black/10 bg-white pl-10 pr-4 py-2.5 outline-none focus:ring-2 ring-primary/40"
                    required
                    aria-label="Password"
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full rounded-md bg-primary text-white py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Creating...' : 'Create account'}
              </motion.button>
            </form>

            <p className="mt-4 text-sm text-black/60 text-center">
              Already have an account?{' '}
              <Link className="text-primary hover:underline" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuthBackground>
  );
}
