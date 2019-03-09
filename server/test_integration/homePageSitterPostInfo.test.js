'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test homePageSitterPostInfo endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.homePageSitterPostInfo({}, (err, response) => {
    	console.log("Array length:");
    	console.log(response.sitterPostInfo.length);
    	console.log("First element in list:"); //read the respong directly if you want;
          
    	console.log("uid:"+response.sitterPostInfo[0].uid); //read the respong directly if you want;
    	console.log("personid:"+response.sitterPostInfo[0].personid); //read the respong directly if you want;
    	console.log("email:"+response.sitterPostInfo[0].email); //read the respong directly if you want;
    	console.log("firstname:"+response.sitterPostInfo[0].firstname); //read the respong directly if you want;
    	console.log("lastname:"+response.sitterPostInfo[0].lastname); //read the respong directly if you want;
    	console.log("phone:"+response.sitterPostInfo[0].phone); //read the respong directly if you want;
    	console.log("country:"+response.sitterPostInfo[0].country); //read the respong directly if you want;
    	console.log("street:"+response.sitterPostInfo[0].street); //read the respong directly if you want;
    	console.log("city:"+response.sitterPostInfo[0].city); //read the respong directly if you want;
    	console.log("state:"+response.sitterPostInfo[0].state); //read the respong directly if you want;
    	console.log("zip:"+response.sitterPostInfo[0].zip); //read the respong directly if you want;
    	console.log("image:"+response.sitterPostInfo[0].image); //read the respong directly if you want;
    	console.log("lat:"+response.sitterPostInfo[0].lat); //read the respong directly if you want;
    	console.log("lng:"+response.sitterPostInfo[0].lng); //read the respong directly if you want;
    	console.log("user_type:"+response.sitterPostInfo[0].user_type); //read the respong directly if you want;
    	console.log("balance:"+response.sitterPostInfo[0].balance); //read the respong directly if you want;
    	console.log("sitterid:"+response.sitterPostInfo[0].sitterid); //read the respong directly if you want;
    	console.log("postdate:"+response.sitterPostInfo[0].postdate); //read the respong directly if you want;
    	console.log("avai_start_date:"+response.sitterPostInfo[0].avai_start_date); //read the respong directly if you want;
    	console.log("avai_end_date:"+response.sitterPostInfo[0].avai_end_date); //read the respong directly if you want;
    	console.log("description:"+response.sitterPostInfo[0].description); //read the respong directly if you want;
    	console.log("pet_type:"+response.sitterPostInfo[0].pet_type); //read the respong directly if you want;
    	console.log("hour_rate:"+response.sitterPostInfo[0].hour_rate); //read the respong directly if you want;
    	console.log("pets_num:"+response.sitterPostInfo[0].pets_num); //read the respong directly if you want;
        expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});
