const constant = require('../config/constant.json');

module.exports = (db) => {
	const { StudentModel } = require('../models')(db);

	let StudentController = {};

	/**
	 * Get student by email
	 * @param {String} email
	 * @returns {Promise<any>}
	 */
	StudentController.getByEmail = async (email) => {
		const student = await StudentModel.findOne({ where: { email } });
		return student;
	};

	/**
	 * Get student by emails
	 * @param {Array<String>} emails
	 * @returns {Promise<any>}
	 */
	StudentController.getByEmails = async (emails) => {
		const students = await StudentModel.findAll({ where: { email: emails } });
		return students;
	};

	/**
	 * Get student by studentId
	 * @param {String} studentId
	 * @returns {Promise<any>}
	 */
	StudentController.getByStudentId = async (studentId) => {
		const student = await StudentModel.findOne({ where: { studentId } });
		return student;
	};

	/**
	 * Get students by studentIds
	 * @param {Array<String>} studentIds
	 * @returns {Promise<any>}
	 */
	StudentController.getByStudentIds = async (studentIds) => {
		const students = await StudentModel.findAll({ where: { studentId: studentIds } });
		return students;
	};

	/**
	 * Suspend student by studentId
	 * @param {String} studentId
	 * @returns {Promise<*>}
	 */
	StudentController.suspendStudentById = async (studentId) => {
		const student = await StudentController.getByStudentId(studentId);
		student.status = constant.STUDENT_STATUS.SUSPENDED;
		return await student.save();
	};

	return StudentController;
}
