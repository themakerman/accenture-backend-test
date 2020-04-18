'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('student', [
      { studentId: 1, email: 'studentjon@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 2, email: 'studenthon@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 3, email: 'commonstudent1@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 4, email: 'commonstudent2@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 5, email: 'student_only_under_teacher_ken@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 6, email: 'studentmary@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 7, email: 'studentbob@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 8, email: 'studentagnes@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { studentId: 9, email: 'studentmiche@gmail.com', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('student', null, {});
  }
};
