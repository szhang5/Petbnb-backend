'use strict';

const knex = require('../../models/knex');
const cloudinary = require('cloudinary').v2;
const Config = require('../../config');

cloudinary.config({ 
  cloud_name: `${Config.development.cloudinary.cloud_name}`, 
  api_key: `${Config.development.cloudinary.api_key}`, 
  api_secret: `${Config.development.cloudinary.api_secret}`, 
});

function uploadImage(imageInfo){
	return cloudinary.uploader.upload(imageInfo);
}


function insertPetByUid(uid, birth, furcolor, type, petname, weight, breed, imageURL) {
	const birthValue = birth || null;
	const rawInsertQuery = `
	INSERT INTO pet (uid, birth, furcolor, type, petname, weight, breed, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?);
	`;
	return knex.raw(rawInsertQuery, [uid, birthValue, furcolor, type, petname, weight, breed, imageURL]);
}


async function createPet(call, callback) {
	let image = {url: ''};
	if(call.request.image_base_64) {
		image = await uploadImage(call.request.image_base_64);
	}
	return insertPetByUid(call.request.uid, call.request.birth, call.request.furcolor,
		call.request.type, call.request.petname, call.request.weight, call.request.breed,
		image.url)
	.then(() => {
		return callback(null, {
			success: true,
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})



	return uploadImage(call.request.image_base_64).then((image)=>{
		
	})
}

module.exports = {
	createPet,
};
