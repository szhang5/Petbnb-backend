'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');
describe('test editPost endpoints', () => {
  xit('gets right response message', (done) => {
    service.connect().then(
      client => client.editPost({ sitterid:"40", postdate:"2018-04-15", avai_start_date: "2018-04-19", 
      	avai_end_date:"2020-05-10", description:"Carrot is all my life!", pet_type: "dog,cat", 
      	hour_rate:30.0, pets_num:2}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
