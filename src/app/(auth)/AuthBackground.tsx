'use client';
import { motion } from 'framer-motion';
import { Truck, BarChart3 } from 'lucide-react';

export default function AuthBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh grid place-items-center px-4 py-8 md:py-12 overflow-hidden bg-primary">
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-8 top-16 text-primary-foreground/25"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      >
        <Truck className="h-12 w-12" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 bottom-20 text-primary-foreground/20"
        initial={{ y: 10 }}
        animate={{ y: -10 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      >
        <BarChart3 className="h-10 w-10" />
      </motion.div>

      {children}
    </div>
  );
}
