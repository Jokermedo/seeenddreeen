'use client';

const benefits = [
  { emoji: '✨', title: 'نضارة طبيعية', description: 'إشراق فوري ونعومة فائقة من أول استخدام.' },
  { emoji: '🌿', title: 'مكونات نقية', description: 'طبيعي 100%، بدون كيماويات أو بارابين.' },
  { emoji: '⭐', title: 'نتائج مضمونة', description: '93% من العميلات لاحظن فرقاً خلال أسبوعين.' },
];

const trust = [
  { icon: '🚚', label: 'شحن مجاني لكل مصر' },
  { icon: '🤝', label: 'دفع عند الاستلام' },
  { icon: '✅', label: 'ضمان 14 يوم' },
];

export function BenefitsSection() {
  return (
    <section className="py-8 bg-[#F2F2F7]" id="benefits">
      <div className="max-w-2xl mx-auto px-4">

        <p className="text-center text-xs font-bold text-rose-500 uppercase tracking-widest mb-5">المميزات</p>

        {/* بطاقات المميزات - iOS grouped style */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm divide-y divide-stone-100">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-11 h-11 bg-rose-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                {b.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900 text-sm">{b.title}</p>
                <p className="text-stone-400 text-xs leading-relaxed mt-0.5">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* شريط الثقة */}
        <div className="mt-4 bg-white rounded-2xl px-5 py-3 shadow-sm flex items-center justify-around">
          {trust.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] text-stone-400 font-medium leading-tight max-w-[60px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
