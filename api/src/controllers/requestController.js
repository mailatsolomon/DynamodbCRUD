const { request } = require("express");

// Utils
const dynamoDb = require("../utils/dynamodb");
const {localeTimeZone,getCurrentTime,defaultFormat} = require("../utils/dateformat");
const {tableCompany,scanActiveCompanies,updateCompanyDetails} = require("../utils/queries");

// Entity
const companyEntity = require("../entities/companyDetailsEntity");
const errorReturnsEntity = require("../entities/errorReturnsEntity");
const successfulReturnsEntity = require("../entities/successfulReturnsEntity");

/* save Company */
async function addCompany(req, res) {
    let isAdmin = req.userId;
    var contactPerson = "";
    var contactDetails = "";
    contactPerson = req.body.contact_person;
    contactDetails = req.body.contact_details;
  
    try {
      if (isAdmin) {
 
        if (!req.body.company_name || !req.body.company_description) {
          return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
        }
  
        companyEntity.companyId = getCurrentTime;
        companyEntity.createdAt = localeTimeZone;
        companyEntity.companyName = req.body.company_name;
        companyEntity.companyDescription = req.body.company_description;
        companyEntity.contactPerson = contactPerson;
        companyEntity.contactDetails = contactDetails;
        companyEntity.isActive = 0;
        companyEntity.updatedAt = localeTimeZone;
  
        var result = await insertCompany(companyEntity).then(async (data) => {
          res.status(200).json(successfulReturnsEntity.companySuccessfullyAdded);
        });
      }
    } catch (error) {
      return res.status(400).json({ code: 1, message: error.message });
    }
}
  
/* get Company */
async function getCompanyList(req, res) {
    let isAdmin = req.userId;
  
    try {
      if (isAdmin) {
        var result = await getCompanies().then(async (data) => {
          if (data.Items) {
            return res.status(200).json({ code: 0, result: data.Items });
          } else {
            return res.status(401).json(errorReturnsEntity.failedRetrieveData);
          }
        });
      }
    } catch (error) {
      return res.status(400).json({ code: 1, message: error.message });
    }
}

/* update Company */
async function updateCompany(req, res) {
    let isAdmin = req.userId;
    var contactPerson = "";
    var contactDetails = "";
    contactPerson = req.body.contact_person;
    contactDetails = req.body.contact_details;
  
    try {
      if (isAdmin) {
 
        if (!req.body.company_name || !req.body.company_description) {
          return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
        }
  
        companyEntity.companyName = req.body.company_name;
        companyEntity.companyDescription = req.body.company_description;
        companyEntity.contactPerson = contactPerson;
        companyEntity.updatedAt = localeTimeZone;
  
        var result = await updateCompany(companyEntity).then(async (data) => {
          res.status(200).json(successfulReturnsEntity.companySuccessfullyAdded);
        });
      }
    } catch (error) {
      return res.status(400).json({ code: 1, message: error.message });
    }
}

/* delete Company */
async function deleteCompany(req, res) {
    let isAdmin = req.userId;

    try {
      if (isAdmin) {
 
        let { company_id } = req.body;
        if (!company_id) {
          return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
        }
        let params = {
          ...tableUsers,
          Key: {
            companyId: company_id,
          },
        };
        let deleteUserDynamo = await dynamoDb.delete(params).then(async (data) => {
          res.status(200).json(successfullyDeleteTheRecord);
        });
      }
    } catch (error) {
      return res.status(400).json({ code: 1, message: error.message });
    }
}

/* Insert Company*/
async function insertCompany(params) {
    var companyDetails = {
      ...tableCompany,
      Item: params,
    };
    return dynamoDb.put(companyDetails, function (err, data) {
      if (err) {
       return err
      } else {
        console.log(`Entry Added!`);
      }
    });
}

/* get CompanyList Table*/
async function getCompanies() {
    var companyData = scanActiveCompanies();
    return dynamoDb
      .scan(companyData)
      .promise()
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return err;
      });
}

async function updateCompany(data) {
    var params = updateCompanyDetails(data);
  
    var resl = await dynamoDb
      .update(params)
      .promise()
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        console.error("Update Status err", err);
      });
}

module.exports = {
    addCompany,
    getCompanyList,
    deleteCompany,
    updateCompany
  };
  