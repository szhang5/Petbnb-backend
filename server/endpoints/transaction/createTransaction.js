'use strict';

const knex = require('../../models/knex');

async function insertTransaction(ownerid, sitterid, petsid) {
    const rawInsertQuery = `
    INSERT INTO transaction (ownerid, sitterid, avai_start_date, avai_end_date, description, pet_type, hour_rate, pets_num) VALUES(?, ?, 
        (SELECT avai_start_date FROM post WHERE sitterid = ? ),
        (SELECT avai_end_date FROM post WHERE sitterid = ? ),
        (SELECT description FROM post WHERE sitterid = ? ),
        (SELECT pet_type FROM post WHERE sitterid = ? ),
        (SELECT hour_rate FROM post WHERE sitterid = ? ),
        (SELECT pets_num FROM post WHERE sitterid = ? )
        )
    RETURNING transacid;
    `; 
    const result = await knex.raw(rawInsertQuery, [ownerid, sitterid, sitterid, sitterid, sitterid, sitterid, sitterid, sitterid]);
    const transacid = result.rows[0].transacid;

    for(let i = 0; i < petsid.length; i++){
        insertCurrentSittingPet(transacid, petsid[i]).then((result) => {
        })
    }
}//insertTransaction

async function  insertCurrentSittingPet(transacid, petid) {

	const rawInsertQuery = `
	INSERT INTO currentSittingPet (transacid, petid) VALUES(${transacid}, ${petid});
	`;
    console.log(rawInsertQuery);///test code
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

