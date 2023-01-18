'use strict';
// model إستدعاء أو جلب ملف الـ
// require our model
const stdModel = require('../models/stds.js');

// للوصول إلى الدوال  التي هي بالملف،نقوم بعملية تصدير
module.exports = {
	/**إلى ما إذا كان قد تم تنفيذ الطلب بنجاح أم لا HTTP تشير أكواد حالة استجابة
	 *
	 * يتم تجميع الردود في خمس فئات
	 * (100 - 199) ردود إعلامية
	 * (200 - 299) إجابات النجاح
	 * (300 - 399) إعادة توجيه الرسائل
	 * (400 – 499) (client)استجابات الخطأ
	 * (500 – 599) (server)استجابات الخطأ
	 *
	 * Response status codes
	*/

	// جلب كل الطُلاب من قاعدة البيانات
	// Get all students from the database
	index: (req, res) => {
		stdModel.find({}, (err, stds) => {
			if(err) {
				/**واجَهَ الخادم مَوْقِفا لا يعرف كيفية التعامل معه
				 *
				 * (client) يُرسل الخادم هذه الاستجابة لتوجيه العميل
				   GET  إلى المورد المطلوب عبر مسار آخر باستخدام طلب
				 */
				return res.status(500).send(err);
			} else {
				// توجيه المُستخدم إلى الصفحة المُحددة
				res.status(200).render('index',{
					title: 'نظام إدارة الطلاب',
					hading: 'إدارة الطُّلاَّب',
					stds: stds
				});

				// (200) الناجحة HTTP لطلبات
				// (HTTP method) رمز أو كود الإستجابة،يغتمد على الحالة
				// مما يعني أنه GET في هذا المسار أو العملية،لدينا
				   //(message body) تم جلب المورد ونقله في نص الرسالة
			}
		});
	},
	// إنشاء طالب جديد
	// Create a new student
	create: (req, res) => {
		if (req.body.name == '' || req.body.age == '') {
			res.status(500).redirect('/');
		} else {
			const newStd = new stdModel({name: req.body.name, age: req.body.age});
			newStd.save().then(() => {
				/**توجيه المُستخدم إلى المسار المُحدد
				 * مما يعني وصف نتيجة العمل POST في هذا المسار أو العملية،لدينا
				 * (201) تم تلبية الطلب ، مما أدى إلى إنشاء مورد جديد
				   (POST|PUT) عادة الرد المرسل بعد الطلب من
				   (307) لكن بما أنها عملية توجيه،نستعمل الرمز
				 * (client) يُرسل الخادم هذه الاستجابة لتوجيه العميل
				   (client) على أن لا يُغير GET  إلى المورد المطلوب عبر مسار آخر باستخدام طلب
				   المُستخدمة.يعني نفس الطريقة تُعاد في العملية المُوالية HTTP طريقة الـ
				 *
				 * Direct the user to the specified path
				*/
				return res.status(307).redirect('/');
			});
		}
	},
	// عرض صفحة التعديل
	// View the edit page
	edit: (req, res) => {
		if (req.params.id == '') {
			res.status(500).redirect('/');
		} else {
			const id = req.params.id;
			stdModel.find({}, (err, stds) => {
				if(err) {
					return res.status(500).send(err);
				} else {
					// النوجيه إلى صفحة التعديل مع البيانات
					res.status(200).render('stdsEdit', {stds: stds, idStd: id});
				}
			});
		}
	},
	// إدخال ما قام به المُستخدم من تعديل إلى قاعدة البيانات
	// Entering the modifications made by the user to the database
	update: (req, res) => {
		if (req.params.id == '') {
			res.status(500).redirect('/');
		} else {
			const id = req.params.id;
			stdModel.findByIdAndUpdate(id, {name: req.body.name, age: req.body.age}, err =>{
				if(err) {
					return res.status(500).send(err);
				} else {
					// توجيه المُستخدم إلى المسار المُحدد بعد عميلة التعديل
					return res.status(307).redirect('/');
				}
			});
		}
	},
	//(table in mysql) collection حذف بيانات من
	// Delete data from collection
	delete:  async (req, res) => {
		if (req.params.id == '') {
			res.status(500).redirect('/');
		} else {
			stdModel.deleteOne({_id: req.params.id}, (err)=>{
				if(err) {
					return res.status(500).send(err);
				} else {
					// توجيه المُستخدم إلى المسار المُحدد بعد عميلة الحذف
					return res.status(307).redirect('/');
				}
			});
		}
	}
}
