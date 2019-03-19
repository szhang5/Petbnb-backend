'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');

var date = new Date();
console.log("---------------------------------------------------");
describe('test createTransaction endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.createTransaction({petid: [86,87,46], sitterid:50, ownerid:5 }, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      })
    );//then
  });
});
