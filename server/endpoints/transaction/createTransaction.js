'use strict';

const knex = require('../../models/knex');

function insertTransaction(petid, sitterid, startdate, enddate) {
	const enddateValue = enddate || null;
	const startdateValue = startdate || null;
	const rawInsertQuery = `
	INSERT INTO transaction (petid, ownerid  , sitterid, startdate, enddate) VALUES(?, (select pet.uid from pet where pet.petid = ?), ?, ?, ?);
	`;
	return knex.raw(rawInsertQuery, [petid,petid, sitterid, startdateValue, enddateValue]);
}

async function createTransaction(call, callback) {
	return insertTransaction(call.request.petid, call.request.sitterid,
		call.request.startdate, call.request.enddate)
	.then(() => {
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
	createTransaction,
};
