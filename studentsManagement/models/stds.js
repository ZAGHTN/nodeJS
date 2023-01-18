'use strict';
// mongoose إستدعاء الوحدة
// mongoose call module
const mongoose = require('mongoose');

// إنشاء النموذج الخاص بنا
// Create our shema
const studentsSchema = new mongoose.Schema({
  name: {
	type: String,
	required: true,
  },
  age: {
    type: Number,
    required: true,
  }
});

// collection مع الإعلام عن إسم الـ model إنشاء الـ
// Create our model and expot it
module.exports = mongoose.model("students", studentsSchema);