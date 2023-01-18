'use strict';
// إستدعاء كل الوحدات الازمة
// Call all necessary units
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const override = require('method-override');
// الخاص بالمشروع router إستدعاء الـ
// Import Project Router
const router = require('./routes/stds');


/**
 * كي نتجاهل أي رسالة خطأ مُحتملة true وضعنا هذا الخيار على
   إفتراضيا في المُستقبل false لأن هذا الخيار سيتم إعتماده
 * true إذا إردنا الإستعداد لهذا التغيير، نضعه على
 *
 * To prepare for future syntax and modification
 */
mongoose.set('strictQuery', true);


// ejs ضبط محرك العرض على
// (.ejs) مما يعني أن إمتداد صفحات العرض،سيكون
// Declare our display engine
app.set('view engine', 'ejs');


/* Express Middleware */

// "public" الإعلام بأننا سنستعمل مجلد الـ
// Notification that we will use the public folder
app.use(express.static(__dirname + '/public')); // (css,js,image... مُجلدات الـ)

// غير مُصرح بها على المُتصفح method تٌستخدم هذه الوحدة،عند إستعمال طريقة
app.use(override('_method', { methods: ['POST', 'GET'] }));

/**(body-parser) يوزع الطلبات الواردة مُشفرة.و يكون ذلك إستنادا إلى
 * تحتوي المعلمة على خصائص مختلفة مثل التمديد ، والتضخم ، والحد ، والتحقق وما إلى ذلك
 * (extended, inflate, limit, verify...)
 *
 * It distributes incoming requests encrypted
 */
app.use(express.urlencoded({ extended: true }));

// أو لأي مسار مُشتق منه route يُنفذ عند طلب مسار الـ
// Route requests
app.use('/', router); // (/create,/update...)

// بدأ نشغيل التطبيق
// Start the application
start().catch((err) => {
  // رسالة خطأ عند الإخفاق
  console.log(err);
  // خروج من التطبيق
  process.exit(1);
});

async function start() {
  // الإتصال بقاعدة البيانات
  // Database connection
  mongoose.connect('mongodb://127.0.0.1:27017/educat', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      // رسالة خطأ عند الإخفاق
      console.log('MongoDB خطأ في الإتصال بـ : ' + JSON.stringify(err, undefined, 2));
    } else {
      // رسالة نجاح الإتضال
      console.log('تمت بنجاح MongoDB عملية الإنصال بـ');
    }
  });

  // بداية تشغيل السرفر على المنفذ المُعين سابقا
  // Starting the server on the previously specified port
  if (process.NODE_ENV === 'test') {
    app.set("port", 3001); // المنفذ المحلي.أي على الجهاز
  } else {
    // (3000) سيستمع الخادم على المنفذ البديل وهو (PORT) في حال لم يتم تعيين متغير
    app.set("port", process.env.PORT || 3000);
  }

  app.listen(app.get("port"), () => {
    console.log(`تم تشغيل الخادم على المنفذ ( ${app.get("port")} ) و`);
  });
}
