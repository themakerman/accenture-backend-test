const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Teacher = require('./teacher');
const Student = require('./student');
/**
 * TeacherStudent model
 * @param {Sequelize} db
 * @returns {TeacherStudent}
 */
module.exports = (db) => {
	class TeacherStudent extends Model {}
	TeacherStudent.init({
		teacherStudentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		teacherId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Teacher, key: 'teacherId' } },
		studentId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Student, key: 'studentId' } },
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	}, {
		sequelize: db,
		modelName: 'teacher_student',
		tableName: 'teacher_student'
	});
	TeacherStudent.sync();
	return TeacherStudent;
}
