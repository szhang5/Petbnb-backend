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


/*
function createPost(call, callback) {
  // console.log(call.request)
  const response = {
  	success: true,
  	user: {
  		'userid': 121212,
  		'name': 'shiyun',
  		'email': call.request.email,
  	}
  };

  callback(null, response);
}
*/

module.exports = {
	createPost,
};
