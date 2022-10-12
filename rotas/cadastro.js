const express = require('express');
const cadastrocontroller = require('../controller/cadastro_controller')

const router = express.Router();

router.post('/', cadastrocontroller.inserir);
router.get('/', cadastrocontroller.listar)

module.exports = router;