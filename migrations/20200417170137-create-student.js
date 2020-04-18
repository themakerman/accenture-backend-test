'use strict';
const constant = require('../config/constant.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('student', {
      studentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, defaultValue: constant.STUDENT_STATUS.ACTIVE, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student');
  }
};
