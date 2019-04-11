'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');

describe('test createTransaction endpoints', () => {
  xit('gets right response message', (done) => {
    service.connect().then(
      client => client.createTransaction({petid: [86,46,87], sitterid:53, avai_start_date:"2019-05-09 18:30:00", avai_end_date:"2019-06-01 18:30:00"}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      })
    );//then
  });
});
