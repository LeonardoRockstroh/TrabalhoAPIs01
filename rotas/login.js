const express = require('express');
const logincontroller = require('../controller/login_controller')

const router = express.Router();

router.post('/', logincontroller.validarUser);

module.exports = router;