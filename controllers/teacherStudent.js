const Sequelize = require('sequelize');

module.exports = (db) => {
	// const TeacherStudentModel = db.import('teacherStudent', `${__dirname}/models/teacherStudent`);

	let TeacherStudentController = {};

	/**
	 * Get teacher student records by teacherId
	 * @param {string} teacherId
	 * @returns {Promise<any>}
	 */
	TeacherStudentController.getByTeacherId = async (teacherId) => {
		const teacherStudents = await db.query(`
			SELECT ts.*, s.email FROM teacher_student ts
			LEFT JOIN student s ON s.studentId = ts.studentId
			WHERE ts.teacherId = ?
		`, { replacements: [teacherId], type: Sequelize.QueryTypes.SELECT });
		return teacherStudents;
	};

	return TeacherStudentController;
}
