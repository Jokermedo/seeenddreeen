'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const benefits = [
  {
    emoji: '✨', title: 'نضارة طبيعية',
    description: 'إشراق فوري ونعومة فائقة من أول استخدام.',
    gradient: 'from-rose-50 to-pink-50', border: 'border-rose-100',
    icon_bg: 'bg-rose-100',
  },
  {
    emoji: '🌿', title: 'مكونات نقية',
    description: 'طبيعي 100%، بدون كيماويات أو بارابين.',
    gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-100',
    icon_bg: 'bg-emerald-100',
  },
  {
    emoji: '⭐', title: 'نتائج مضمونة',
    description: '93% من العميلات لاحظن فرقاً خلال أسبوعين.',
    gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-100',
    icon_bg: 'bg-amber-100',
  },
];

const trust = [
  { icon: '🚚', label: 'شحن مجاني لكل مصر' },
  { icon: '🤝', label: 'دفع عند الاستلام' },
  { icon: '✅', label: 'ضمان 14 يوم' },
];

// بطاقة 3D بتتفاعل مع اللمس
function Card3D({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 400, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 400, damping: 30 });

  const handleMove = (cx: number, cy: number) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(cx - rect.left - rect.width / 2);
    y.set(cy - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 600 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchMove={(e) => { const t = e.touches[0]; handleMove(t.clientX, t.clientY); }}
      onTouchEnd={reset}
      className={`bg-gradient-to-br ${benefit.gradient} border ${benefit.border} rounded-2xl flex items-center gap-4 px-4 py-4 cursor-pointer select-none`}
    >
      <motion.div
        whileTap={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        className={`w-12 h-12 ${benefit.icon_bg} rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm`}
      >
        {benefit.emoji}
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="font-black text-stone-900 text-sm">{benefit.title}</p>
        <p className="text-stone-500 text-xs leading-relaxed mt-0.5">{benefit.description}</p>
      </div>
    </motion.div>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-8 bg-[#FDF6F9]" id="benefits">
      <div className="max-w-2xl mx-auto px-4">

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-black text-rose-400 tracking-widest mb-5 uppercase"
        >
          ✨ لماذا سندرين؟
        </motion.p>

        <div className="space-y-3">
          {benefits.map((b, i) => (
            <Card3D key={i} benefit={b} index={i} />
          ))}
        </div>

        {/* شريط الثقة */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-white rounded-2xl px-2 py-3 shadow-sm flex items-center justify-around border border-rose-50"
        >
          {trust.map((item, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] text-stone-400 font-semibold text-center leading-tight max-w-[56px]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
