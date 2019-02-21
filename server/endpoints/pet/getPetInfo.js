'use strict';

const knex = require('../../models/knex');

function getPet(uid) {
  const rawQuery = `
  SELECT petid, uid, birth, furcolor, type, petname, weight, breed, image FROM pet WHERE uid = ?
  ORDER BY
  petid ASC;
  `;
  return knex.raw(rawQuery, [uid]);
}

function getPetInfo(call, callback) {
  // console.log(call.request)
  return getPet(call.request.uid).then((result) => {
    // console.log(result);
    const listPets = [];
    result.rows.forEach(row => {
    	listPets.push({
        petid: row.petid,
        uid: row.uid,
        birth: row.birth,
        furcolor: row.furcolor,
        type: row.type,
        petname: row.petname,
        weight: row.weight,
        breed: row.breed,
        image: row.image,
      })  
    })
    callback(null, {
      success: true,
      pet: listPets,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getPetInfo,
};