'use strict';
const Teacher = require('../models/teacher');
const Student = require('../models/student');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teacher_student', {
      teacherStudentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      teacherId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Teacher, key: 'teacherId' } },
      studentId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Student, key: 'studentId' } },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teacher_student');
  }
};
