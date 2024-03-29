const express = require('express');
const router = express.Router();
const maxLoggin = require('../middleware/limit');

const utilisateurCtrl = require('../controllers/utilisateur');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');



router.post('/signup', multer.single("profil_image"), utilisateurCtrl.signup);
router.post('/login', maxLoggin.limiter, utilisateurCtrl.login);
router.put('/deleteUser/:id', auth, utilisateurCtrl.deleteUser);
router.put('/modifyUser/:id', auth, multer.single("profil_image"), utilisateurCtrl.modifyUser);
router.get('/infos/:id', auth, utilisateurCtrl.infos);

module.exports = router;
