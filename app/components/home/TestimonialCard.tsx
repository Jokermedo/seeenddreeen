'use client';

import Image from 'next/image';
import { Star, BadgeCheck } from 'lucide-react';
import { Testimonial } from '@/lib/content/testimonials';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function TestimonialCard({ name, city, text, stars, date, verified, beforeAfterImage }: Testimonial) {
  return (
    <article className="bg-[#fdfcfb] rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 w-[290px] md:w-[320px] overflow-hidden flex flex-col group">
      {/* صورة الإثبات */}
      {beforeAfterImage && (
        <div className="relative w-full h-56 bg-stone-200 overflow-hidden">
          <Image
            src={beforeAfterImage}
            alt={`إثبات نتيجة ${name}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm shadow-sm text-rose-500 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <BadgeCheck className="w-3 h-3 text-emerald-500" />
            نتيجة حقيقية
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* تصميم فقاعة الدردشة */}
        <div className="relative bg-white border border-rose-50 p-4 rounded-2xl rounded-tr-none shadow-sm shadow-rose-100/50">
          {/* سهم الفقاعة */}
          <div className="absolute -top-[1px] -right-2 w-4 h-4 bg-white border-t border-r border-rose-50 rotate-45 rounded-sm" />
          
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-stone-100 fill-stone-100'}`}
              />
            ))}
          </div>
          
          <p className="text-stone-700 text-[13px] leading-relaxed font-medium">
            {text}
          </p>
        </div>

        {/* معلومات العميلة */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-xs text-stone-800 flex items-center gap-1">
                {name}
                {verified && <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md font-medium">موثق</span>}
              </p>
              <p className="text-[10px] text-stone-400">{city}</p>
            </div>
          </div>
          <time dateTime={date} className="text-[10px] text-stone-300 font-medium">
            {formatDate(date)}
          </time>
        </div>
      </div>
    </article>
  );
}

