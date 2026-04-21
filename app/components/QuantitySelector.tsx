'use client';

import { useState, useCallback } from 'react';
import { MAX_QUANTITY, MIN_QUANTITY, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

export function QuantitySelector({ onQuantityChange, initialQuantity = 1 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const update = useCallback((qty: number) => {
    setQuantity(qty);
    onQuantityChange(qty);
  }, [onQuantityChange]);

  const dec = useCallback(() => { if (quantity > MIN_QUANTITY) update(quantity - 1); }, [quantity, update]);
  const inc = useCallback(() => { if (quantity < MAX_QUANTITY) update(quantity + 1); }, [quantity, update]);

  return (
    <div className="space-y-3 w-full">
      {/* Counter */}
      <div
        className="flex items-center gap-3 justify-center"
        role="group"
        aria-label="اختيار الكمية"
      >
        <button
          onClick={dec}
          disabled={quantity <= MIN_QUANTITY}
          aria-label="إنقاص الكمية"
          className="w-10 h-10 rounded-lg border border-stone-200 bg-white hover:border-rose-300 disabled:opacity-30 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
          </svg>
        </button>

        <span
          className="w-10 text-center font-bold text-lg text-stone-800"
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </span>

        <button
          onClick={inc}
          disabled={quantity >= MAX_QUANTITY}
          aria-label="زيادة الكمية"
          className="w-10 h-10 rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-30 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Quick select */}
      <div className="flex gap-1.5 justify-center">
        {[1, 2, 3, 4, 5].map(qty => (
          <button
            key={qty}
            onClick={() => update(qty)}
            aria-label={`${qty} وحدة`}
            aria-pressed={quantity === qty}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${quantity === qty
                ? 'bg-rose-500 text-white'
                : 'bg-stone-100 text-stone-500 hover:bg-rose-50'
              }`}
          >
            {qty}
          </button>
        ))}
      </div>

      {/* Shipping hint */}
      <div
        role="status"
        aria-live="polite"
        className={`transition-all duration-300 overflow-hidden ${quantity < FREE_SHIPPING_THRESHOLD ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <button
          onClick={() => update(FREE_SHIPPING_THRESHOLD)}
          className="w-full text-xs text-center bg-amber-50 border border-amber-100 rounded-lg py-2 px-3 text-amber-700 font-medium hover:bg-amber-100 transition-colors"
        >
          💡 خذي حبتين واحصلي على شحن مجاني!
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`transition-all duration-300 overflow-hidden ${quantity >= FREE_SHIPPING_THRESHOLD ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="w-full text-xs text-center bg-emerald-50 border border-emerald-100 rounded-lg py-2 px-3 text-emerald-700 font-medium">
          ✅ حصلتِ على شحن مجاني!
        </p>
      </div>
    </div>
  );
}
