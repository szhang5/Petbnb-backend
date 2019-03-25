'use strict';

const knex = require('../../models/knex');


function findPost(pet_type, hour_rate, pets_num, avai_start_date, avai_end_date) {
  let avai_start_date_condition = '';
  let avai_end_date_condition = '';
  let hour_rate_condition = '';
  let pets_num_condition = '';
  let pet_type_condition = '';

  if (avai_start_date) {
    avai_start_date_condition = `AND avai_start_date <= '${avai_start_date}'`;
  }
  if (avai_end_date) {
    avai_end_date_condition = `AND avai_end_date >= '${avai_end_date}'`;
  }
  if (hour_rate) {
      if(hour_rate == 20){
          hour_rate_condition = `AND hour_rate <= ${hour_rate}`;
         }
      if(hour_rate == 50){
          hour_rate_condition = `AND hour_rate >= 20 AND hour_rate <= ${hour_rate}`;
         }
      if(hour_rate == 100){
          hour_rate_condition = `AND hour_rate >= 50 AND hour_rate <= ${hour_rate}`;
         }
  } 
  if (pets_num) {
    if(pets_num == 0){
        pets_num_condition = `AND pets_num <= 3`;
    }
    if(pets_num > 0){
        pets_num_condition = `AND pets_num <= ${pets_num}`;
    }
  }
  if (pet_type) {
    pet_type_condition = `AND position('${pet_type}' in  pet_type)>0`;
  }
  const rawQuery = `
  SELECT p.* , u.* FROM post p, usertable u WHERE TRUE ${pet_type_condition} ${pets_num_condition} ${hour_rate_condition} ${avai_end_date_condition} ${avai_start_date_condition} AND  p.sitterid = u.uid ORDER BY p.postdate DESC;
  `;
//   SELECT p.* , u.*
//   FROM post p, usertable u WHERE p.sitterid = u.uid ORDER BY p.postdate DESC;
  return knex.raw(rawQuery);
}

function searchPostAndSitterInfo(call, callback) {
  // console.log(call.request)
  return findPost(call.request.pet_type, call.request.hour_rate, call.request.pets_num, call.request.avai_start_date, call.request.avai_end_date).then((result) => {
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
      })  
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
  searchPostAndSitterInfo,
};