'use strict';

const knex = require('../../models/knex');


function insertPost(uid, postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num) {
	const rawInsertQuery = `
	INSERT INTO post (sitterid, postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num) 
	VALUES(?, ?, ?, ?, ?, ?, ?, ?)
	`;
	return knex.raw(rawInsertQuery, [uid, postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num]);
}


function createPost(call, callback) {
	return insertPost(call.request.uid, call.request.postdate, call.request.avai_start_date, call.request.avai_end_date, call.request.description, call.request.pet_type, call.request.hour_rate, call.request.pets_num).then(() => {
		return callback(null, {
			success: true, //this message is for developer
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	createPost,
};
