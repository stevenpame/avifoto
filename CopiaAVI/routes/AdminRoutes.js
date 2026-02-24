const AdminController = require('../controllers/AdminController');
const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get("/admins", AdminController.getAdmin);
router.patch("/admins/:id", AdminController.actualizarAdmin);
router.patch("/admins/:id/status", AdminController.cambiarEstadoAdmin);
router.patch("/admins/:id/perfil", verificarToken, upload.single('foto'), AdminController.actualizarPerfilAdmin);

module.exports = router;
