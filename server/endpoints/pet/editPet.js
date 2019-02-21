'use strict';

const knex = require('../../models/knex');


function insertPetInfo(petid, birth, furcolor, type, petname, weight, breed) {
  const rawInsertQuery = `
    UPDATE pet
    SET birth = ?,
        furcolor = ?,
        type = ?,
        petname = ?,
        weight = ?,
        breed = ?
    WHERE
       petid = ?;
  `;
  return knex.raw(rawInsertQuery, [birth, furcolor, type, petname, weight, breed, petid]);
}

function editPet(call, callback) {
	console.log(call.request);
	return insertPetInfo( call.request.petid , call.request.birth, call.request.furcolor, call.request.type, call.request.petname, call.request.weight, call.request.breed).then(() => {
		return callback(null, {
			petid: call.request.petid,
			birth: call.request.birth,
			furcolor: call.request.furcolor,
			type: call.request.type,
			petname: call.request.petname,
			weight: call.request.weight,
			breed: call.request.breed,
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	editPet,
};