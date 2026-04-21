'use client';

import { useState, useEffect, useCallback } from 'react';
import { TOAST_INITIAL_DELAY, TOAST_DISPLAY_DURATION, TOAST_LOOP_INTERVAL } from '@/lib/constants';

interface Purchase {
  name: string;
  city: string;
  qty: number;
}

const PURCHASES: Purchase[] = [
  { name: 'ياسمين', city: 'الإسكندرية', qty: 2 },
  { name: 'سارة', city: 'القاهرة', qty: 1 },
  { name: 'نورهان', city: 'المنصورة', qty: 3 },
  { name: 'هدى', city: 'الجيزة', qty: 2 },
  { name: 'منة', city: 'طنطا', qty: 1 },
  { name: 'رنا', city: 'الزقازيق', qty: 2 },
];

function getTimeAgo(minutes: number): string {
  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} د`;
  return 'منذ ساعة';
}

export function RecentPurchasesToast() {
  const [current, setCurrent] = useState<Purchase>(PURCHASES[0]);
  const [visible, setVisible] = useState(false);
  const [minutesAgo, setMinutesAgo] = useState(0);

  const hide = useCallback(() => setVisible(false), []);

  useEffect(() => {
    let mounted = true;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const show = () => {
      const p = PURCHASES[Math.floor(Math.random() * PURCHASES.length)];
      setCurrent(p);
      setMinutesAgo(0);
      setVisible(true);
      timers.push(setTimeout(() => { if (mounted) hide(); }, TOAST_DISPLAY_DURATION));
    };

    timers.push(setTimeout(show, TOAST_INITIAL_DELAY));
    const interval = setInterval(() => {
      if (!mounted) return;
      setMinutesAgo(p => p + 1);
      show();
    }, TOAST_LOOP_INTERVAL);

    return () => { mounted = false; timers.forEach(clearTimeout); clearInterval(interval); };
  }, [hide]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 md:bottom-6 right-4 z-50 transition-all duration-500 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'
        }`}
    >
      <div className="bg-white border border-stone-100 shadow-lg rounded-xl p-3 flex items-center gap-3 max-w-[260px]">
        <div className="w-9 h-9 shrink-0 bg-emerald-50 rounded-full flex items-center justify-center text-lg">
          🛍️
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-800">
            {current.name} من {current.city}
          </p>
          <p className="text-xs text-stone-400">
            اشترت {current.qty} سيروم · {getTimeAgo(minutesAgo)}
          </p>
        </div>
      </div>
    </div>
  );
}
