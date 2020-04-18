'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teacher_student', [
      { teacherId: 1, studentId: 3, createdAt: new Date(), updatedAt: new Date() },
      { teacherId: 1, studentId: 4, createdAt: new Date(), updatedAt: new Date() },
      { teacherId: 2, studentId: 3, createdAt: new Date(), updatedAt: new Date() },
      { teacherId: 2, studentId: 4, createdAt: new Date(), updatedAt: new Date() },
      { teacherId: 1, studentId: 5, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teacher_student', null, {});
  }
};
