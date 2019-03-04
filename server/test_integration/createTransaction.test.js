'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test createTransaction endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.createTransaction({petid: 13, sitterid:5, startdate: "2019-01-16", 
      	enddate:"2019-09-15"}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
// INSERT INTO transaction (petid, ownerid  , sitterid, startdate, enddate) VALUES(13, (select pet.uid from pet where pet.petid = 13), 5, '2019-01-16', '2019-02-16');