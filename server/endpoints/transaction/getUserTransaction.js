'use strict';

const knex = require('../../models/knex');

function findTransaction(uid) {
    
  const rawQuery = `
  SELECT trans.transacid AS transacid ,trans.status AS status, cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  FROM transaction trans, currentSittingPet cur, usertable sitter, usertable owner, pet WHERE (ownerid = ? or sitterid = ?) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid AND cur.petid = pet.petid order by status;
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
    result.rows.forEach(row => {
      if(lastTransacid == -1){
          lastTransacid = row.transacid; }//if
      if(row.transacid == lastTransacid){
          petsid.push(row.petid); }//if
      if(row.transacid != lastTransacid){
          var temp = new Set(petsid);
          tempPetsid = Array.from(temp);
          petsid.splice(0,petsid.length);//reset petsid array
          petsid.push(row.petid);
      }//if
        transacinfo = {
              transacid : lastTransacid,
              ownerid : row.ownerid,
              sitterid : row.sitterid,
              status : row.status,// status	(- 0 Sitter未选择， 1 Sitter已经接受， 2 Sitting已paid,  3被Sitter拒绝，)
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
//              console.log("--------------------------------- 1");//test code
//              console.log(transacinfo.transacid);//test code
//              console.log(transacinfo.ownerid);//test code
//              console.log(transacinfo.sitterid);//test code
//              console.log(transacinfo.status);//test code
//              console.log(transacinfo.petid);//test code
//              console.log( pets.length);//test code
             singleTransaction = {
                 owner : owner,
                 sitter : sitter,
                 transacinfo : transacinfo,
                 pets : pets
             }
             userTransactions.push(singleTransaction);
             pets.splice(0,pets.length);//reset petsid array
         }//push into callback list
      pets.push(pet);
      lastOnwerid = row.ownerid;
      lastSitterid = row.sitterid;
      lastStatus = row.status;
      lastTransacid = row.transacid;
    })//forEachRow

    transacinfo = {
              transacid : lastTransacid,
              ownerid : lastOnwerid,
              sitterid : lastSitterid,
              status : lastStatus,// status	(- 0 Sitter未选择， 1 Sitter已经接受， 2 Sitting已paid,  3被Sitter拒绝，)
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