'use strict';

function sayHello(call, callback) {
  console.log(call.request);
  const response = {
  	message: 'Hello ' + call.request.name,
  };

  callback(null, response);
}

module.exports = {
	sayHello,
};
