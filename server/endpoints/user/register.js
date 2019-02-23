'use strict';

const knex = require('../../models/knex');


function insertUserByEmail(email, password, user_type) {
	const rawInsertQuery = `
	INSERT INTO usertable (username, password, user_type) VALUES(?, ?, ?)
	ON CONFLICT (username) DO UPDATE
	SET username = excluded.username,
			password = excluded.password,
			user_type = excluded.user_type;
	`;
	return knex.raw(rawInsertQuery, [email, password, user_type]);
}


function register(call, callback) {
	return insertUserByEmail(call.request.email, call.request.password, call.request.user_type).then(() => {
		return callback(null, {
			success: true,
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
