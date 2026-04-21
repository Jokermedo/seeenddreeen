'use client';

import Image from 'next/image';
import { Star, Shield } from 'lucide-react';

// صور واتساب الحقيقية فقط - مسارات صحيحة
const reviewImages = [
  '/reviews/real-review-1.jpg',
  '/reviews/real-review-2.jpg',
  '/reviews/real-review-3.jpg',
  '/reviews/review-4.jpg',
  '/reviews/review-5.jpg',
  '/reviews/review-6.jpg',
  '/reviews/review-7.jpg',
  '/reviews/review-8.jpg',
  '/reviews/review-9.jpg',
  '/reviews/review-10.jpg',
  '/reviews/review-11.jpg',
  '/reviews/review-12.jpg',
  '/reviews/review-13.jpg',
  '/reviews/review-14.jpg',
  '/reviews/review-15.jpg',
  '/reviews/review-16.jpg',
  '/reviews/review-17.jpg',
  '/reviews/review-18.jpg',
];

// تقسيم عشوائي على عمودين للـ masonry effect
const col1 = reviewImages.filter((_, i) => i % 2 === 0);
const col2 = reviewImages.filter((_, i) => i % 2 === 1);

export function TestimonialsSection() {
  return (
    <section className="py-8 bg-[#F2F2F7]" id="reviews">
      <div className="max-w-2xl mx-auto px-4">

        {/* عنوان مدمج */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-stone-900">آراء عميلاتنا</h2>
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[10px] text-stone-400 mr-1">+500 تقييم</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-xl px-3 py-1.5 shadow-sm">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-bold text-stone-600">موثق</span>
          </div>
        </div>

        {/* Masonry - عمودين */}
        <div className="flex gap-2">
          {/* العمود الأول */}
          <div className="flex-1 flex flex-col gap-2">
            {col1.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={src}
                  alt={`تقييم ${i * 2 + 1}`}
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(max-width: 640px) 48vw, 200px"
                  onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                />
              </div>
            ))}
          </div>

          {/* العمود الثاني - مزاح للأسفل للـ masonry effect */}
          <div className="flex-1 flex flex-col gap-2 mt-6">
            {col2.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={src}
                  alt={`تقييم ${i * 2 + 2}`}
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 48vw, 200px"
                  onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
                />
              </div>
            ))}
          </div>
        </div>

        {/* شريط الإحصاء */}
        <div className="mt-4 bg-white rounded-2xl shadow-sm flex divide-x divide-x-reverse divide-stone-100">
          {[
            { v: '+500', l: 'عميلة راضية' },
            { v: '4.9⭐', l: 'متوسط التقييم' },
            { v: '2 أسبوع', l: 'نتائج في' },
          ].map((s, i) => (
            <div key={i} className="flex-1 py-3 text-center">
              <p className="text-sm font-black text-rose-500">{s.v}</p>
              <p className="text-[9px] text-stone-400 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
