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

			return h.api.createApiRes(req, res, 204, 'Students registered to teacher successfully');
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	/**
	 * @api {get} /api/commonstudents
	 * @apiName GetCommonStudents
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
	 * @apiParam {String} teacher Teacher's email address
	 */
	router.get('/commonstudents', async (req, res) => {
		try {
			const teacherEmail = req.query.teacher;

			if (!teacherEmail) throw new Error('Teacher missing');
			const teacherEmails = Array.isArray(teacherEmail) ? teacherEmail : [teacherEmail];

			const commonStudentEmails = await TeacherController.getCommonStudentsByTeacherEmails(teacherEmails);

			return h.api.createApiRes(req, res, 200, 'Retrieved list of common students successfully', {students: commonStudentEmails});
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	/**
	 * @api {post} /api/suspend
	 * @apiName SuspendStudent
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a teacher, I want to suspend a specified student.
	 * @apiParam {String} student Student's email address
	 */
	router.post('/suspend', async (req, res) => {
		try {
			const studentEmail = req.body.student;

			if (!studentEmail) throw new Error('Student missing');

			await TeacherController.suspendStudentByEmail(studentEmail);

			return h.api.createApiRes(req, res, 204, 'Suspended student successfully');
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	/**
	 * @api {post} /api/retrievefornotifications
	 * @apiName RetrieveForNotifications
	 * @apiVersion 1.0.0
	 * @apiGroup Api
	 * @apiDescription As a teacher, I want to retrieve a list of students who can receive a given notification.
	 * @apiParam {String} teacher Teacher's email address
	 * @apiParam {String} notification Message to students
	 */
	router.post('/retrievefornotifications', async (req, res) => {
		try {
			const teacherEmail = req.body.teacher;
			const notification = req.body.notification;

			if (!teacherEmail) throw new Error('Teacher missing');
			if (!notification) throw new Error('Notification missing');

			const studentEmails = await TeacherController.getNotificationStudentsByEmail(teacherEmail, notification);

			return h.api.createApiRes(req, res, 200, 'Retrieved list of students who can receive notification', { recipients: studentEmails });
		} catch (err) {
			return h.api.createApiRes(req, res, 500, err.message);
		}
	});

	return router;

}
