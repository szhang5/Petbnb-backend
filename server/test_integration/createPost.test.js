'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test createPost endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.createPost({uid: 1, image: "https://www.wedandbeyond.com/images/user/icons/user.svg", postdate:"2018-12-01", avai_start_date: "2018-12-01", avai_end_date:"2018-12-31", description:"I love cat!", pet_type: "cat"}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
        done();
      }));
  });
});
