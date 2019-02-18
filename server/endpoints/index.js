'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;
const editProfile = require('./user/editProfile').editProfile;
const getPost = require('./post/getPost').getPost;
const getUserPost = require('./post/getUserPost').getUserPost;
const createPost = require('./post/createPost').createPost;
const searchPost = require('./post/searchPost').searchPost;
const imageUpload = require('./imageUpload').imageUpload;
const getPetInfo = require('./pet/getPetInfo').getPetInfo;
const createPet = require('./pet/createPet').createPet;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
	editProfile,
	getPost,
	getUserPost,
	createPost,
	searchPost,
	imageUpload,
	getPetInfo,
	createPet,
}

module.exports = exportedEndpoints;
