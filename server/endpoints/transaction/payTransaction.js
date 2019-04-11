'use strict';

const knex = require('../../models/knex');

async function updateStatus(transacid){
    let rawInsertQuery = `
        UPDATE transaction SET status  = 2 WHERE transacid = ?;
    `; 
    let result = await knex.raw(rawInsertQuery, [transacid]);
}

async function getTransacDays(transacid) {
    let rawInsertQuery = `
    select date_part('day',(SELECT avai_end_date  FROM transaction WHERE transaction.transacid = ?)-(SELECT avai_start_date  FROM transaction WHERE transaction.transacid = ?))  ;
    `; 
    let result = await knex.raw(rawInsertQuery, [transacid, transacid]);
    let days = result.rows[0].date_part  ;
    return days;
}


async function getTransacInfo(transacid) {
    let rawInsertQuery = `
    SELECT * FROM transaction WHERE transaction.transacid = ?;
    `; 
    let result = await knex.raw(rawInsertQuery, [transacid]);
    let transacInfo = result.rows[0];
    return transacInfo;
}

async function updateOwnerBalance(ownerid, rate) {
    let rawInsertQuery = `
        UPDATE usertable SET balance  = balance - ? WHERE uid = ?;
    `; 
    let result = await knex.raw(rawInsertQuery, [rate, ownerid]);
}

async function updateSitterBalance(sitterid, rate) {
    let rawInsertQuery = `
        UPDATE usertable SET balance  = balance + ? WHERE uid = ?;
    `; 
    let result = await knex.raw(rawInsertQuery, [rate, sitterid]);
}

async function updateBalance(transacid) {
    let transacInfo = await getTransacInfo(transacid);
    let days =  await getTransacDays(transacid);
    let totalRate = days * transacInfo.hour_rate;
    
    await updateOwnerBalance(transacInfo.ownerid, totalRate);
    await updateSitterBalance(transacInfo.sitterid, totalRate);
    await updateStatus(transacid);
}


function payTransaction(call, callback) {
	return updateBalance(call.request.transacid).then(() => {
		return callback(null, {
			success: true, //this message is for developer
		});
	}, (err) => {
		callback(err, null);f
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	payTransaction,
};
