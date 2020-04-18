const assert = require('chai').assert;
const h = require('../../helpers');

describe('Helpers tests', () => {

	describe('isValidEmail', () => {
		it('should return true for mervintankw@gmail.com', () => {
			const email = 'mervintankw@gmail.com';
			const result = h.general.isValidEmail(email);
			assert.isNotNull(result);
			assert.typeOf(result, 'boolean');
			assert.strictEqual(result, true);
		});
	});

	describe('extractTaggedEmails on string with 2 email addresses', () => {
		it('should return 2 email addresses', () => {
			const str = 'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com';
			const emails = h.general.extractTaggedEmails(str);
			assert.isNotNull(emails);
			assert.typeOf(emails, 'array');
			assert.strictEqual(emails[0], 'studentagnes@gmail.com');
			assert.strictEqual(emails[1], 'studentmiche@gmail.com');
		});
	});

});
