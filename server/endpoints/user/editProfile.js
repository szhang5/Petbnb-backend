'use strict';

const knex = require('../../models/knex');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCUQjqXLGPcvOkrxO_0MNh_HouBRwlxqwA',
  Promise: Promise,
});

function insertUserInfo({firstname, lastname, email, phone, country, street, city, state, zip, lat, lng}) {
	const rawInsertQuery = `
		UPDATE usertable
		SET firstname = ?,
		    lastname = ?,
		    phone = ?,
		    country = ?,
		    street = ?,
		    city = ?,
		    state = ?,
		    zip = ?,
		    latitude = ?,
		    longitude = ?
		WHERE
		 username = ?;
	`;
	return knex.raw(rawInsertQuery, [firstname, lastname, phone, country, street, city, state, zip, lat, lng, email]);
}

function getGeoLocation({street, city, state, zip}){
	const address = street + "," + city + "," + state;
	// console.log(address);
	return googleMapsClient.geocode({address: address })
	  .asPromise();
}

function editProfile(call, callback) {
		const userInfo = {
			'firstname': call.request.firstname,
			'lastname': call.request.lastname,
			'email': call.request.email,
			'phone': call.request.phone,
			'country': call.request.country,
			'street': call.request.street,
			'city': call.request.city,
			'state': call.request.state,
			'zip': call.request.zip,
		};
	getGeoLocation(userInfo).then((response)=>{
		const userInfoWithLatLng = {
			...userInfo,
			'lat': response.json.results[0].geometry.location.lat,
			'lng': response.json.results[0].geometry.location.lng,
		};
		return insertUserInfo(userInfoWithLatLng).then(() => {
				return callback(null, {
				success: true,
				user: {
					// userid: call.request.uid,
	    //   			personid: call.request.personid,
					email: call.request.email,
					firstname: call.request.firstname,
					lastname: call.request.lastname,
					phone: call.request.phone,
					country: call.request.country,
					street: call.request.street,
					city: call.request.city,
					state: call.request.state,
					zip: call.request.zip,
					image: call.request.image,
					lat: userInfoWithLatLng.lat,
					lng: userInfoWithLatLng.lng,
					}
				});
			}, (err) => {
				callback(err, null);
			}).catch((err) => {
				callback(err, null);
			})
		});
	}

module.exports = {
	editProfile,
};
