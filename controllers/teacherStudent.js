const Sequelize = require('sequelize');

module.exports = (db) => {
	const { TeacherStudentModel } = require('../models')(db);

	let TeacherStudentController = {};

	/**
	 * Get teacher student records by teacherId
	 * @param {string} teacherId
	 * @returns {Promise<any>}
	 */
	TeacherStudentController.getByTeacherId = async (teacherId) => {
		const teacherStudents = await db.query(`
			SELECT ts.*, s.email, s.status FROM teacher_student ts
			LEFT JOIN student s ON s.studentId = ts.studentId
			WHERE ts.teacherId = ?
		`, { replacements: [teacherId], type: Sequelize.QueryTypes.SELECT });
		return teacherStudents;
	};

	/**
	 * Get teacher student records by teacherIds
	 * @param {Array<String>} teacherIds
	 * @returns {Promise<any>}
	 */
	TeacherStudentController.getByTeacherIds = async (teacherIds) => {
		const teacherStudents = await TeacherStudentModel.findAll({ where: { teacherId: teacherIds } });
		return teacherStudents;
	};

	/**
	 * Save teacher student record
	 * @param {string} teacherId
	 * @param {string} studentId
	 * @returns {Promise<*>}
	 */
	TeacherStudentController.save = async (teacherId, studentId) => {
		const result = await TeacherStudentModel.findOrCreate({
			where: { teacherId, studentId }
		});
		return result[1];
	};

	return TeacherStudentController;
}
