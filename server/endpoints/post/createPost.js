'use strict';

const knex = require('../../models/knex');


function insertPost(uid, image, postdate, avai_start_date, avai_end_date, description, pet_type) {
	const rawInsertQuery = `
	INSERT INTO post (sitterid, image, postdate, avai_start_date, avai_end_date, description, pet_type) 
	VALUES(?, ?, ?, ?, ?, ?, ?)
	`;
	return knex.raw(rawInsertQuery, [uid, image, postdate, avai_start_date, avai_end_date, description, pet_type]);
}


function createPost(call, callback) {
	return insertPost(call.request.uid, call.request.image, call.request.postdate, call.request.avai_start_date, call.request.avai_end_date, call.request.description, call.request.pet_type).then(() => {
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
	createPost,
};
