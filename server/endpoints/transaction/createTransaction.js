'use strict';

const knex = require('../../models/knex');

async function insertTransaction(ownerid, sitterid, petsid) {
    var transacid = 0;
    findTransacid().then((result) => {
        transacid = result.rows[0].max;
        
        transacid += 1 ;
        for(let i = 0; i < petsid.length; i++){
            insertCurrentSittingPet(transacid, petsid[i]).then((result) => {
            })
        }//for
        const rawInsertQuery = `
        INSERT INTO transaction (ownerid, sitterid) VALUES(?, ?);
        `;
        return knex.raw(rawInsertQuery, [ownerid, sitterid]);
    })//findTransacid
}//insertTransaction

async function  insertCurrentSittingPet(transacid, petid) {
	const rawInsertQuery = `
	INSERT INTO currentSittingPet (transacid, petid) VALUES(${transacid}, ${petid});
	`;
    console.log(rawInsertQuery);///test code
	return knex.raw(rawInsertQuery);
}

function findTransacid() {
    const rawInsertQuery = `
	SELECT MAX(transacid) FROM transaction;
	`;
	return knex.raw(rawInsertQuery);
}
    
function findOnwerid(petid) {
    var firstPetid = petid[0];
    let petid_condition = '';
    petid_condition = `${firstPetid}`;
    const rawInsertQuery = `
	SELECT uid FROM pet WHERE petid = ${petid_condition};
	`;
	return knex.raw(rawInsertQuery);
}
    
async function createTransaction(call, callback) {
    var ownerid = 0;
    findOnwerid(call.request.petid).then((result) => {
        ownerid = result.rows[0].uid;
        	return insertTransaction(ownerid, call.request.sitterid, call.request.petid)
        .then(() => {
            return callback(null, {
                success: true,
            });
        }, (err) => {
            callback(err, null);
        }).catch((err) => {
            callback(err, null);
        })
    })//findOnwerid
}//createTransaction

module.exports = {
	createTransaction,
};
