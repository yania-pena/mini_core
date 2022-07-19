const express = require('express')
const router = express.Router()
const pasesController = require('../controllers/pasesController')

router.get('/', pasesController.index)
router.get('/crear', pasesController.crear)
router.get('/editar/:id', pasesController.editar)
router.post('/eliminar/:id', pasesController.eliminar)
router.post('/guardar', pasesController.guardar)
router.post('/actualizar', pasesController.actualizar)
router.get('/comparacionfecha', pasesController.comparacionfecha)
router.post('/resultados2', pasesController.resultados2)
module.exports = router