'use client';

const steps = [
  { num: '١', emoji: '🧼', title: 'نظفي وجهك', description: 'اغسلي وجهك وجففيه بلطف' },
  { num: '٢', emoji: '💆', title: 'ضعي السيروم', description: '2-3 نقاط على الوجه والرقبة' },
  { num: '٣', emoji: '🌟', title: 'استمتعي', description: 'دلكي بلطف حتى الامتصاص الكامل' },
];

export function HowToUseSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-center text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">طريقة الاستخدام</p>
        <h2 className="text-center text-xl font-black text-stone-900 mb-5">3 خطوات بسيطة</h2>

        <div className="relative">
          {/* خط الربط */}
          <div className="absolute right-[42px] top-10 bottom-10 w-0.5 bg-rose-100 hidden sm:block" />

          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="bg-[#F2F2F7] rounded-2xl flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 bg-rose-500 text-white rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-md shadow-rose-200">
                  {step.num}
                </div>
                <span className="text-3xl">{step.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 text-sm">{step.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
