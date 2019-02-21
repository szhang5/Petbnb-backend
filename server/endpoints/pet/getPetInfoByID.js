'use strict';

const knex = require('../../models/knex');

function findPetbyID(petid) {
  const rawQuery = `
  SELECT petid, uid, birth, furcolor, type, petname, weight, breed, image FROM pet WHERE petid = ?
  `;
  return knex.raw(rawQuery, [petid]);
}

function getPetInfoByID(call, callback) {
  // console.log(call.request)
  return findPetbyID(call.request.petid).then((result) => {
    console.log(result);
    callback(null, {
      // petid: row.petid,
      // uid: row.uid,
      // birth: row.birth,
      // furcolor: row.furcolor,
      // type: row.type,
      // petname: row.petname,
      // weight: row.weight,
      // breed: row.breed,
      // image: row.image,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getPetInfoByID,
};