'use strict';

const knex = require('../../models/knex');


function findPostByUserId(uid) {
  const rawQuery = `
  SELECT * FROM post WHERE sitterid = ?
  `;
  return knex.raw(rawQuery, [uid]);
}

function getPost(call, callback) {
  return findPostByUserId(call.request.uid).then((result) => {
    // console.log(result);
    const listPosts = [];
    result.rows.forEach(row => {
    	listPosts.push({
        image: row.image,
        postdate: row.postdate,
        avai_start_date: row.avai_start_date,
        avai_end_date: row.avai_end_date,
        description: row.description,
        pet_type: row.pet_type,
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
  getPost,
};