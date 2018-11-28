'use strict';

const knex = require('../../models/knex');


function insertUserByEmail(email, password) {
	const rawInsertQuery = `
	INSERT INTO usertable (username, password) VALUES(?, ?)
	ON CONFLICT (username) DO UPDATE
	SET username = excluded.username,
			password = excluded.password;
	`;
	return knex.raw(rawInsertQuery, [email, password]);
}


function register(call, callback) {
	return insertUserByEmail(call.request.email, call.request.password).then(() => {
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
	register,
};
