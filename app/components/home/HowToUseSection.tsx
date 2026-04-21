'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: '١', emoji: '🧼', title: 'نظفي وجهك', description: 'اغسلي وجهك وجففيه بلطف', color: 'bg-blue-50', border: 'border-blue-100', num_bg: 'bg-blue-400' },
  { num: '٢', emoji: '💆', title: 'ضعي السيروم', description: '2-3 نقاط على الوجه والرقبة', color: 'bg-rose-50', border: 'border-rose-100', num_bg: 'bg-rose-400' },
  { num: '٣', emoji: '🌟', title: 'استمتعي', description: 'دلكي بلطف حتى الامتصاص الكامل', color: 'bg-amber-50', border: 'border-amber-100', num_bg: 'bg-amber-400' },
];

export function HowToUseSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <p className="text-xs font-black text-rose-400 tracking-widest uppercase mb-1">طريقة الاستخدام</p>
          <h2 className="text-xl font-black text-stone-900">3 خطوات بسيطة 🌸</h2>
        </motion.div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.97 }}
              className={`${step.color} border ${step.border} rounded-2xl flex items-center gap-4 px-4 py-4 cursor-pointer`}
            >
              <div className={`w-10 h-10 ${step.num_bg} text-white rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-md`}>
                {step.num}
              </div>
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {step.emoji}
              </motion.span>
              <div>
                <p className="font-black text-stone-900 text-sm">{step.title}</p>
                <p className="text-stone-400 text-xs mt-0.5">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
