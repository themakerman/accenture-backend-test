const constant = require('../config/constant.json');
const h = require('../helpers');

module.exports = (db) => {
	const { TeacherModel } = require('../models')(db);
	const StudentController = require('./student')(db);
	const TeacherStudentController = require('./teacherStudent')(db);

	let TeacherController = {};

	/**
	 * Get teacher by email
	 * @param {string} email
	 * @returns {Promise<any>}
	 */
	TeacherController.getByEmail = async (email) => {
		const teacher = await TeacherModel.findOne({ where: { email } });
		return teacher;
	};

	/**
	 * Get teachers by emails
	 * @param {Array} emails
	 * @returns {Promise<any>}
	 */
	TeacherController.getByEmails = async (emails) => {
		const teachers = await TeacherModel.findAll({ where: { email: emails } });
		return teachers;
	};

	/**
	 * Register students to teacher
	 * @param {string} teacherEmail
	 * @param {string} studentEmails
	 * @returns {Promise<void>}
	 */
	TeacherController.registerStudentsToTeacher = async (teacherEmail, studentEmails) => {
		const teacher = await TeacherController.getByEmail(teacherEmail);
		for (let i = 0; i < studentEmails.length; i++) {
			const studentEmail = studentEmails[i];
			const student = await StudentController.getByEmail(studentEmail);
			if (student.get('studentId') && teacher.get('teacherId')) {
				await TeacherStudentController.save(teacher.get('teacherId'), student.get('studentId'));
			}
		}
	};

	/**
	 * Get common students among teacher(s) using teacher emails
	 * @param {Array<String>} teacherEmails
	 * @returns {Promise<[]>}
	 */
	TeacherController.getCommonStudentsByTeacherEmails = async (teacherEmails) => {
		//Get teachers by teacher emails
		const teachers = await TeacherController.getByEmails(teacherEmails);
		//Index list of teachers by teacherId
		const indexedTeachers = teachers.reduce((state, teacher) => {
			state[teacher.get('teacherId')] = teacher;
			return state;
		}, {});
		//Get teacher student records by teacherIds
		const teacherStudents = await TeacherStudentController.getByTeacherIds(Object.keys(indexedTeachers));
		//Index teacher student records by studentIds and count no. of teachers assigned to them
		const indexedStudentIds = teacherStudents.reduce((state, teacherStudent) => {
			state[teacherStudent.get('studentId')] = state[teacherStudent.get('studentId')] || { 'noOfTeachersAssigned': 0 };
			state[teacherStudent.get('studentId')].noOfTeachersAssigned++;
			return state;
		}, {});
		const commonStudentIds = [];
		//Filter common students among teachers from teacherEmails
		for (let i = 0; i < Object.keys(indexedStudentIds).length; i++) {
			const key = Object.keys(indexedStudentIds)[i];
			const noOfTeachersAssigned = indexedStudentIds[key].noOfTeachersAssigned;
			if (noOfTeachersAssigned >= teacherEmails.length) {
				commonStudentIds.push(key);
			}
		}
		//Get common students among teachers
		const commonStudents = await StudentController.getByStudentIds(commonStudentIds);
		const commonStudentEmails = [];
		for (let i = 0; i < commonStudents.length; i++) {
			const commonStudent = commonStudents[i];
			commonStudentEmails.push(commonStudent.get('email'));
		}
		return commonStudentEmails;
	};

	/**
	 * Suspend student by student email
	 * @param {String} studentEmail
	 * @returns {Promise<*>}
	 */
	TeacherController.suspendStudentByEmail = async (studentEmail) => {
		const student = await StudentController.getByEmail(studentEmail);
		return await StudentController.suspendStudentById(student.get('studentId'));
	};

	TeacherController.getNotificationStudentsByEmail = async (teacherEmail, notification) => {
		const teacher = await TeacherController.getByEmail(teacherEmail);
		//Get teacher student records for current teacher
		const teacherStudents = await TeacherStudentController.getByTeacherId(teacher.get('teacherId'));
		//Get student emails from notification
		const studentEmails = h.general.extractTaggedEmails(notification);
		const consolidatedStudentEmailsIndex = {};
		//Filter students from teacher student records
		for (let i = 0; i < teacherStudents.length; i++) {
			const teacherStudent = teacherStudents[i];
			//Only filter active students
			if (teacherStudent.status === constant.STUDENT_STATUS.ACTIVE) {
				consolidatedStudentEmailsIndex[teacherStudent.studentId] = consolidatedStudentEmailsIndex[teacherStudent.studentId] || {
					email: teacherStudent.email
				};
			}
		}
		if (studentEmails && studentEmails.length > 0) {
			//Filter students from notification email tagging
			const studentsFromNotification = await StudentController.getByEmails(studentEmails);
			for (let i = 0; i < studentsFromNotification.length; i++) {
				const studentFromNotification = studentsFromNotification[i];
				//Only filter active students
				if (studentFromNotification.status === constant.STUDENT_STATUS.ACTIVE) {
					consolidatedStudentEmailsIndex[studentFromNotification.studentId] = consolidatedStudentEmailsIndex[studentFromNotification.studentId] || {
						email: studentFromNotification.email
					};
				}
			}
		}

		const recipients = [];
		for (let i = 0; i < Object.keys(consolidatedStudentEmailsIndex).length; i++) {
			const key = Object.keys(consolidatedStudentEmailsIndex)[i];
			recipients.push(consolidatedStudentEmailsIndex[key].email);
		}
		return recipients;
	};

	return TeacherController;
}
