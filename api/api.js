const express = require('express')
const router = express.Router()
const h = require('../helpers')

module.exports = (db) => {

	const TeacherController = require('../controllers/teacher')(db);

	/**
	 * @api {post} /api/register
	 * @apiName RegisterStudentsToTeacher
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a teacher, I want to register one or more students to a specified teacher.
	 * @apiParam {String} teacher Teacher's email address
	 * @apiParam {String[]} students Students' email addresses
	 */
	router.post('/register', async (req, res) => {
		try {
			const teacherEmail = req.body.teacher;
			const studentsEmails = req.body.students;

			if (!teacherEmail) throw new Error('Teacher missing');
			if (!studentsEmails || studentsEmails.length === 0) throw new Error('Students missing');

			await TeacherController.registerStudentsToTeacher(teacherEmail, studentsEmails);

			h.api.createApiRes(req, res, 'Students registered to teacher successfully');
		} catch (err) {
			h.api.createApiRes(req, res, err.message);
		}
	});

	return router;

}
