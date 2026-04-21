'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

const reviewImages = [
  '/reviews/real-review-1.jpg','/reviews/real-review-2.jpg','/reviews/real-review-3.jpg',
  '/reviews/review-4.jpg','/reviews/review-5.jpg','/reviews/review-6.jpg',
  '/reviews/review-7.jpg','/reviews/review-8.jpg','/reviews/review-9.jpg',
  '/reviews/review-10.jpg','/reviews/review-11.jpg','/reviews/review-12.jpg',
  '/reviews/review-13.jpg','/reviews/review-14.jpg','/reviews/review-15.jpg',
  '/reviews/review-16.jpg','/reviews/review-17.jpg','/reviews/review-18.jpg',
  '/reviews/review-19.jpg','/reviews/review-20.jpg','/reviews/review-21.jpg',
  '/reviews/review-22.jpg','/reviews/review-23.jpg','/reviews/review-24.jpg',
];

export function TestimonialsSection() {
  return (
    <section className="py-8 bg-white" id="reviews">
      <div className="max-w-2xl mx-auto px-4">

        {/* العنوان */}
        <div className="text-center mb-5">
          <div className="flex justify-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-xl font-black text-stone-900">شوفي نتايجهم بنفسك</h2>
          <p className="text-xs text-stone-400 mt-1">لقطات حقيقية من عميلاتنا على واتساب</p>
        </div>

        {/* شبكة الصور - 3 أعمدة */}
        <div className="columns-3 gap-2 space-y-2">
          {reviewImages.map((src, i) => (
            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={`تقييم ${i + 1}`}
                width={300}
                height={450}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 33vw, 25vw"
                onLoad={(e) => e.currentTarget.setAttribute('data-loaded', 'true')}
              />
            </div>
          ))}
        </div>

        {/* إحصائيات */}
        <div className="mt-6 bg-[#F2F2F7] rounded-2xl flex divide-x divide-x-reverse divide-stone-200">
          {[
            { value: '+500', label: 'عميلة' },
            { value: '4.9 ⭐', label: 'تقييم' },
            { value: '100%', label: 'حقيقي' },
          ].map((s, i) => (
            <div key={i} className="flex-1 py-3 text-center">
              <p className="text-base font-black text-rose-500">{s.value}</p>
              <p className="text-[10px] text-stone-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
