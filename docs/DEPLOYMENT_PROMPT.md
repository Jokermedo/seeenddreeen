# 🚀 برومبت نشر متجر سندرين بيوتي

## 📋 الوضع الحالي:
متجر إلكتروني كامل للدفع المسبق (Prepaid Store) باستخدام Next.js 16 + React 19 + TypeScript

### ✅ الميزات المنجزة:
- نموذج طلب 3 خطوات (الكمية → البيانات → الدفع)
- فودافون كاش + إنستا باي
- رفع إيصال على Cloudinary
- إرسال الطلب على واتساب
- أمان عالي (Validation + Rate Limiting)
- 26 اختبار ناجح
- Build جاهز للإنتاج

---

## 🎯 المطلوب منك:

### الخطوة 1: إنشاء GitHub Repository
```
1. سجل دخول على github.com
2. أنشئ Repository جديد (public أو private)
3. لا تضيف README أو .gitignore (سنرفع من الكود)
```

### الخطوة 2: رفع الكود
```bash
# افتح Terminal في مجلد المشروع
cd "D:\New folder (2)\sendreen-store"

# Initialize Git
git init
git add .
git commit -m "feat: Sendreen Store - prepaid beauty store with WhatsApp"

# غير USERNAME باسمك
git branch -M main
git remote add origin https://github.com/[USERNAME]/sendreen-store.git
git push -u origin main
```

### الخطوة 3: إعداد Cloudinary (مجاني)
```
1. سجل على https://cloudinary.com
2. Dashboard → Copy Cloud Name (dnfjt8o5e)
3. Settings → Upload → Upload Presets
4. Add Upload Preset:
   - Name: sendreen_store
   - Signing Mode: Unsigned
   - Save
5. انسخ اسم الـ Preset
```

### الخطوة 4: النشر على Vercel (مجاني)
```
1. سجل على https://vercel.com
2. اضغط "Add New Project"
3. Import من GitHub (اختر repository سندرين)
4. Framework: Next.js (يتعرف تلقائياً)
5. Environment Variables (اضغط Edit):
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dnfjt8o5e
   - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = sendreen_store (اللي أنشأته)
   - NEXT_PUBLIC_ADMIN_WHATSAPP = 201158897041
6. Deploy!
```

### الخطوة 5: اختبار الشراء
```
1. افتح الموقع المنشور
2. جرب طلب كامل
3. تأكد إن رسالة واتساب وصلت
4. تأكد إن الإيصال اترفع
```

---

## 🔧 لو عندك أي مشكلة:

### مشكلة: "Next_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined"
```
- تأكد إنك أضفت Environment Variables في Vercel
- تأكد إن الاسم مطابق 100%
- Redeploy بعد الإضافة
```

### مشكلة: رفع الصورة لا يعمل
```
- تأكد إن Upload Preset في Cloudinary هو Unsigned
- تأكد من CORS settings في Cloudinary
```

### مشكلة: رسالة واتساب لا تفتح
```
- تأكد من رقم الواتساب صحيح: 201158897041
- جرّب من موبايل (WhatsApp Web قد لا يفتح تلقائياً)
```

---

## 💰 التكلفة:
- Cloudinary: مجاني (25 Credits/شهر)
- Vercel: مجاني (100GB Bandwidth)
- GitHub: مجاني
- **الإجمالي: 0 جنية** 🆓

---

## 📞 الدعم:
لو محتاج مساعدة في أي خطوة، أرسل لي:
1. أي أخطاء تظهر
2. سكرين شوت للمشكلة
3. هل تستخدم موبايل ولا كمبيوتر؟

---

**تم إعداد هذا البرومبت - 2026-04-12**
