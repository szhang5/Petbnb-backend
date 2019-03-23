'use strict';

const knex = require('../../models/knex');

function updateTransaction(transacid, status) {
	const rawInsertQuery = `
    
	INSERT INTO transaction(transacid, status)
    VALUES (?, ?)
    ON CONFLICT (transacid) DO UPDATE
	SET status = ?;
  `;
	return knex.raw(rawInsertQuery, [transacid, status, status]);
}

function updateTransactionStatus(call, callback) {
	return updateTransaction(call.request.transacid, call.request.status).then(() => {
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
	updateTransactionStatus,
};
