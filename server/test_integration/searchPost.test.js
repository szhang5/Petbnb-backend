'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test searchPost endpoints', () => {
  xit('gets right response message', (done) => {
    service.connect().then(
      client => client.searchPost({pet_type: "cat", hour_rate:15.0, pets_num: 3, avai_start_date: "2018-12-01", avai_end_date:"2018-12-31"}, (err, response) => {
//       	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
