'use strict';

const knex = require('../../models/knex');


function findPost(pet_type="both", hour_rate=Number.MAX_VALUE, pets_num=Number.MAX_VALUE, avai_start_date='2000-0-0', avai_end_date='2100-0-0') {
  const rawQuery = `
  SELECT * FROM post WHERE pet_type = ? AND hour_rate <= ? AND pets_num <= ? AND avai_start_date >= ? AND avai_end_date <= ?
  `;

  return knex.raw(rawQuery, [pet_type, hour_rate, pets_num, avai_start_date, avai_end_date]);
}

function searchPost(call, callback) {
  return findPost(call.request.pet_type, call.request.hour_rate, call.request.pets_num, call.request.avai_start_date, call.request.avai_end_date).then((result) => {
    // console.log(result);
    const listPosts = [];
    result.rows.forEach(row => {
    	listPosts.push({
        postdate: row.postdate,
        avai_start_date: row.avai_start_date,
        avai_end_date: row.avai_end_date,
        description: row.description,
        pet_type: row.pet_type,
        hour_rate: row.hour_rate,
        pets_num: row.pets_num,
      })  
    })
    callback(null, {
      success: true,
      post: listPosts,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  searchPost,
};