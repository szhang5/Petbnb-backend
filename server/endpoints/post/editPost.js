'use strict';

const knex = require('../../models/knex');


function updatePost(postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num, sitterid) {
	const rawInsertQuery = `
    
	INSERT INTO post(postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num, sitterid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (sitterid) DO UPDATE
	SET postdate = ?,
	    avai_start_date = ?,
        avai_end_date = ?,
        description = ?,
        pet_type = ?,
        hour_rate = ?,
        pets_num = ?;
  `;
	return knex.raw(rawInsertQuery, [postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num, sitterid, postdate, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num]);
}


function editPost(call, callback) {
	return updatePost(call.request.postdate, call.request.avai_start_date, call.request.avai_end_date, call.request.description, call.request.pet_type, call.request.hour_rate, call.request.pets_num, call.request.sitterid).then(() => {
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
	editPost,
};
