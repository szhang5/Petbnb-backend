'use strict';

function sayHello(call, callback) {
  const response = {
  	message: 'Hello ' + call.request.name,
  };

  callback(null, response);
}

module.exports = {
	sayHello,
};
