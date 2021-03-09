const AWS = require ("../lib/aws");

const dynamoDb = new AWS.DynamoDB.DocumentClient
( {
    region:'ap-southeast-1'
})

module.exports= dynamoDb;
