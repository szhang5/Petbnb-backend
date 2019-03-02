'use strict';

const knex = require('../../models/knex');

function findPetbyID(petid) {
  // console.log(typeof petid);
  const rawQuery = `
  SELECT * FROM pet WHERE petid = ?
  `;
  return knex.raw(rawQuery, [petid]);
}

function getPetInfoById(call, callback) {
  return findPetbyID(call.request.petid).then((result) => {
    if(result.rowCount){
       callback(null, {
        petid: result.rows[0].petid,
        uid: result.rows[0].uid,
        birth: result.rows[0].birth,
        furcolor: result.rows[0].furcolor,
        type: result.rows[0].type,
        petname: result.rows[0].petname,
        weight: result.rows[0].weight,
        breed: result.rows[0].breed,
        image: result.rows[0].image,
      });
    } else {
      callback(err, null);
    }
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getPetInfoById,
};