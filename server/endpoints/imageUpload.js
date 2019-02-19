'use strict';

const knex = require('../models/knex');
const cloudinary = require('cloudinary').v2;
const Config = require('../config');


cloudinary.config({ 
  cloud_name: `${Config.development.cloudinary.cloud_name}`, 
  api_key: `${Config.development.cloudinary.api_key}`, 
  api_secret: `${Config.development.cloudinary.api_secret}`, 
});

const eager_options = {
  width: 200, height: 150, crop: 'scale', format: 'jpg'
};


function storePetImageURL(petid, imageURL) {
	const rawQuery = `
	UPDATE pet
		SET image = ?
		WHERE
		 petid = ?;
	`;
	return knex.raw(rawQuery, [imageURL, petid]);
}

function storeUserImageURL(email, imageURL){
	const rawQuery = `
	UPDATE usertable
		SET image = ?
		WHERE
		 username = ?;
	`;
	return knex.raw(rawQuery, [imageURL, email]);
}


function uploadImage(imageInfo){
	return cloudinary.uploader.upload(imageInfo);
}

function imageUpload(call, callback) {
	uploadImage(call.request.image_base_64).then((image)=>{
		return storeUserImageURL(call.request.email, image.url).then(() => {
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
	imageUpload,
};