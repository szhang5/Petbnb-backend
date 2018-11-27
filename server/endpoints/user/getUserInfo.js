'use strict';

function getUserInfo(call, callback) {
  // console.log(call.request)
  const response = {
  	success: true,
  	user: {
  		'userid': 121212,
  		'name': 'shiyun',
  		'email': call.request.email,
  	}
  };

  callback(null, response);
}

module.exports = {
	getUserInfo,
};
