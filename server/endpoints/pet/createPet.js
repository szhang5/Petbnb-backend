'use strict';

const knex = require('../../models/knex');


function insertPetByUid(uid) {
	const rawInsertQuery = `
	INSERT INTO pet (uid) VALUES(?);
	`;
	return knex.raw(rawInsertQuery, [uid]);
}


function createPet(call, callback) {
	return insertPetByUid(call.request.uid).then(() => {
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
	createPet,
};
