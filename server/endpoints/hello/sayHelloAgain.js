'use strict';

function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello again, ' + call.request.name, userid: 222});
}

module.exports = {
	sayHelloAgain,
};
