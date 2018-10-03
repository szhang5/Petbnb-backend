'use strict';

const sayHello = require('./hello/sayHello').sayHello;
const sayHelloAgain = require('./hello/sayHelloAgain').sayHelloAgain;

const exportedEndpoints = {
	sayHello,
	sayHelloAgain,
}

module.exports = exportedEndpoints;
