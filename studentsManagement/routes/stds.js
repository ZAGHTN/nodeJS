'use strict';
// يحتوي هذا الملف كل المسارات الخاصة بالمشروع
// This file contains all paths for the project

// Middleware عبارة عن Express في الـ Router الـ
// يقوم بالتوجيه حسب نوع العملية
const router = require('express').Router();
const stdsController = require('../controllers/stds');

/*
router.all('/sdtudents', (req, res, next) => {
	console.log('Accessing the students section ...');
	next(); // pass control to the next handler
})
*/

// (localhost:3000/) المسار الإفتراضي.أي عند الذهاب بالعنوان
// Default path
router.get('/', stdsController.index);

// إضافة البيانات من الرابط إلى قاعدة البيانات
// Add the data from the link to the database
router.post("/create", stdsController.create);

// مسارات التعديل. الأول لعرض الصفحة
// الثاني لإدخال البيانات
// Edit routes
router.get("/update/:id", stdsController.edit);
router.put("/update/:id", stdsController.update);

// إنشاء مسار لحذف طالب
// Delete route
router.delete("/delete/:id", stdsController.delete);

// router تصدير الـ
module.exports = router;
