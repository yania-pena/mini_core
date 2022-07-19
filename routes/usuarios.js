const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')

router.get('/', usuariosController.index)
router.get('/crear', usuariosController.crear)
router.get('/editar/:id', usuariosController.editar)
router.post('/eliminar/:id', usuariosController.eliminar)
router.post('/guardar', usuariosController.guardar)
router.post('/actualizar', usuariosController.actualizar)
module.exports = router