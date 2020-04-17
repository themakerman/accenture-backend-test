
module.exports = (db) => {
	// const TeacherModel = db.import('../models/teacher');
	const TeacherModel = require('../models/teacher')(db);
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
	console.log(teacher)
		// teacher.dataValues.teacherId;
		const teacherStudents = await TeacherStudentController.getByTeacherId(teacher.dataValues.teacherId);
console.log(teacherStudents);
		return teacherStudents;
	};

	return TeacherController;
}
