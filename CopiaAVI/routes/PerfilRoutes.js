const express = require('express');
const router = express.Router();
const PerfilController = require('../controllers/PerfilController');
const verificarToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/perfilaspirante', verificarToken, PerfilController.obtenerPerfil);
router.patch('/perfilaspirante/editar', verificarToken, upload.single('foto'), PerfilController.actualizarPerfil);

module.exports = router;
