const jwt = require('jsonwebtoken');

const requestAuthCode = (req, res, next) => {
	let queryString = require('query-string');
	const stringifiedParams = queryString.stringify({
	  client_id:  process.env.CLIENT_ID,
	  redirect_uri: 'https://localhost:3000/auth/google/callback',
	  scope: [
	    'https://www.googleapis.com/auth/userinfo.email',
	    'https://www.googleapis.com/auth/userinfo.profile',
	  ].join(' '), // space seperated string
	  response_type: 'code',
	  access_type: 'offline',
	  prompt: 'consent',
	});

	req.googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
	next();
}

const requestTokenID = (req, res, next) => {
	const url = require('url'); 
	const urlParams = url.parse(req.url, true).query;
	let authCode;
    if (urlParams.error) {
    console.log(`An error occurred: ${urlParams.error}`);
    } else {
    authCode = urlParams.code
    }


  	const options = {
	    method: 'POST', 
	    url: 'https://oauth2.googleapis.com/token',
	    headers: {'content-type': 'application/x-www-form-urlencoded'},
	    form: {
	      grant_type: 'authorization_code',
	      client_id:  process.env.CLIENT_ID,
	      client_secret:  process.env.CLIENT_SECRET,
	      code: authCode,
	      redirect_uri: 'https://localhost:3000/auth/google/callback'
	    }
 	};

	const request = require("request");
 	request(options, (error, res) => {
		if (error) throw new Error(error);
		req.tokenID = JSON.parse(res.body).id_token;
		req.access_token = JSON.parse(res.body).access_token;
		req.refresh_token = JSON.parse(res.body).refresh_token;
		var decoded = jwt.decode(req.tokenID);
		console.log(decoded);
		next();
	});
}



module.exports = {
	requestAuthCode,
	requestTokenID
}