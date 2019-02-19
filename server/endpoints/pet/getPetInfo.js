'use strict';

const knex = require('../../models/knex');

function getPet(petid , uid , birth  , furcolor ,  type , petname, weight, breed ,image) {
    
  let petid_condition = '';
  let uid_condition = '';
  let birth_condition = '';
  let furcolor_condition = '';
  let type_condition = '';
  let petname_condition = '';
  let weight_condition = '';
  let breed_condition = '';
  let image_condition = '';
  
  if (petid) {
    petid_condition = `AND petid = ${petid}`;
  }
  if (uid) {
    uid_condition = `AND uid = ${uid}`;
  }
  if (birth) {
    birth_condition = `AND birth = '${birth}'`;
  } 
  if (furcolor) {
    furcolor_condition = `AND furcolor = '${furcolor}'`;
  }
  if (type) {
    type_condition = `AND type = '${type}'`;
  }
    
  if (petname) {
    petname_condition = `AND petname= '${petname}'`;
  }
  if (weight) {
    weight_condition = `AND weight = '${weight}'`;
  }
  if (breed) {
    breed_condition = `AND breed= '${breed}'`;
  } 
  if (image) {
    image_condition = `AND image= '${image}'`;
  }

  const rawQuery = `
  SELECT * FROM pet WHERE TRUE ${petid_condition} ${uid_condition} ${birth_condition} ${furcolor_condition} ${type_condition} ${petname_condition} ${weight_condition} ${breed_condition} ${image_condition} 
  `;
  return knex.raw(rawQuery);
}

function getPetInfo(call, callback) {
  // console.log(call.request)
  return getPet(call.request.petid, call.request.uid, call.request.birth, call.request.furcolor, call.request.type, call.request.petname, call.request.weight, call.request.breed, call.request.image).then((result) => {
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