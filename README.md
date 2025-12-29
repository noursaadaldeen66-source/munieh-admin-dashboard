
## 📖 التحليل الحقيقي للمشروع | Real Project Analysis

تطبيق **Munieh** ليس مجرد متجر إلكتروني، بل هو منصة اجتماعية اقتصادية تهدف لتمكين **المرأة الريفية** المستفيدة من برامج **مؤسسة الآغا خان**. يجمع النظام بين القوة التقنية والتأثير الاجتماعي من خلال ربط المنتجات بقصص النجاح الحقيقية.

**Munieh App** is a socio-economic platform designed to empower **rural women** supported by **Aga Khan Foundation** programs. It bridges the gap between traditional rural production and modern markets through a high-tech ecosystem.

---

## 📂 تحليل بنية المجلدات | Folder Technical Analysis

| المجلد | الوصف التقني والوظيفي |
| :--- | :--- |
| **`backend/`** | خادم Node.js/Express مبني بـ TypeScript. يدير العمليات عبر **MongoDB** باستخدام Mongoose. يحتوي على نماذج البيانات (Models) والمسارات (Routes) ونظام المصادقة. |
| **`mobile/`** | تطبيق الموبايل الأساسي (React Native CLI). يخدم المشتري والمنتجة (المرأة الريفية) مع واجهات مخصصة لكل فئة، ونظام تنقل متطور. |
| **`components/`** | مكتبة مكونات React للوحة تحكم الويب. تشمل جداول الإدارة، الخرائط الحية (Live Map)، ونماذج إدخال البيانات المعقدة. |
| **`services/`** | الطبقة المنطقية المشتركة؛ تحتوي على خدمات الاتصال بـ API، سياق المصادقة (AuthContext)، والبيانات التجريبية (Mock Data). |
| **`root/`** | لوحة تحكم الإدارة (Admin Dashboard) المبنية بـ **Vite + React 19**، والتي توفر واجهة Bento Grid عصرية للمشرفين. |

---

## ✨ الأقسام الوظيفية | Functional Sections

- **🛍️ إدارة المنتجات:** (عسل طبيعي، مربيات، بهارات، زيت زيتون، فواكه مجففة).
- **🎨 الحرف اليدوية:** (سجاد يدوي، فخار، مجوهرات تقليدية، تطريز).
- **🌱 الخدمات الزراعية:** (استشارات زراعية، تدريب عن بعد، تصميم حدائق).
- **📝 قصص النجاح:** قسم مخصص لعرض كفاح وقصص نجاح النساء (مثل "أم محمد" و "فاطمة").
- **🗺️ خريطة المنتجات:** تتبع موقع الإنتاج والربط المجتمعي.

---

## �️ تفاصيل التقنيات | Tech Stack Deep-Dive

- **الواجهة (Dashboard):** React 19, Recharts (للإحصائيات), Glassmorphism UI.
- **تطبيق الموبايل:** React Native 0.74, React Navigation.
- **البحث والبيانات:** Mongoose Models لوصف علاقات المنتجات والمستخدمين.
- **التصميم:** هوية **Bloom PlantCare 2025** (ألوان مستوحاة من الطبيعة #2D6A4F).

---

## ⚙️ البدء والتشغيل | Quick Start

### 1. تشغيل الباك آند (Backend)
```bash
cd backend
npm install
npm run dev
```

### 2. تشغيل لوحة التحكم (Web Dashboard)
```bash
npm install
npm run dev
```

### 3. تشغيل الموبايل (Mobile)
```bash
cd mobile
npm install
npm start
```

---

<p align="center">المشروع يهدف لخلق تأثير حقيقي ودعم تعليم الأطفال من خلال تمكين أسرهم 🌿</p>

---

## 🤝 المساهمة | Contributing

نرحب بمساهماتكم! إذا كان لديك اقتراحات لتحسين التصميم أو الكود:
1. قم بعمل Fork للمشروع.
2. أنشئ Branch جديد (`git checkout -b feature/NewFeature`).
3. قم بعمل Commit لتغييراتك (`git commit -m 'Add some NewFeature'`).
4. ارفع الـ Branch الخاص بك (`git push origin feature/NewFeature`).
5. افتح Pull Request.

---

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة **MIT**. راجع ملف `LICENSE` لمزيد من التفاصيل.

---
