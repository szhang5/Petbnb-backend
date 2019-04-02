'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getSitterInfoById endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getSitterInfoById({uid:40}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});
