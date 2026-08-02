"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Toast";

const ICONS = {
  success: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  error: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-2-2l-2 2m-2-2l2 2m-2-2l-2-2" /></svg>,
  warning: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  info: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  loading: <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>,
};

const CONFIGS = {
  success: { bg: "bg-[var(--color-success)]/15 border-[var(--color-success)]/30 text-[var(--color-success)]", iconColor: "text-[var(--color-success)]" },
  error: { bg: "bg-[var(--color-error)]/15 border-[var(--color-error)]/30 text-[var(--color-error)]", iconColor: "text-[var(--color-error)]" },
  warning: { bg: "bg-[var(--color-warning)]/15 border-[var(--color-warning)]/30 text-[var(--color-warning)]", iconColor: "text-[var(--color-warning)]" },
  info: { bg: "bg-[var(--color-brand)]/15 border-[var(--color-brand)]/30 text-[var(--color-brand)]", iconColor: "text-[var(--color-brand)]" },
  loading: { bg: "bg-[var(--color-brand)]/15 border-[var(--color-brand)]/30 text-[var(--color-brand)]", iconColor: "text-[var(--color-brand)]" },
};

function ToastItem({ toast, onClose }: { toast: any; onClose: (id: string) => void }) {
  const config = CONFIGS[toast.type];
  const icon = ICONS[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 min-w-[320px] max-w-md shadow-[var(--shadow-xl)] ${config.bg}`}
    >
      <div className={`flex-shrink-0 flex h-5 w-5 items-center justify-center ${config.iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm font-medium">{toast.title}</p>
        {toast.message && <p className="mt-1 text-sm opacity-80">{toast.message}</p>}
      </div>
      <motion.button
        onClick={() => onClose(toast.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
        aria-label="Tutup notifikasi"
      >
        <svg className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </motion.button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col-reverse gap-3 pointer-events-none"
      aria-live="polite"
      aria-label="Notifikasi"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={hideToast} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}