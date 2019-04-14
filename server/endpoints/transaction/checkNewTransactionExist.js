'use strict';

const knex = require('../../models/knex');


function getNewTransaction(uid) {
  const newTransaction = `
    SELECT count(is_new) as count
    FROM transaction
    WHERE is_new = true and sitterid=?
  `;

  return knex.raw(newTransaction, [uid])
}

async function updateTransaction(uid) {
  // console.log("uid", uid);
  const query = `
    UPDATE transaction
    SET is_new = false
    WHERE is_new = true and sitterid=?
  `;
  // console.log("uid", query);
  return await knex.raw(query, [uid])
}


function checkNewTransactionExist(call, callback) {
  return getNewTransaction(call.request.uid).then((result) => {
    const newTransactionCount = result.rows[0].count;
    if (newTransactionCount > 0) {
      updateTransaction(call.request.uid);
    }
    callback(null, {
      newTransactionCount,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })//return
}

module.exports = {
  checkNewTransactionExist,
};