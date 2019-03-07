'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test searchPostSitterInfo endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.searchPostSitterInfo({pet_type: "cat", hour_rate:15.0, pets_num: 3, avai_start_date: "2018-12-01", avai_end_date:"2019-03-31"}, (err, response) => {
      	console.log(response.user[0]); //read the respong directly if you want;
        expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});
// select * from usertable, (SELECT * FROM post WHERE TRUE AND position('cat' in  pet_type)>0 AND pets_num <= 3  AND avai_end_date >= '2019-03-31' AND avai_start_date <= '2018-12-01') S where S.sitterid = usertable.uid order by S.sitterid;