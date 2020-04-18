const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constant.json');

module.exports = (db) => {

  class Teacher extends Model {}
  Teacher.init({
    teacherId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'teacher',
    tableName: 'teacher'
  });

  class Student extends Model {}
  Student.init({
    studentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.STRING, defaultValue: constant.STUDENT_STATUS.ACTIVE, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'student',
    tableName: 'student'
  })

  class TeacherStudent extends Model {}
  TeacherStudent.init({
    teacherStudentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    teacherId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Teacher, key: 'teacherId' } },
    studentId: { type: Sequelize.INTEGER, allowNull: false, references: { model: Student, key: 'studentId' } },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'teacher_student',
    tableName: 'teacher_student'
  });

  return {
    db,
    TeacherModel: Teacher,
    StudentModel: Student,
    TeacherStudentModel: TeacherStudent
  }
}
