'use strict';

const knex = require('../../models/knex');


function insertPetInfo(petid  , birth  , furcolor ,  type , petname, weight, breed ,image) {
  let petid_condition = '';
  let birth_condition = '';
  let furcolor_condition = '';
  let type_condition = '';
  let petname_condition = '';
  let weight_condition = '';
  let breed_condition = '';
  let image_condition = '';
  if (petid) {
    petid_condition = ` petid = ${petid}`;
  }
  if (birth) {
    birth_condition = `, birth = '${birth}'`;
  } 
  if (furcolor) {
    furcolor_condition = `, furcolor = '${furcolor}'`;
  }
  if (type) {
    type_condition = `, type = '${type}'`;
  }
    
  if (petname) {
    petname_condition = `, petname= '${petname}'`;
  }
  if (weight) {
    weight_condition = `, weight = '${weight}'`;
  }
  if (breed) {
    breed_condition = `, breed= '${breed}'`;
  } 
  if (image) {
    image_condition = `, image= '${image}'`;
  }
    
//     	const rawInsertQuery = `
// 		UPDATE pet
// 		SET 
// 		    birth = ?,
// 		    furcolor = ?,
// 		    type = ?,
// 		    petname = ?,
// 		    weight = ?,
// 		    breed = ?,
// 		    image = ?
// 		WHERE 
//       petid = ? ;
// 	`;
  const rawQuery = `
  UPDATE pet SET petid = petid ${birth_condition} ${furcolor_condition} ${type_condition} ${petname_condition} ${weight_condition} ${breed_condition} ${image_condition} WHERE ${petid_condition};
  `;
  return knex.raw(rawQuery);
}

function editPet(call, callback) {
	// console.log(call);
	return insertPetInfo( call.request.petid , call.request.birth, call.request.furcolor, call.request.type, call.request.petname, call.request.weight, call.request.breed, call.request.image).then(() => {
		return callback(null, {
			success: true,
			pet: {
				petid: call.request.petid,
				uid: call.request.uid,
				birth: call.request.birth,
				furcolor: call.request.furcolor,
				type: call.request.type,
				petname: call.request.petname,
				weight: call.request.weight,
				breed: call.request.breed,
				image: call.request.image,
			}
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	editPet,
};