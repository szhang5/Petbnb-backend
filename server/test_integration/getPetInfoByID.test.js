'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');

describe('test getPetInfoByID endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getPetInfoById({petid: 19}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
//         expect(response.petname).to.equal(pet22);
//         expect(response.furcolor).to.equal(Bronze);
        done();
      }));
  });
});