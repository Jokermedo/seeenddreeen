'use client';

import { useState, useEffect, useCallback } from 'react';
import { COUNTDOWN_INITIAL } from '@/lib/constants';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(COUNTDOWN_INITIAL);

  const tick = useCallback(() => {
    setTimeLeft(prev => {
      const total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;
      if (total <= 0) return prev;
      const n = total - 1;
      return { hours: Math.floor(n / 3600), minutes: Math.floor((n % 3600) / 60), seconds: n % 60 };
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    const interval = setInterval(tick, 1000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, [tick]);

  if (!mounted) return null;

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div
      role="timer"
      aria-label="الوقت المتبقي للخصم"
      aria-live="polite"
      className="bg-stone-900 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-3"
    >
      <span className="text-stone-400">⏳ عرض خاص ينتهي خلال:</span>
      {isExpired ? (
        <span className="text-rose-400 font-bold">اطلبي الآن بسعر الخصم!</span>
      ) : (
        <span className="font-mono font-bold text-rose-400 tracking-widest" dir="ltr">
          {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      )}
    </div>
  );
}
