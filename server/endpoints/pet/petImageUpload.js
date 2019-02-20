'use strict';

const knex = require('../../models/knex');
const cloudinary = require('cloudinary').v2;
const Config = require('../../config');


cloudinary.config({ 
  cloud_name: `${Config.development.cloudinary.cloud_name}`, 
  api_key: `${Config.development.cloudinary.api_key}`, 
  api_secret: `${Config.development.cloudinary.api_secret}`, 
});

function storePetImageURL(petid, imageURL){
	const rawQuery = `
	UPDATE usertable
		SET image = ?
		WHERE
		 petid = ?;
	`;
	return knex.raw(rawQuery, [imageURL, petid]);
}

function uploadImage(imageInfo){
	return cloudinary.uploader.upload(imageInfo);
}

function petImageUpload(call, callback) {
	uploadImage(call.request.image_base_64).then((image)=>{
		return storePetImageURL(call.request.petid, image.url).then(() => {
			return callback(null, {
				imageUrl: image.url,
			});
		}, (err) => {
			callback(err, null);
		}).catch((err) => {
			callback(err, null);
		})
	});
}

module.exports = {
	petImageUpload,
};