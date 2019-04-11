'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test payTransaction endpoints', () => {
  it('gets right response message', (done) => {
    service.connect().then(
      client => client.payTransaction({transacid:105}, (err, response) => {
        done();
      }));
  });
});


