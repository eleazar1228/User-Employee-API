const { config } = require('dotenv');
const express = require('express')
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles');

//handles multiple http methods for empoloyee route
router.route('/')
    .get(employeesController.getAllEmployees) 
    .post(verifyRoles.verifyRoles(ROLES_LIST.ROLES_LIST.Admin, ROLES_LIST.ROLES_LIST.Editor),employeesController.createNewEmoployee)
    .put(verifyRoles.verifyRoles(ROLES_LIST.ROLES_LIST.Admin, ROLES_LIST.ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles.verifyRoles(ROLES_LIST.ROLES_LIST.Admin) ,employeesController.deleteEmployee)

router.route('/:id')//parameter in url requesst
    .get(employeesController.getEmployee)

module.exports = router;