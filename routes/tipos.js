const express = require('express')
const router = express.Router()
const tiposController = require('../controllers/tiposController')

router.get('/', tiposController.index)
router.get('/crear', tiposController.crear)
router.get('/editar/:id', tiposController.editar)
router.post('/eliminar/:id', tiposController.eliminar)
router.post('/guardar', tiposController.guardar)
router.post('/actualizar', tiposController.actualizar)
router.get('/comparacion', tiposController.comparacion)
router.post('/resultados', tiposController.resultados)
//router.get('/comparacionfecha', horariosController.comparacionfecha)
//router.post('/resultados2', horariosController.resultados2)


module.exports = router