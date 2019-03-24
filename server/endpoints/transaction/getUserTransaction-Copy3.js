'use strict';

const knex = require('../../models/knex');

function findTransaction(uid) {
    
  const rawQuery = `
  SELECT trans.transacid AS transacid ,trans.status AS status, trans.avai_start_date AS avai_start_date ,trans.avai_end_date AS avai_end_date ,trans.description AS description ,trans.pet_type AS pet_type,trans.hour_rate AS hour_rate,trans.pets_num AS pets_num , cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  FROM transaction trans, currentSittingPet cur, usertable sitter, usertable owner, pet WHERE (ownerid = ? or sitterid = ?) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid AND cur.petid = pet.petid order by status;
  `;
  return knex.raw(rawQuery, [uid, uid]);
}


function getUserTransaction(call, callback) {
  return findTransaction(call.request.uid).then((result) => {
    const userTransactions = [];
    var singleTransaction;
    var lastTransacid = -1;
    const petsid = [];
    const pets = [];
    var pet;
    var tempPetsid;
    var owner;
    var sitter;
    var transacinfo;
    var lastOnwerid;
    var lastSitterid;
    var lastStatus;
    var lastAvai_start;
    var lastAvai_end;
    var lastDescription;
    var lastPet_type;
    var lastHour_rate;
    var lastPets_num;
      
    result.rows.forEach(row => {
      if(lastTransacid == -1){
          lastTransacid = row.transacid; }//if
      if(row.transacid == lastTransacid){
          petsid.push(row.petid);
          var temp = new Set(petsid);
          tempPetsid = Array.from(temp);}//if
      if(row.transacid != lastTransacid){
          var temp = new Set(petsid);
          tempPetsid = Array.from(temp);
          petsid.splice(0,petsid.length);//reset petsid array
          petsid.push(row.petid);
          var tempPets = pets.slice(0);
           singleTransaction = {
                 owner : owner,
                 sitter : sitter,
                 transacinfo : transacinfo,
                 pets : tempPets
           }
          userTransactions.push(singleTransaction);
      }//if
        transacinfo = {
              transacid : row.transacid,
              ownerid : row.ownerid,
              sitterid : row.sitterid,
              status : row.status,// status	(- 0 Sitter未选择， 1 Sitter已经接受， 2 Sitting已paid,  3被Sitter拒绝，)
              avai_start_date : row.avai_start_date,
              avai_end_date : row.avai_end_date,
              description : row.description,
              pet_type : row.pet_type,
              hour_rate : row.hour_rate,
              pets_num : row.pets_num,
              petid : tempPetsid
          };
      owner = {
              uid : row.ownerid,
              personid : 0,
              email : row.ownerusername,
              firstname : row.ownerfirstname,
              lastname : row.ownerlastname,
              phone : row.ownerphone,
              country : row.ownercountry,
              street : "0",
              city : row.ownercity,
              state : row.ownerstate,
              zip : row.ownerzip,
              image : row.ownerimage,
              lat : 0,
              lng : 0,
              user_type : row.owneruser_type,//(owner) 1   (sitter) 0
              balance : 0
          };//owner
          sitter = {
              uid : row.sitterid,
              personid : 0,
              email : row.sitterusername,
              firstname : row.sitterfirstname,
              lastname : row.sitterlastname,
              phone : row.sitterphone,
              country : row.sittercountry,
              street : "0",
              city : row.sittercity,
              state : row.sitterstate,
              zip : row.sitterzip,
              image : row.sitterimage,
              lat : 0,
              lng : 0,
              user_type : row.sitteruser_type,//(sitter) 1   (sitter) 0
              balance : 0
          };//sitter
          pet = {
              petid : row.petid,
              uid : row.ownerid,
              birth : row.birth,
              furcolor : row.furcolor,
              type : row.type,
              petname : row.petname,
              weight : row.weight,
              breed : row.breed,
              image : row.image
           };//pet
         
         if(row.transacid != lastTransacid){
             pets.splice(0,pets.length);//reset petsid array
         }//push into callback list
      pets.push(pet);
      lastOnwerid = row.ownerid;
      lastSitterid = row.sitterid;
      lastStatus = row.status;
      lastTransacid = row.transacid;
      lastAvai_start = row.avai_start_date;
      lastAvai_end = row.avai_end_date;
      lastDescription = row.description;
      lastPet_type = row.pet_type;
      lastHour_rate = row.hour_rate;
      lastPets_num = row.pets_num;
      
    })//forEachRow

    transacinfo = {
              transacid : lastTransacid,
              ownerid : lastOnwerid,
              sitterid : lastSitterid,
              status : lastStatus,// status	(- 0 Sitter未选择， 1 Sitter已经接受， 2 Sitting已paid,  3被Sitter拒绝，)
              avai_start_date : lastAvai_start,
              avai_end_date : lastAvai_end,
              description : lastDescription,
              pet_type : lastPet_type,
              hour_rate : lastHour_rate,
              pets_num : lastPets_num,
              petid : petsid
      };

    singleTransaction = {
                 owner : owner,
                 sitter : sitter,
                 transacinfo : transacinfo,
                 pets : pets
             }
    userTransactions.push(singleTransaction);
    callback(null, {
      success: true,
      transactions: userTransactions,
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