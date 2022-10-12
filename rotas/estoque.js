const express = require('express');
const estoquecontroller = require('../controller/estoque_controller')

const router = express.Router();

router.post('/', estoquecontroller.baixa);
router.get('/', estoquecontroller.historico)

module.exports = router;