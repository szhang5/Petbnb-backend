'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getUserTransaction endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getUserTransaction({uid:50}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
//        console.log("--------------------------------------------");
//        console.log(response.transactions[1]);
//         expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});

