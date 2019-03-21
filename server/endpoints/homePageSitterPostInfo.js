'use strict';

const knex = require('../models/knex');


function allSitterPost() {
  const rawQuery = `
  SELECT p.* , u.*
  FROM post p, usertable u WHERE p.sitterid = u.uid ORDER BY p.postdate DESC;
  `;
  return knex.raw(rawQuery);
}
function homePageSitterPostInfo(call, callback) {
  return allSitterPost().then((result) => {
    // console.log(result);
    const listSitterPosts = [];
    result.rows.forEach(row => {
    	listSitterPosts.push(
      {
        uid: row.uid,
        personid: row.personid,
        email: row.email,
        firstname: row.firstname,
        lastname: row.lastname,
        phone: row.phone,
        country: row.country,
        street: row.street,
        city: row.city,
        state: row.state,
        zip: row.zip,
        image: row.image,
        lat: row.lat,
        lng: row.lng,
        user_type: row.user_type,//(owner) 1   (sitter) 0
        balance: row.balance,
        sitterid: row.sitterid,
        postdate: row.postdate,
        avai_start_date: row.avai_start_date,
        avai_end_date: row.avai_end_date,
        description: row.description,
        pet_type: row.pet_type,
        hour_rate: row.hour_rate,
        pets_num: row.pets_num,
      }
      )  
    })
    callback(null, {
      success: true,
      sitterPostInfo: listSitterPosts,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  homePageSitterPostInfo,
};