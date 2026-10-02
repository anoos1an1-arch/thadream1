# ذادريم — GitHub فقط

هذه النسخة تعمل بدون Supabase أو قاعدة بيانات خارجية.

## إضافة / تعديل / حذف الروابط

كل الروابط موجودة في `links.json`.

مثال:

```json
[
  {
    "id": "1",
    "title": "اسم الرابط",
    "description": "وصف قصير",
    "url": "https://example.com",
    "icon": "globe"
  }
]
```

### أيقونات مقترحة
`globe`, `youtube`, `instagram`, `send`, `file`, `file-text`, `shopping-bag`, `link`, `book-open`, `video`, `music`, `github`, `download`, `external-link`

## النشر على GitHub Pages
1. أنشئ مستودع GitHub.
2. ارفع محتويات هذا المجلد.
3. من Settings > Pages اختر النشر من فرع `main` ومجلد `/root`.
4. افتح رابط GitHub Pages الذي سيظهر لك.

## الصلاحيات
لا توجد صلاحية تحرير للزوار داخل الموقع. من يملك صلاحية الكتابة على مستودع GitHub هو من يستطيع تغيير `links.json`.

ملاحظة: GitHub Pages موقع ثابت، لذلك لا توجد لوحة إدارة سرية حقيقية داخل الموقع نفسه. هذا التصميم يتجنب وضع كلمة مرور أو سر داخل JavaScript.
