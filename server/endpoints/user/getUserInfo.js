'use strict';

const knex = require('../../models/knex');


function findUserByUsername(email) {
  const rawQuery = `
  SELECT * FROM usertable WHERE username = ?
  `;
  return knex.raw(rawQuery, [email]);
}

function getUserInfo(call, callback) {
  return findUserByUsername(call.request.email).then((result) => {
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
          image: result.rows[0].image,
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
  getUserInfo,
};