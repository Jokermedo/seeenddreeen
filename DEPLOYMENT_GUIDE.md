# دليل رفع ونشر المشروع Sendreen Store

## ✅ حالة المشروع
المشروع جاهز تماماً للرفع والتركيب على أي خادم يدعم Node.js 18+

## 🤔 مقارنة خيارات الاستضافة

| الميزة | Hostinger مشترك | Vercel |
|-------|----------------|--------|
| **السهولة** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **السرعة** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **التكلفة** | 25-40 جنيه/شهر | **مجاني** لحد 100 الف زيارة |
| **النشر التلقائي** | يدوي | تلقائي مع كل تعديل |
| **SSL مجاني** | ✅ | ✅ |
| **دعم Next.js 16** | ⚠️ يعمل بحاجة لإعدادات | ✅ دعم كامل ومحسن |
| **وقت التحميل** | 2-4 ثانية | 300-500 مللي ثانية |

### 🎯 التوصية النهائية:
✅ **Vercel أفضل بكثير لهذا المشروع** تماماً ومجاني ويعمل بدون اي مشاكل
✅ Hostinger يعمل لكن تحتاج إلى خادم VPS وليس المشترك لـ Next.js 16

---

## 🚀 الخطوات لرفع المشروع على Vercel (الأسهل والأسرع)

### الخطوة 1: رفع المشروع على GitHub
1. أنشئ مستودع جديد على GitHub
2. ارفع كل ملفات المشروع عليه باستخدام هذه الأوامر:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[اسمك]/sendreen-store.git
git push -u origin main
```

### الخطوة 2: النشر على Vercel
1. افتح https://vercel.com وسجل دخول بحساب GitHub
2. اضغط على `Add New...` ثم `Project`
3. اختر المستودع الذي أنشأته للتو
4. اضغط على `Deploy` ✅

**سيتم نشر المشروع تلقائياً في أقل من دقيقة**

---

## 📦 الخطوات لرفع المشروع على Hostinger

### ✅ إذا كان لديك VPS Hostinger:
```bash
# 1. اتصال بالخادم
ssh root@[اي بي الخادم]

# 2. تثبيت Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. رفع الملفات وتثبيت التبعيات
git clone https://github.com/[اسمك]/sendreen-store.git
cd sendreen-store
npm install
npm run build

# 4. تشغيل المشروع في الخلفية
npm install -g pm2
pm2 start npm --name "sendreen" -- start
pm2 startup
pm2 save
```

### ⚠️ ملاحظة حول Hostinger المشترك:
Next.js 16 لا يعمل بشكل جيد على الاستضافة المشتركة العادية، تحتاج على الأقل إلى خادم Cloud VPS من Hostinger.

---

## 🔑 المتغيرات البيئية المطلوبة
أضف هذه المتغيرات في لوحة التحكم الخاصة بالاستضافة:

| المتغير | القيمة |
|--------|-------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dnfjt8o5e` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `sendreen_preset` |
| `NEXT_PUBLIC_ADMIN_WHATSAPP` | `201035253389` |

---

## ✅ فحوصات قبل الرفع النهائي
```bash
# فحص الأخطاء
npm run lint

# فحص الاختبارات
npm run test

# بناء المشروع للتأكد من عدم وجود اخطاء
npm run build
```

---

## 📊 بعد الرفع
المشروع يتضمن كل الميزات التالية جاهزة للعمل:
✅ نظام الطلبات كامل
✅ التكامل مع الواتساب تلقائي
✅ رفع الصور على Cloudinary
✅ التحقق من البيانات
✅ تصميم متجاوب لجميع الأجهزة
✅ سرعة تحميل عالية جداً