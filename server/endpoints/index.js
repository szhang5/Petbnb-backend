'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;
const getUsersGeoLocation = require('./user/getUsersGeoLocation').getUsersGeoLocation;
const editProfile = require('./user/editProfile').editProfile;
const getPost = require('./post/getPost').getPost;
const getUserPost = require('./post/getUserPost').getUserPost;
const createPost = require('./post/createPost').createPost;
const searchPost = require('./post/searchPost').searchPost;
const imageUpload = require('./imageUpload').imageUpload;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
	getUsersGeoLocation,
	editProfile,
	getPost,
	getUserPost,
	createPost,
	searchPost,
	imageUpload,
}

module.exports = exportedEndpoints;
