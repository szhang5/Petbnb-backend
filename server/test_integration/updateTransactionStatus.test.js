'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');

// console.log("---------------------------------------------------");
describe('test updateTransactionStatus endpoints', () => {
  xit('gets right response message', (done) => {
    service.connect().then(
      client => client.updateTransactionStatus({transacid:96, status:0 }, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      })
    );//then
  });
});
