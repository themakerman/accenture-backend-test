'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('student', [
      { email: 'studentjon@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'studenthon@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'commonstudent1@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'commonstudent2@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'student_only_under_teacher_ken@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'studentmary@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'studentbob@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'studentagnes@gmail.com', createdAt: new Date(), updatedAt: new Date() },
      { email: 'studentmiche@gmail.com', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('student', null, {});
  }
};
