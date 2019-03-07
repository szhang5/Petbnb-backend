'use strict';

const knex = require('../../models/knex');


function isMatch(email, password) {
	const rawQuery = `
	SELECT * FROM usertable WHERE username = ? AND password = ?
	`;
	return knex.raw(rawQuery, [email, password]);
}

function signIn(call, callback) {
	return isMatch(call.request.email, call.request.password).then((result) => {
		if (result.rowCount) {
			callback(null, {
				success: true,
				user: {
					email: result.rows[0].username,
                    user_type: result.rows[0].user_type
				}
			});
		} else {
			callback(err, null);
		}
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	signIn,
};
