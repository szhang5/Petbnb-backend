'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getpet endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getPet({petid: 2, uid: 2, birth:"2018-12-01", furcolor:"yellow", type: "dog", petname: "pika", weight: 34, breed:"", image:""}, (err, response) => {
      	// console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
    		expect(response.pet[0]).to.have.property('petid');
    		expect(response.pet[0]).to.have.property('uid');
    		expect(response.pet[0]).to.have.property('birth');
    		expect(response.pet[0]).to.have.property('furcolor');
    		expect(response.pet[0]).to.have.property('type');
        expect(response.pet[0]).to.have.property('petname');
        expect(response.pet[0]).to.have.property('weight');
        expect(response.pet[0]).to.have.property('breed');
        expect(response.pet[0]).to.have.property('image');
        done();
      }));
  });
});