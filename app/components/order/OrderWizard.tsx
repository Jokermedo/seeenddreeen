"use client";

import { useState, useRef } from "react";
import { Check, Upload, FileCheck, AlertCircle, ShoppingCart, MapPin, CreditCard, Package } from "lucide-react";
import { QuantitySelector } from "../QuantitySelector";
import { Spinner } from "../Spinner";
import { submitOrder } from "@/lib/actions";
import { calculateTotalPrice, validateFormData, uploadImageToCloudinary } from "@/lib/utils";
import { PRODUCT_PRICE, ADMIN_WHATSAPP_DISPLAY, PRODUCT_ADVANCE_PAYMENT, PRODUCT_CASH_ON_DELIVERY, VODAFONE_CASH_NUMBER, INSTAPAY_NUMBER } from "@/lib/constants";
import { FormData } from "@/lib/types";
import { egyptLocations, governorates } from "@/lib/egypt-locations";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 shrink-0" />{msg}
    </p>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
      {children}{required && <span className="text-rose-500 mr-1">*</span>}
    </label>
  );
}

function Input({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-white
        ${error ? "border-red-300 bg-red-50 focus:border-red-400" : "border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"}`}
    />
  );
}

function Select({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all bg-white
        ${error ? "border-red-300 bg-red-50" : "border-stone-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"}
        disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed`}
    >
      {children}
    </select>
  );
}

function StepHeader({ num, icon: Icon, title }: { num: number; icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-rose-200 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">الخطوة {num}</p>
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
      </div>
    </div>
  );
}

export function OrderWizard() {
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", governorate: "", city: "",
    area: "", street: "", building: "", landmark: "",
    paymentMethod: "", paymentProof: null,
    transferNumber: "", transferName: "",
    quantity: 1, totalPrice: PRODUCT_PRICE, orderNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === "governorate") next.city = "";
      return next;
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleQty = (quantity: number) =>
    setFormData(prev => ({ ...prev, quantity, totalPrice: calculateTotalPrice(quantity) }));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErrors(prev => ({ ...prev, paymentProof: "" }));
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData(prev => ({ ...prev, paymentProof: url }));
    } catch {
      setFormData(prev => ({ ...prev, paymentProof: null }));
      setErrors(prev => ({ ...prev, paymentProof: "✅ يمكنك المتابعة وإرسال صورة الإيصال مباشرة على الواتساب" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const { isValid, errors: errs } = validateFormData(formData);
    if (!isValid) {
      setErrors(errs);
      const el = document.getElementsByName(Object.keys(errs)[0])[0];
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const result = await submitOrder(formData);
      if (result.success && result.whatsappUrl) {
        setOrderSuccess(true);
        setWhatsappUrl(result.whatsappUrl);
        window.open(result.whatsappUrl, "_blank");
      } else {
        setErrors(result.errors || { submit: "حدث خطأ في معالجة طلبك" });
      }
    } catch {
      setErrors({ submit: "عذراً، حدث خطأ غير متوقع" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white" id="order">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-rose-100">
            <ShoppingCart className="w-4 h-4" />
            اطلبي الآن بشكل آمن عبر واتساب
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-stone-900 mb-3 tracking-tight">
            ابدئي رحلة الجمال الآن
          </h2>
          <p className="text-stone-400 text-base max-w-md mx-auto">
            أكملي بياناتك وسيتم تحويلك فوراً لواتساب لتأكيد الطلب
          </p>

          {/* Payment Banner */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-0 rounded-2xl overflow-hidden border border-stone-200 shadow-sm text-sm font-bold">
            <div className="bg-rose-500 text-white px-6 py-3 flex items-center gap-2">
              <span>💳</span>
              <span>{PRODUCT_ADVANCE_PAYMENT} ج.م مقدم</span>
              <span className="opacity-60 text-xs font-normal">تحويل الآن</span>
            </div>
            <div className="bg-stone-800 text-white px-4 py-3 flex items-center gap-1 text-stone-400 text-xs">
              <span>+</span>
            </div>
            <div className="bg-emerald-600 text-white px-6 py-3 flex items-center gap-2">
              <span>🚪</span>
              <span>{PRODUCT_CASH_ON_DELIVERY} ج.م عند الاستلام</span>
              <span className="opacity-60 text-xs font-normal">كاش</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Quantity */}
            <div className="bg-[#faf9f8] rounded-3xl p-6 md:p-8 border border-stone-100">
              <StepHeader num={1} icon={Package} title="اختاري الكمية" />
              <QuantitySelector onQuantityChange={handleQty} />
            </div>

            {/* Step 2: Delivery Info */}
            <div className="bg-[#faf9f8] rounded-3xl p-6 md:p-8 border border-stone-100 space-y-5">
              <StepHeader num={2} icon={MapPin} title="بيانات التوصيل" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>الاسم بالكامل</Label>
                  <Input name="name" value={formData.name} onChange={e => set("name", e.target.value)}
                    placeholder="الاسم الثلاثي لضمان وصول الطلب" error={errors.name} />
                  <FieldError msg={errors.name} />
                </div>
                <div>
                  <Label required>رقم الموبايل</Label>
                  <Input name="phone" type="tel" dir="ltr" value={formData.phone}
                    onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                    placeholder="010xxxxxxxxx" error={errors.phone} />
                  <FieldError msg={errors.phone} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>المحافظة</Label>
                  <Select name="governorate" value={formData.governorate}
                    onChange={e => set("governorate", e.target.value)} error={errors.governorate}>
                    <option value="">اختر المحافظة...</option>
                    {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                  </Select>
                  <FieldError msg={errors.governorate} />
                </div>
                <div>
                  <Label required>المدينة / المركز</Label>
                  <Select name="city" value={formData.city}
                    onChange={e => set("city", e.target.value)}
                    disabled={!formData.governorate} error={errors.city}>
                    <option value="">اختر المدينة...</option>
                    {formData.governorate && egyptLocations[formData.governorate]?.map(c => <option key={c} value={c}>{c}</option>)}
                  </Select>
                  <FieldError msg={errors.city} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>اسم المنطقة / الحي</Label>
                  <Input name="area" value={formData.area} onChange={e => set("area", e.target.value)}
                    placeholder="مثال: الحي السابع" error={errors.area} />
                  <FieldError msg={errors.area} />
                </div>
                <div>
                  <Label required>اسم الشارع</Label>
                  <Input name="street" value={formData.street} onChange={e => set("street", e.target.value)}
                    placeholder="اسم الشارع بالتفصيل" error={errors.street} />
                  <FieldError msg={errors.street} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label required>رقم العمارة / المبنى</Label>
                  <Input name="building" value={formData.building} onChange={e => set("building", e.target.value)}
                    placeholder="مثال: عمارة رقم 45" error={errors.building} />
                  <FieldError msg={errors.building} />
                </div>
                <div>
                  <Label>علامة مميزة (اختياري)</Label>
                  <Input name="landmark" value={formData.landmark}
                    onChange={e => set("landmark", e.target.value)}
                    placeholder="بجوار سوبر ماركت..." />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-[#faf9f8] rounded-3xl p-6 md:p-8 border border-stone-100 space-y-6">
              <StepHeader num={3} icon={CreditCard} title="طريقة الدفع وتأكيد الحجز" />

              {/* Payment Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "vodafone", label: "فودافون كاش", emoji: "📱", color: "rose" },
                  { id: "instapay", label: "إنستا باي", emoji: "💳", color: "rose" },
                ].map(m => (
                  <button key={m.id} onClick={() => set("paymentMethod", m.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-right ${
                      formData.paymentMethod === m.id
                        ? "border-rose-500 bg-rose-50 shadow-md shadow-rose-100"
                        : "border-stone-200 bg-white hover:border-rose-200 hover:bg-rose-50/30"
                    }`}>
                    <span className="text-3xl">{m.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-stone-800 text-sm">{m.label}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">حوّلي {PRODUCT_ADVANCE_PAYMENT} ج.م</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      formData.paymentMethod === m.id ? "border-rose-500 bg-rose-500" : "border-stone-300"
                    }`}>
                      {formData.paymentMethod === m.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
              <FieldError msg={errors.paymentMethod} />

              {formData.paymentMethod && (
                <div className="space-y-5 pt-2 animate-in fade-in duration-300">

                  {/* Transfer number box */}
                  <div className="bg-stone-900 rounded-2xl p-5 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent" />
                    <p className="text-stone-400 text-xs font-semibold mb-1 relative">
                      {formData.paymentMethod === "vodafone" ? "رقم فودافون كاش" : "رقم إنستا باي"}
                    </p>
                    <p className="text-3xl font-black text-white font-mono tracking-widest relative">
                      {formData.paymentMethod === "vodafone" ? VODAFONE_CASH_NUMBER : INSTAPAY_NUMBER}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 relative">
                      <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-full">
                        💰 حوّلي {PRODUCT_ADVANCE_PAYMENT} ج.م مقدم فقط
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label required>رقم الموبايل المحول منه</Label>
                      <Input name="transferNumber" type="tel" dir="ltr" value={formData.transferNumber}
                        onChange={e => set("transferNumber", e.target.value.replace(/\D/g, "").slice(0, 11))}
                        placeholder="010xxxxxxxxx" error={errors.transferNumber} />
                      <FieldError msg={errors.transferNumber} />
                    </div>
                    <div>
                      <Label required>الاسم المسجل في المحفظة</Label>
                      <Input name="transferName" value={formData.transferName}
                        onChange={e => set("transferName", e.target.value)}
                        placeholder="الاسم الثلاثي للمحول" error={errors.transferName} />
                      <FieldError msg={errors.transferName} />
                    </div>
                  </div>

                  {/* Upload Receipt */}
                  <div>
                    <Label>صورة إيصال التحويل <span className="text-stone-400 font-normal text-xs">(اختياري)</span></Label>
                    <input type="file" ref={fileInputRef} onChange={handleUpload} accept="image/*" className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                      className={`w-full py-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all ${
                        formData.paymentProof
                          ? "border-emerald-400 bg-emerald-50/40"
                          : "border-stone-200 bg-white hover:border-rose-300 hover:bg-rose-50/30"
                      }`}>
                      {uploading ? <Spinner /> : formData.paymentProof ? (
                        <>
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                            <FileCheck className="w-6 h-6" />
                          </div>
                          <p className="font-bold text-emerald-700">تم رفع الإيصال ✓</p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-stone-700">اضغطي لرفع صورة الإيصال</p>
                            <p className="text-xs text-stone-400 mt-1">أو أرسليها مباشرة على الواتساب</p>
                          </div>
                        </>
                      )}
                    </button>
                    <FieldError msg={errors.paymentProof} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

            {/* Summary Card */}
            <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-40 h-40 bg-rose-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />

              <h3 className="text-lg font-bold mb-5 flex items-center gap-2 relative">
                <ShoppingCart className="w-5 h-5 text-rose-400" />
                ملخص الطلب
              </h3>

              <div className="space-y-3 mb-6 relative">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">سيروم الجمال × {formData.quantity}</span>
                  <span className="font-bold">{calculateTotalPrice(formData.quantity)} ج.م</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">الشحن والمصاريف</span>
                  <span className="text-emerald-400 font-bold">مجاناً 🎁</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                  <span className="text-sm font-medium">الإجمالي</span>
                  <span className="text-3xl font-black text-rose-400">{formData.totalPrice} ج.م</span>
                </div>
              </div>

              {/* Payment Split */}
              <div className="rounded-2xl overflow-hidden mb-6 relative">
                <div className="bg-rose-500/20 border border-rose-500/30 p-4">
                  <p className="text-[11px] text-rose-300 font-semibold mb-3 text-center">طريقة السداد</p>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-rose-500 rounded-xl p-3 text-center">
                      <p className="text-white font-black text-xl">{PRODUCT_ADVANCE_PAYMENT}</p>
                      <p className="text-rose-200 text-[10px] font-semibold">ج.م مقدم</p>
                      <p className="text-rose-200/70 text-[9px] mt-0.5">تحويل الآن</p>
                    </div>
                    <div className="flex items-center text-stone-400 font-bold text-lg">+</div>
                    <div className="flex-1 bg-emerald-600/80 rounded-xl p-3 text-center">
                      <p className="text-white font-black text-xl">{PRODUCT_CASH_ON_DELIVERY}</p>
                      <p className="text-emerald-200 text-[10px] font-semibold">ج.م باقي</p>
                      <p className="text-emerald-200/70 text-[9px] mt-0.5">عند الاستلام</p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-500/15 border border-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-xs font-semibold relative">
                  {errors.submit}
                </div>
              )}

              {orderSuccess ? (
                <a href={whatsappUrl || ""} target="_blank" rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-base shadow-lg shadow-emerald-900/30 relative">
                  <span>أرسلي الطلب على واتساب</span>
                  <ShoppingCart className="w-5 h-5" />
                </a>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all text-base shadow-lg shadow-rose-900/30 active:scale-[0.98] disabled:opacity-50 relative"
                  aria-label="تأكيد الطلب وأرسل واتساب">
                  {loading ? <Spinner /> : (
                    <>
                      <span>تأكيد الطلب عبر واتساب</span>
                      <ShoppingCart className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}

              <p className="text-center text-[10px] text-stone-600 mt-3 leading-relaxed relative">
                بالضغط على الزر سيتم فتح واتساب تلقائياً لتأكيد الحجز
              </p>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-xs font-bold text-stone-800">طلب آمن ومضمون</p>
                <p className="text-[11px] text-stone-400 mt-0.5">ضمان استرداد كامل خلال 14 يوم</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-xs font-bold text-stone-800">شحن مجاني لكل مصر</p>
                <p className="text-[11px] text-stone-400 mt-0.5">التوصيل خلال 2-4 أيام عمل</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
