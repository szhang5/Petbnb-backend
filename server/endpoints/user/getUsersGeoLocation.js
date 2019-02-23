'use strict';

const knex = require('../../models/knex');


function getAllUsers() {
  const rawQuery = `
  SELECT uid, user_type, latitude, longitude
  FROM usertable;
  `;
  return knex.raw(rawQuery);
}

function getUsersGeoLocation(call, callback) {
  return getAllUsers().then((result) => {
    console.log(result);
    const listGeoLocation = [];
    result.rows.forEach(row => {
    	listGeoLocation.push(
      {
        uid: row.uid,
        user_type: row.user_type,
        lat: row.latitude,
        lng: row.longitude,
      })  
    })
    callback(null, {
      success: true,
      geoLocation: listGeoLocation,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getUsersGeoLocation,
};