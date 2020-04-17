
module.exports = (db) => {
	const TeacherModel = db.import('../models/teacher');
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
	}

	TeacherController.registerStudentsToTeacher = async (teacherEmail, studentEmails) => {
		const teacher = await TeacherController.getByEmail(teacherEmail);
		const teacherStudents = await TeacherStudentController.getByTeacherId(teacher.teacherId);
console.log(teacherStudents);
		return teacherStudents;
	};

	return TeacherController;
}
