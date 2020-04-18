'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teacher', [
        { teacherId: 1, email: 'teacherken@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { teacherId: 2, email: 'teacherjoe@gmail.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teacher', null, {});
  }
};
