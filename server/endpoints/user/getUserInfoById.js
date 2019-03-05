'use strict';

const knex = require('../../models/knex');


function findUserByUid(uid) {
  const rawQuery = `
  SELECT * FROM usertable WHERE uid = ?
  `;
  return knex.raw(rawQuery, [uid]);
}

function getUserInfoById(call, callback) {
  return findUserByUid(call.request.uid).then((result) => {
    // console.log(result);
    if (result.rowCount) {
      callback(null, {
        success: true,
        user: {
          uid: result.rows[0].uid,
          personid: result.rows[0].personid,
          email: result.rows[0].username,
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          phone: result.rows[0].phone,
          country: result.rows[0].country,
          street: result.rows[0].street,
          city: result.rows[0].city,
          state: result.rows[0].state,
          zip: result.rows[0].zip,
          lat: result.rows[0].latitude,
          lng: result.rows[0].longitude,
          image: result.rows[0].image,
          user_type: result.rows[0].user_type,
          balance: result.rows[0].balance,
        }
      });
    } else {
      callback(err, null);
    }
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getUserInfoById,
};