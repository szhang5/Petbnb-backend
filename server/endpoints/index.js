'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;
const editProfile = require('./user/editProfile').editProfile;
const getPost = require('./post/getPost').getPost;
const createPost = require('./post/createPost').createPost;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
	editProfile,
	getPost,
	createPost,
}

module.exports = exportedEndpoints;
