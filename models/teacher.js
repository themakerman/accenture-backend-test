const Sequelize = require('sequelize');
const Model = Sequelize.Model;
/**
 * Teacher model
 * @param {Sequelize} db
 * @returns {Teacher}
 */
module.exports = (db) => {
	class Teacher extends Model {}
	Teacher.init({
		teacherId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
		email: { type: Sequelize.STRING, allowNull: false },
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	}, {
		sequelize: db,
		modelName: 'teacher',
		tableName: 'teacher'
	});
	Teacher.sync();
	return Teacher;
}
