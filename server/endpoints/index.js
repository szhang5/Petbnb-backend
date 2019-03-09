'use strict';

const signIn = require('./user/signIn').signIn;
const register = require('./user/register').register;
const getUserInfo = require('./user/getUserInfo').getUserInfo;
const getUsersGeoLocation = require('./user/getUsersGeoLocation').getUsersGeoLocation;
const editProfile = require('./user/editProfile').editProfile;
const getPost = require('./post/getPost').getPost;
const getUserPost = require('./post/getUserPost').getUserPost;
const searchPost = require('./post/searchPost').searchPost;
const editPost = require('./post/editPost').editPost;
const imageUpload = require('./imageUpload').imageUpload;
const getPetInfo = require('./pet/getPetInfo').getPetInfo;
const getPetInfoById = require('./pet/getPetInfoById').getPetInfoById;
const createPet = require('./pet/createPet').createPet;
const editPet =  require('./pet/editPet').editPet;
const petImageUpload =  require('./pet/petImageUpload').petImageUpload;
const deletePet =  require('./pet/deletePet').deletePet;
const createTransaction = require('./transaction/createTransaction').createTransaction;
const getUserInfoById = require('./user/getUserInfoById').getUserInfoById;
const searchPostSitterInfo = require('./user/searchPostSitterInfo').searchPostSitterInfo;
const homePageSitterPostInfo = require('./homePageSitterPostInfo').homePageSitterPostInfo;

const exportedEndpoints = {
	signIn,
	register,
	getUserInfo,
	getUsersGeoLocation,
	editProfile,
	getPost,
	getUserPost,
	searchPost,
	imageUpload,
	getPetInfo,
	createPet,
	editPet,
	petImageUpload,
	getPetInfoById,
	deletePet,
	editPost,
	createTransaction,
	getUserInfoById,
	searchPostSitterInfo,
	homePageSitterPostInfo,
}

module.exports = exportedEndpoints;
