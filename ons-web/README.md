# أُنس (Ons) — Web (Next.js) نسخة رابط + حفظ محلي بدون تسجيل

## لماذا هذه النسخة؟
- نشر كرابط (Vercel/Netlify) بدون Terminal محلي
- حفظ الاسم والبروقرس محليًا (localStorage) بدون تسجيل
- RTL عربي + English + Light/Dark
- بطاقة عيد قابلة للتحميل كصورة

## تشغيل محلي (اختياري – يحتاج Terminal)
```bash
npm install
npm run dev
```

## نشر بدون Terminal (الموصى به): GitHub → Vercel
1) ارفع المشروع إلى GitHub
2) ادخل Vercel → New Project → Import Repo
3) Build Command: `next build` (تلقائي)
4) Output: تلقائي (Next.js)
5) Deploy

## أين صفحة الاسم؟
- أول ما يفتح المستخدم الرابط: `/onboarding`
- بعد حفظ الاسم يتحول للرئيسية
