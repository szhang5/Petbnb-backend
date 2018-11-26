'use strict';

const knex = require('../../models/knex');


function findUserByEmail(email) {
	const rawQuery = `
		SELECT * FROM usertable WHERE username = ? 
	`;
	return knex.raw(rawQuery, [email]);
}


function insertUserContact(call, callback) {
	return findUserByEmail(call.request.email).then(() => {
		return callback(null, {
			success: true,
			user: {
				userid: 0,
				name: 'test',
				email: call.request.email,
			}
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	insertUserContact,
};