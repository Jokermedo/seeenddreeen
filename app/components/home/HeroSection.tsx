'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  onScrollToOrder: () => void;
}

export function HeroSection({ onScrollToOrder }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-8">
      {/* خلفية ديكورية */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -translate-y-1/3 translate-x-1/3 opacity-60 pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 relative z-10">

        {/* الصورة في الأعلى للموبايل */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-44 h-44 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full absolute inset-0 m-auto" />
            <div className="relative w-48 h-56 mx-auto">
              <Image
                src="/assets/logo.jpeg"
                alt="سيروم الجمال الطبيعي"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="192px"
                onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
              />
            </div>
            {/* بادج السعر */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-lg border border-stone-100 whitespace-nowrap">
              <p className="text-[10px] text-stone-400 text-center">بعد الخصم</p>
              <p className="text-lg font-black text-rose-500 text-center">360 ج.م</p>
            </div>
          </div>
        </motion.div>

        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-center"
        >
          <span className="inline-block bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-rose-100">
            🌸 خصم 22% · لفترة محدودة
          </span>

          <h1 className="text-3xl font-black text-stone-900 leading-tight mb-3">
            سيروم الجمال
            <span className="block text-rose-500">لمسة واحدة تكفي</span>
          </h1>

          <p className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
            سيروم طبيعي 100% يمنح بشرتك نضارة حقيقية. نتائج واضحة خلال أسبوعين.
          </p>

          {/* إحصائيات - iOS pill style */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { value: '⭐ 4.9', label: 'تقييم' },
              { value: '+500', label: 'عميلة' },
              { value: '14 يوم', label: 'ضمان' },
            ].map((stat, i) => (
              <div key={i} className="bg-stone-100 rounded-2xl px-4 py-2 text-center">
                <p className="text-sm font-bold text-stone-800">{stat.value}</p>
                <p className="text-[10px] text-stone-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* زر CTA */}
          <button
            onClick={onScrollToOrder}
            className="w-full max-w-xs mx-auto bg-rose-500 active:bg-rose-600 text-white font-black py-4 rounded-2xl text-base shadow-lg shadow-rose-200 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <span>🛍️</span>
            <span>اطلبي الآن – 360 ج.م</span>
          </button>

          <p className="text-xs text-stone-400 mt-3">
            <span className="line-through">460 ج.م</span>
            {' '}· شحن مجاني لكل مصر
          </p>
        </motion.div>
      </div>
    </section>
  );
}
