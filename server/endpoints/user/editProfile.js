'use strict';

const knex = require('../../models/knex');


function insertUserInfo(firstname, lastname, email, phone, country, street, city, state, zip) {
	const rawInsertQuery = `
		UPDATE usertable
		SET firstname = ?,
		    lastname = ?,
		    phone = ?,
		    country = ?,
		    street = ?,
		    city = ?,
		    state = ?,
		    zip = ?
		WHERE
		 username = ?;
	`;
	return knex.raw(rawInsertQuery, [firstname, lastname, phone, country, street, city, state, zip, email]);
}

function editProfile(call, callback) {
	// console.log(call);
	return insertUserInfo(call.request.firstname, call.request.lastname, call.request.email, call.request.phone, call.request.country, call.request.street, call.request.city, call.request.state, call.request.zip).then(() => {
		return callback(null, {
			success: true,
			user: {
				userid: call.request.uid,
      			personid: call.request.personid,
				email: call.request.email,
				firstname: call.request.firstname,
				lastname: call.request.lastname,
				phone: call.request.phone,
				country: call.request.country,
				street: call.request.street,
				city: call.request.city,
				state: call.request.state,
				zip: call.request.zip,
				image: call.request.image,
			}
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	editProfile,
};