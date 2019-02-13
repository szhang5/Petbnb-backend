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



function storeImageURL(email, imageURL){
	const rawQuery = `
	UPDATE usertable
		SET image = ?
		WHERE
		 username = ?;
	`;
	return knex.raw(rawQuery, [imageURL, email]);
}


function uploadImage(imageInfo){
	cloudinary.uploader.upload(imageInfo, 
  	function(error, result) {
  		console.log(result, error); 
  		return result.url;
  	});
}

function imageUpload(call, callback) {
	// console.log(call);
	uploadImage(call.request.image_base_64).then((image)=>{
		return storeImageURL(call.request.email, image).then(() => {
			return callback(null, {
				success: true,
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