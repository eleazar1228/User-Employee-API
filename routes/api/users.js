const { config } = require('dotenv');
const express = require('express')
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list')
const userController = require('../../controllers/usersController')
const verifyRoles = require('../../middleware/verifyRoles');



router.route('/')
.get(userController.getAllUsers) 
.delete(verifyRoles.verifyRoles(ROLES_LIST.ROLES_LIST.Admin), userController.deleteUser)



module.exports = router;