'use strict';

const expect = require('chai').expect;
const service = require('./petbnb-client');


describe('test getUserTransaction endpoints', () => {
  xit('gets right response message', (done) => {
    service.connect().then(
      client => client.getUserTransaction({uid:43}, (err, response) => {
        for(var j=0; j< response.transactions.length; j++){
            console.log("-----------------------------------------------------------------------------------------------SingleTransaction");
//             console.log("--------------------------------------------petid");
//              console.log(response.transactions[j].transacinfo.petid); 
//              console.log("--------------------------------------------pets");
//              console.log(response.transactions[j].pets); 
            console.log("--------------------------------------------transacinfo");
             console.log(response.transactions[j].transacinfo); 
//             console.log("--------------------------------------------sitter");
//              console.log(response.transactions[j].sitter); 
//             console.log("--------------------------------------------onwer");
//              console.log(response.transactions[j].owner); 
            console.log("--------------------------------------------rate");
             console.log(response.transactions[j].rate); 
         }
     
      
//        console.log("--------------------------------------------");
//        console.log(response);
//         expect(err).to.be.equal(null);
//         expect(response.success).to.equal(true);
        done();
      }));
  });
});


