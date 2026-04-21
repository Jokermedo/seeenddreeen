"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { ShoppingBag, MessageCircle, Home as HomeIcon, Grid, ChevronUp } from "lucide-react";
import { PRODUCT_PRICE } from "@/lib/constants";
import { HeroSection } from "./components/home/HeroSection";
import { BenefitsSection } from "./components/home/BenefitsSection";
import { HowToUseSection } from "./components/home/HowToUseSection";
import { SocialMediaSection } from "./components/home/SocialMediaSection";

const TestimonialsSection = dynamic(
  () => import("./components/home/TestimonialsSection").then(m => m.TestimonialsSection),
  { loading: () => <div className="h-64 bg-white" />, ssr: false }
);

const OrderWizard = dynamic(
  () => import("./components/order/OrderWizard").then(m => m.OrderWizard),
  { loading: () => <div className="h-96 bg-[#F2F2F7]" />, ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const orderSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToOrder = () => {
    orderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab('order');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('home');
  };

  const scrollToSection = (id: string, tab: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-24">

      {/* HEADER - iOS sticky */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/60">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center justify-between">
          <button onClick={scrollToTop} className="flex items-center gap-2 active:opacity-70">
            <div className="w-7 h-7 bg-rose-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-black">س</span>
            </div>
            <div>
              <p className="text-sm font-black text-stone-900 leading-none">سندرين</p>
              <p className="text-[8px] text-stone-400 tracking-widest leading-none mt-0.5">BEAUTY</p>
            </div>
          </button>

          <button
            onClick={scrollToOrder}
            className="bg-rose-500 active:bg-rose-600 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-sm shadow-rose-200 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>اطلبي الآن</span>
          </button>
        </div>
      </header>

      {/* SECTIONS */}
      <main className="max-w-2xl mx-auto">
        <div className="bg-white">
          <HeroSection onScrollToOrder={scrollToOrder} />
        </div>

        <BenefitsSection />

        <div className="bg-white">
          <HowToUseSection />
        </div>

        <div id="reviews">
          <TestimonialsSection />
        </div>

        <SocialMediaSection />

        <div ref={orderSectionRef} id="order">
          <OrderWizard />
        </div>

        {/* FOOTER */}
        <footer className="bg-stone-900 text-stone-400 py-8 px-4">
          <div className="text-center mb-5">
            <button onClick={scrollToTop} className="flex items-center justify-center gap-2 mx-auto mb-3 active:opacity-70">
              <div className="w-7 h-7 bg-rose-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xs font-black">س</span>
              </div>
              <span className="font-black text-white text-base">سندرين بيوتي</span>
            </button>
            <p className="text-xs text-stone-500">متجر متخصص في منتجات العناية بالبشرة الطبيعية</p>
          </div>

          <div className="flex justify-center gap-5 mb-5 text-xs">
            <button onClick={() => scrollToSection('benefits', 'home')} className="text-stone-500 hover:text-rose-400 active:text-rose-400">المميزات</button>
            <button onClick={() => scrollToSection('reviews', 'reviews')} className="text-stone-500 hover:text-rose-400 active:text-rose-400">التقييمات</button>
            <button onClick={scrollToOrder} className="text-rose-400 font-bold">اطلبي الآن</button>
          </div>

          <div className="flex justify-center mb-5">
            <a href="https://wa.me/201035253389" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>واتساب: 01035253389</span>
            </a>
          </div>

          {/* زر الرجوع للأعلى */}
          <div className="flex justify-center mb-4">
            <button onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-800 px-4 py-2 rounded-xl active:bg-stone-700">
              <ChevronUp className="w-3.5 h-3.5" />
              <span>العودة للأعلى</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-stone-600">© 2026 سندرين بيوتي · جميع الحقوق محفوظة</p>
        </footer>
      </main>

      {/* ───── BOTTOM NAV - دائم ثابت ───── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-stone-200/60 md:hidden">
        <div className="max-w-2xl mx-auto">

          {/* زر الطلب الرئيسي - دائم وبارز */}
          <div className="px-3 pt-2">
            <button
              onClick={scrollToOrder}
              className="w-full bg-rose-500 active:bg-rose-600 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-200/60 active:scale-[0.98] transition-transform"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>اطلبي الآن · {PRODUCT_PRICE} ج.م</span>
            </button>
          </div>

          {/* شريط التنقل */}
          <div className="flex items-center justify-around px-4 py-1.5 pb-2">
            <button
              onClick={scrollToTop}
              className={`flex flex-col items-center gap-0.5 py-1 px-4 transition-colors ${activeTab === 'home' ? 'text-rose-500' : 'text-stone-400'}`}
            >
              <HomeIcon className="w-4.5 h-4.5" />
              <span className="text-[9px] font-semibold">الرئيسية</span>
            </button>

            <button
              onClick={() => scrollToSection('reviews', 'reviews')}
              className={`flex flex-col items-center gap-0.5 py-1 px-4 transition-colors ${activeTab === 'reviews' ? 'text-rose-500' : 'text-stone-400'}`}
            >
              <Grid className="w-4.5 h-4.5" />
              <span className="text-[9px] font-semibold">التقييمات</span>
            </button>

            <a
              href="https://wa.me/201035253389"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 py-1 px-4 text-stone-400"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              <span className="text-[9px] font-semibold">واتساب</span>
            </a>
          </div>
        </div>
      </nav>

      {/* زر العودة للأعلى عند التمرير - للديسكتوب */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 left-6 z-40 w-10 h-10 bg-rose-500 text-white rounded-full shadow-lg items-center justify-center hover:bg-rose-600 transition-all animate-fade-in"
          aria-label="العودة للأعلى"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
