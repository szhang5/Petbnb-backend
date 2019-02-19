'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test editPet endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
//         petid , uid , birth  , furcolor ,  type , petname, weight, breed ,image
      client => client.editPet({petid:23 , birth:"2019-01-09"  , furcolor:"Yellow mix black" ,  type:"dog" , petname:"Pupuppy II", weight:"Small", breed:"Teddy" ,image:""}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
