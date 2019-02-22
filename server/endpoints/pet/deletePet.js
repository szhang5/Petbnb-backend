'use strict';

const knex = require('../../models/knex');

function findPetById(petid) {
  const rawInsertQuery = `
    DELETE FROM pet
    WHERE
       petid = ?;
  `;
  return knex.raw(rawInsertQuery, [petid]);
}

function deletePet(call, callback) {
	// console.log(call.request);
	return findPetById( call.request.petid).then(() => {
		return callback(null, {
			success: true
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	deletePet,
};
