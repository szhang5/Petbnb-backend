'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
}

module.exports = exportedEndpoints;
