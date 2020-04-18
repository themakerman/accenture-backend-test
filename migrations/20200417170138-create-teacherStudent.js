'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher_student', {
      teacherStudentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      teacherId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'teacher', key: 'teacherId' } },
      studentId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'student', key: 'studentId' } },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teacher_student');
  }
};
