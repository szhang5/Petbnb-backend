'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;
const editProfile = require('./user/editProfile').editProfile;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
	editProfile,
}

module.exports = exportedEndpoints;
