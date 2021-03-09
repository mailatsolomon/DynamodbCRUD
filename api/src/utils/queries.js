const TABLE = require('../utils/tables');

const tableCompany = {
	...TABLE.COMPANY,
};
const scanActiveCompanies = (params) => {
	return {
		ExpressionAttributeNames  : { '#A': 'isActive' },
		ExpressionAttributeValues : { ':a': '1' },
		...TABLE.COMPANY,
		FilterExpression          : '#A = :a',
		ProjectionExpression      :
			'companyId,createdAt,companyName,companyDescription,isActive,contactPerson,contactDetails,updatedAt',
	};
};
const updateCompanyDetails = (params) => {
	return {
		ExpressionAttributeNames  : { '#CN':'companyName','#CD': 'companyDescription', '#U': 'updatedAt','#CP' : 'contactPerson' },
		ExpressionAttributeValues : {  ':cn':params.companyName,':cd': params.companyDescription, ':cp' : params.contactPerson, ':u' : params.updatedAt },
		Key                       : {
			companyId: params.companyId
		},
		ReturnValues              : 'UPDATED_NEW',
		...TABLE.REQUESTSPARENT,
		UpdateExpression          : 'SET #CN = :cn, #CD = :cd, #U = :u, #CP =:cp',
	};
};
const queryUserByUserId = (params) => {
	return {
		...tableUsers,
		Key : {
			userId : params.Username,
		},
	};
};
module.exports = {
    tableCompany,
    scanActiveCompanies,
    updateCompanyDetails,
    queryUserByUserId
};
