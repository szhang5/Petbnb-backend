'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getpost endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.getPost({uid:13}, (err, response) => {
      	console.log(response); //read the respong directly if you want;
        expect(err).to.be.equal(null);
        expect(response.success).to.equal(true);
    		expect(response.post[0]).to.have.property('postdate');
    		expect(response.post[0]).to.have.property('avai_start_date');
    		expect(response.post[0]).to.have.property('avai_end_date');
    		expect(response.post[0]).to.have.property('description');
    		expect(response.post[0]).to.have.property('pet_type');
	        expect(response.post[0]).to.have.property('hour_rate');
	        expect(response.post[0]).to.have.property('pets_num');
	        done();
      }));
  });
});
