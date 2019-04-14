'use strict';

const knex = require('../../models/knex');

async function getTransacDays(transacid) {
    let rawInsertQuery = `
    select date_part('day',(SELECT avai_end_date  FROM transaction WHERE transaction.transacid = ?)-(SELECT avai_start_date  FROM transaction WHERE transaction.transacid = ?))  ;
    `; 
    let result = await knex.raw(rawInsertQuery, [transacid, transacid]);
    let days = result.rows[0].date_part  ;
    return days;
}

async function getTotalRate(transacid, rate){
    let days = await getTransacDays(transacid);
    let totalRate = days * rate;

    console.log(totalRate);
    return totalRate;
    
}


async function findTransaction(uid) {
    
  const rawQuery = `
  SELECT trans.transacid AS transacid ,trans.status AS status, trans.avai_start_date AS avai_start_date ,
  trans.avai_end_date AS avai_end_date ,trans.description AS description ,trans.pet_type AS pet_type,trans.hour_rate AS hour_rate,
  trans.pets_num AS pets_num , cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,
  owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, 
  owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, 
  owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,
  sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, 
  sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, 
  sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, 
  pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  
  FROM transaction trans,
  currentSittingPet cur, 
  usertable sitter, usertable owner, pet 
  WHERE (ownerid = ? or sitterid = ?) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid 
  AND cur.petid = pet.petid 
  order by status, transacid;
  `;
  return knex.raw(rawQuery, [uid, uid]);
}

async function getTransactionList(uid){
  let result = await findTransaction(uid);
  let resultArray = []; 
   result.rows.forEach(row => {
       resultArray.push(row);
    })//for each row
   let transacidArray = []; 
   let transactionArray = []; 
    
  for(var i=0; i< resultArray.length; i++){
      if(transacidArray.includes( resultArray[i].transacid) ){
          for(var j=0; j< transactionArray.length; j++){
              if(resultArray[i].transacid == transactionArray[j].transacinfo.transacid){
                 transactionArray[j].transacinfo.petid.push(resultArray[i].petid);
                  let pet = {
                      petid : resultArray[i].petid,
                      uid : resultArray[i].ownerid,
                      birth : resultArray[i].birth,
                      furcolor : resultArray[i].furcolor,
                      type : resultArray[i].type,
                      petname : resultArray[i].petname,
                      weight : resultArray[i].weight,
                      breed : resultArray[i].breed,
                      image : resultArray[i].image
                   };//pet
                  transactionArray[j].pets.push(pet);
              }//if
          }//for
      }else{
          transacidArray.push(resultArray[i].transacid);
          let tempPetid = [];
          tempPetid.push(resultArray[i].petid);
          let transacinfo = {
              transacid : resultArray[i].transacid,
              ownerid : resultArray[i].ownerid,
              sitterid : resultArray[i].sitterid,
              status : resultArray[i].status,// status	(- 0 Sitter未选择， 1 Sitter已经接受， 2 Sitting已paid,  3被Sitter拒绝，)
              avai_start_date : resultArray[i].avai_start_date,
              avai_end_date : resultArray[i].avai_end_date,
              description : resultArray[i].description,
              pet_type : resultArray[i].pet_type,
              hour_rate : resultArray[i].hour_rate,
              pets_num : resultArray[i].pets_num,
              petid : tempPetid
          };
          let owner = {
              uid : resultArray[i].ownerid,
              personid : 0,
              email : resultArray[i].ownerusername,
              firstname : resultArray[i].ownerfirstname,
              lastname : resultArray[i].ownerlastname,
              phone : resultArray[i].ownerphone,
              country : resultArray[i].ownercountry,
              street : "0",
              city : resultArray[i].ownercity,
              state : resultArray[i].ownerstate,
              zip : resultArray[i].ownerzip,
              image : resultArray[i].ownerimage,
              lat : 0,
              lng : 0,
              user_type : resultArray[i].owneruser_type,//(owner) 1   (sitter) 0
              balance : 0
          };//owner
          let sitter = {
              uid : resultArray[i].sitterid,
              personid : 0,
              email : resultArray[i].sitterusername,
              firstname : resultArray[i].sitterfirstname,
              lastname : resultArray[i].sitterlastname,
              phone : resultArray[i].sitterphone,
              country : resultArray[i].sittercountry,
              street : "0",
              city : resultArray[i].sittercity,
              state : resultArray[i].sitterstate,
              zip : resultArray[i].sitterzip,
              image : resultArray[i].sitterimage,
              lat : 0,
              lng : 0,
              user_type : resultArray[i].sitteruser_type,//(sitter) 1   (sitter) 0
              balance : 0
          };//sitter
          let pet = {
              petid : resultArray[i].petid,
              uid : resultArray[i].ownerid,
              birth : resultArray[i].birth,
              furcolor : resultArray[i].furcolor,
              type : resultArray[i].type,
              petname : resultArray[i].petname,
              weight : resultArray[i].weight,
              breed : resultArray[i].breed,
              image : resultArray[i].image
           };//pet
          let tempPet = [];
          tempPet.push(pet);

          let rateTotal = await getTotalRate(transacinfo.transacid, transacinfo.hour_rate);

          let rateTotal = await getTotalRate(transacinfo.transacid, transacinfo.hour_rate);

          let singleTransaction = {
                 owner : owner,
                 sitter : sitter,
                 transacinfo : transacinfo,
                 pets : tempPet,
                 rate : rateTotal
           }//single transaction
          transactionArray.push(singleTransaction);
      }//if else
//       console.log(transactionArray);
      }//for
    
    return transactionArray;
}

function getUserTransaction(call, callback) {
  return getTransactionList(call.request.uid).then((result) => {
    callback(null, {
      success: true,
      transactions: result,
    });
  }, (err) => {
    callback(err, null);
  }).catch((err) => {
    callback(err, null);
  })//return
}

module.exports = {
  getUserTransaction,
};