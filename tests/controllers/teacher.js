const assert = require('chai').assert;

const dbConfig = require('../../config/config.json');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, TeacherModel } = require('../../models')(sequelize);

const TeacherController = require('../../controllers/teacher')(sequelize);

const TestTeachers = [];

describe('Controller > teacher tests', () => {
	before(async () => {
		await db.sync();
		TestTeachers.push(await TeacherModel.create({ email: 'hello@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello1@gmail.com' }));
		TestTeachers.push(await TeacherModel.create({ email: 'hello2@gmail.com' }));
	})

	describe('getByEmail', async () => {
		it('passing in "hello@gmail.com" should return a teacher record', async () => {
			const teacher = await TeacherController.getByEmail(TestTeachers[0].email);
			assert.isNotNull(teacher);
			assert.typeOf(teacher, 'object');
			assert.strictEqual(teacher.email, TestTeachers[0].email);
		})
	})

	describe('getByEmails', async () => {
		it('passing in 2 valid teacher emails should return 2 teacher records', async () => {
			const teacherEmails = [TestTeachers[0].email, TestTeachers[1].email];
			const teachers = await TeacherController.getByEmails(teacherEmails);
			assert.isNotNull(teachers);
			assert.typeOf(teachers, 'array');
			assert.strictEqual(teachers[0].email, teacherEmails[0]);
		})
	})

	after(async () => {
		await db.drop();
		await db.close();
	})
})
