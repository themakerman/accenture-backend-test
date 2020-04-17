const Sequelize = require('sequelize');
const Model = Sequelize.Model;
/**
 * Student model
 * @param {Sequelize} db
 * @returns {Student}
 */
module.exports = (db) => {
	class Student extends Model {}
	Student.init({
		studentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		email: { type: Sequelize.STRING, allowNull: false },
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	}, {
		sequelize: db,
		modelName: 'student',
		tableName: 'student'
	})
	Student.sync();
	return Student;
}
