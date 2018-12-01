'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test createPost endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.createPost({uid: 3, postdate:"2018-12-01", avai_start_date: "2019-01-16", avai_end_date:"2019-09-15", description:"test!", pet_type: "both", hour_rate:30.0, pets_num: 2}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
