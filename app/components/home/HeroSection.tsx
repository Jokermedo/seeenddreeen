'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface HeroSectionProps {
  onScrollToOrder: () => void;
}

// نجيمة لامعة
function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none sparkle" style={style}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
          fill="url(#sg)" />
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="16" y2="16">
            <stop stopColor="#FF6B9D" />
            <stop offset="1" stopColor="#D4A853" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// بطاقة 3D تتفاعل مع اللمس
function Product3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [15, -15]);
  const rotateY = useTransform(x, [-80, 80], [-15, 15]);
  const springRotX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMove = (clientX: number, clientY: number) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(clientX - rect.left - rect.width / 2);
    y.set(clientY - rect.top - rect.height / 2);
  };

  const handleReset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 800 }}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleReset}
      onTouchMove={(e) => {
        const t = e.touches[0];
        handleMove(t.clientX, t.clientY);
      }}
      onTouchEnd={handleReset}
      className="relative cursor-grab active:cursor-grabbing"
    >
      {/* هالة وردية خلف المنتج */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-300/40 to-pink-200/40 rounded-full blur-3xl scale-110" />

      {/* صورة المنتج */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-52 h-64 mx-auto"
      >
        <Image
          src="/assets/logo.jpeg"
          alt="سيروم الجمال الطبيعي"
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="208px"
          onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
        />
      </motion.div>

      {/* بادج السعر - 3D */}
      <motion.div
        style={{ z: 20 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2 shadow-xl whitespace-nowrap"
      >
        <p className="text-[10px] text-stone-400 text-center">بعد الخصم</p>
        <p className="text-lg font-black text-center shimmer-text">360 ج.م</p>
      </motion.div>

      {/* بادج الضمان */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-2 -right-2 glass-rose rounded-xl px-2 py-1 shadow-lg"
      >
        <p className="text-[9px] font-black text-rose-600">✨ طبيعي 100%</p>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection({ onScrollToOrder }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-4 pb-10">
      {/* Blob خلفية */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200/30 blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-100/40 blob pointer-events-none"
        style={{ animationDelay: '-4s' }} />

      {/* نجوم لامعة */}
      <Sparkle style={{ top: '12%', right: '8%', '--duration': '2.2s' } as React.CSSProperties} />
      <Sparkle style={{ top: '25%', left: '6%', '--duration': '3s', transform: 'scale(0.7)' } as React.CSSProperties} />
      <Sparkle style={{ bottom: '20%', right: '12%', '--duration': '2.7s', transform: 'scale(1.3)' } as React.CSSProperties} />
      <Sparkle style={{ top: '60%', left: '10%', '--duration': '3.5s', transform: 'scale(0.5)' } as React.CSSProperties} />

      <div className="max-w-2xl mx-auto px-4 relative z-10">

        {/* المنتج 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <Product3DCard />
        </motion.div>

        {/* النص */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block glass-rose text-rose-600 text-xs font-black px-4 py-2 rounded-full mb-4 border border-rose-200"
          >
            🌸 خصم 22% · عرض محدود
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-black text-stone-900 leading-tight mb-2"
          >
            سيروم الجمال
            <span className="block shimmer-text">لمسة واحدة تكفي ✨</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto"
          >
            سيروم طبيعي 100% يمنح بشرتك نضارة حقيقية خلال أسبوعين فقط 🌿
          </motion.p>

          {/* الإحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-2 mb-6"
          >
            {[
              { v: '⭐ 4.9', l: 'تقييم' },
              { v: '+500', l: 'عميلة' },
              { v: '14 يوم', l: 'ضمان' },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-2xl px-3 py-2 text-center shadow-sm"
              >
                <p className="text-sm font-black text-stone-800">{s.v}</p>
                <p className="text-[10px] text-stone-400">{s.l}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* زر CTA - مع glow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={onScrollToOrder}
              whileTap={{ scale: 0.96 }}
              className="w-full max-w-xs mx-auto bg-gradient-to-l from-rose-500 to-rose-400 text-white font-black py-4 rounded-2xl text-base btn-glow ripple-effect flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {/* لمعة على الزر */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <span>🛍️ اطلبي الآن – 360 ج.م</span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-stone-400 mt-3"
          >
            <span className="line-through">460 ج.م</span> · شحن مجاني لكل مصر 🚚
          </motion.p>
        </div>
      </div>
    </section>
  );
}
