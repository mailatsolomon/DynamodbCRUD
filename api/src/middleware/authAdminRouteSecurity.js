const AWS = require('aws-sdk');
const cognito = require('../utils/cognitoAuth');
const dynamoDb = require('../utils/dynamodb');
const errorReturnsEntity = require('../entities/errorReturnsEntity');
const { queryUserByUserId } = require('../utils/queries');
const userType = require('../utils/userType');

module.exports = async function(req, res, next){

	let token = req.header('access_token');
	if (!token) {
		    return res.status(401).json(errorReturnsEntity.accessTokenRequired);
	}
	try {
		    let user_params = { AccessToken: token };
		    let result = await cognito.getUser(user_params).promise();
		    let queryData = await queryUserByUserId(result);
		    let { Item } = await dynamoDb.get(queryData).promise();
		
		    // Admin userType access only.
		    if (Item.userType === userType.Admin) {
			    req.userId = Item.userId;
			    req.fullName = Item.fullName
			    next();
		    }
		    else {
			    res.status(401).json(errorReturnsEntity.onlyAdminCanAccess);
		    }
		    
	} catch (error) {
    		console.log(error.message)
    		if (error.message == "Access Token has expired") {
    			return res.status(400).json(errorReturnsEntity.sessionExpired);
    		}
    		if (error.message == "Access Token has been revoked") {
    			return res.status(400).json(errorReturnsEntity.invalidToken);
    		}
    		if (error.message == "Invalid Access Token") {
    			return res.status(400).json(errorReturnsEntity.invalidToken);
    		} else {
    			return res.status(400).json({ code: 1, message: error.message });
    		}
	}
};
