const express = require('express');
const router = express.Router();
const {
    addCompany,
    getCompanyList,
    deleteCompany,
    updateCompany
} = require('../../../controllers/requestController');
const authAdmin = require('../../../middleware/authAdminRouteSecurity');

// Save Company
router.post('/addCompany', authAdmin, (req, res) => addCompany(req, res));
// Update Company
router.post('/updateCompany', authAdmin, (req, res) => updateCompany(req, res));
// Delete Company
router.post('/deleteCompany', authAdmin, (req, res) => deleteCompany(req, res));
// Get Company lit
router.get('/getCompanyList', authAdmin, (req, res) => getCompanyList(req, res));

module.exports = router;
