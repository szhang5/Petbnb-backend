'use strict';

const knex = require('../../models/knex');


function findPostByUserId() {
  const rawQuery = `
  SELECT postdate, avai_start_date, avai_end_date, description, pet_type,
    hour_rate, pets_num
  FROM post ORDER BY postdate DESC;
  `;
  return knex.raw(rawQuery);
}

function getPost(call, callback) {
  return findPostByUserId().then((result) => {
    // console.log(result);
    const listPosts = [];
    result.rows.forEach(row => {
    	listPosts.push(
      {
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
      post: listPosts,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getPost,
};