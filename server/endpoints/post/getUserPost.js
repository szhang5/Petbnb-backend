'use strict';

const knex = require('../../models/knex');


function getPostByUserId(uid) {
//   console.log("testInfo:-----------------------------:");
//   console.log(uid);
  const rawQuery = `
  SELECT * FROM post WHERE sitterid = ?;
  `;
  return knex.raw(rawQuery, [uid]);
}

function getUserPost(call, callback) {
  return getPostByUserId(call.request.uid).then((result) => {
//     console.log("testInfo:-----------------------------:"+call.request.uid);
    callback(null, {
      success: true,
      post: {
        sitterid: result.rows[0].sitterid,
        postdate: result.rows[0].postdate,
        avai_start_date: result.rows[0].avai_start_date,
        avai_end_date: result.rows[0].avai_end_date,
        description: result.rows[0].description,
        pet_type: result.rows[0].pet_type,
        hour_rate: result.rows[0].hour_rate,
        pets_num: result.rows[0].pets_num,
      },
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })
}

module.exports = {
  getUserPost,
};