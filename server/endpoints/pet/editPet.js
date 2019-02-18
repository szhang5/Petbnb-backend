// 'use strict';

// const knex = require('../../models/knex');


// function insertUserInfo(petid , uid , birth  , furcolor ,  type , petname, weight, breed ,image,petid , uid) {
// 	const rawInsertQuery = `
// 		UPDATE pet
// 		SET petid = ?,
// 		    uid = ?,
// 		    birth = ?,
// 		    furcolor = ?,
// 		    type = ?,
// 		    petname = ?,
// 		    weight = ?,
// 		    breed = ?,
// 		    image = ?
// 		WHERE 
//       petid = ? AND
// 		 uid = ?;
// 	`;
// 	return knex.raw(rawInsertQuery, [petid , uid , birth  , furcolor ,  type , petname, weight, breed ,image]);
// }

// function editProfile(call, callback) {
// 	// console.log(call);
// 	return insertUserInfo(call.request.petid, call.request.uid, call.request.birth, call.request.furcolor, call.request.type, call.request.petname, call.request.weight, call.request.breed, call.request.image,call.request.petid, call.request.uid ).then(() => {
// 		return callback(null, {
// 			success: true,
// 			user: {
// 				petid: call.request.petid,
//  			uid: call.request.uid,
// 				birth: call.request.birth,
// 				furcolor: call.request.furcolor,
// 				type: call.request.type,
// 				phone: call.request.phone,
// 				country: call.request.country,
// 				street: call.request.street,
// 				city: call.request.city,
// 				state: call.request.state,
// 				zip: call.request.zip,
// 				image: call.request.image,
// 			}
// 		});
// 	}, (err) => {
// 		callback(err, null);
// 	}).catch((err) => {
// 		callback(err, null);
// 	})
// }

// module.exports = {
// 	editProfile,
// };