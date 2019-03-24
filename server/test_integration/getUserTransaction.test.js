'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getUserTransaction endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getUserTransaction({uid:43}, (err, response) => {
      	console.log(response.transactions); //read the respong directly if you want;
//        console.log("--------------------------------------------");
//        console.log(response.transactions[1]);
//         expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});

//1.0版
// SELECT trans.transacid AS transacid ,trans.status AS status, cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  FROM transaction trans, currentSittingPet cur, usertable sitter, usertable owner, pet WHERE (ownerid = ? or sitterid = ?) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid AND cur.petid = pet.petid order by status;

//2.0
// SELECT trans.transacid AS transacid ,trans.status AS status, trans.avai_start_date AS avai_start_date ,trans.avai_end_date AS avai_end_date ,trans.description AS description ,trans.pet_type AS pet_type,trans.hour_rate AS hour_rate,trans.pets_num AS pets_num , cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  FROM transaction trans, currentSittingPet cur, usertable sitter, usertable owner, pet WHERE (ownerid = 43 or sitterid = 43) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid AND cur.petid = pet.petid order by status;


// SELECT trans.transacid AS transacid ,trans.status AS status, trans.avai_start_date AS avai_start_date ,trans.avai_end_date AS avai_end_date ,trans.description AS description ,trans.pet_type AS pet_type,trans.hour_rate AS hour_rate,trans.pets_num AS pets_num , cur.petid AS petid , sitter.uid AS sitterid , owner.uid AS ownerid ,owner.username AS ownerusername,owner.firstname AS ownerfirstname, owner.lastname AS ownerlastname, owner.phone AS ownerphone, owner.country AS ownercountry, owner.city AS ownercity, owner.state AS ownerstate, owner.zip AS ownerzip, owner.image AS ownerimage, owner.user_type AS owneruser_type, sitter.uid AS sitterid ,sitter.username AS sitterusername,sitter.firstname AS sitterfirstname, sitter.lastname AS sitterlastname, sitter.phone AS sitterphone, sitter.country AS sittercountry, sitter.city AS sittercity, sitter.state AS sitterstate, sitter.zip AS sitterzip, sitter.image AS sitterimage, sitter.user_type AS sitteruser_type , pet.birth AS birth, pet.furcolor AS furcolor, pet.type AS type, pet.petname AS petname, pet.weight AS weight, pet.breed AS breed, pet.image AS image  FROM transaction trans, currentSittingPet cur, usertable sitter, usertable owner, pet WHERE (ownerid = 43 or sitterid = 43) AND cur.transacid= trans.transacid AND ownerid = owner.uid AND sitterid = sitter.uid AND cur.petid = pet.petid order by status;