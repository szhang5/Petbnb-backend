'use strict';
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


function uploadImage(imageInfo){
	cloudinary.v2.uploader.upload(imageInfo, 
  	function(error, result) {
  		console.log(result, error); 
  		const imageURL = cloudinary.url(result.public_id, eager_options);
  		console.log(imageURL);
  	});
}

function imageUpload(call, callback) {
	console.log(call);
	return uploadImage(call.request.image_base_64).then(() => {
		return callback(null, {
			success: true,
		});
	}, (err) => {
		callback(err, null);
	}).catch((err) => {
		callback(err, null);
	})
}

module.exports = {
	imageUpload,
};