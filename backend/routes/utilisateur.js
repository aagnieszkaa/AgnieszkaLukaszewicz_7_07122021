const express = require('express');
const router = express.Router();
const maxLoggin = require('../middleware/limit');

const utilisateurCtrl = require('../controllers/utilisateur');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');



router.post('/signup', multer, utilisateurCtrl.signup);
router.post('/login', maxLoggin.limiter, utilisateurCtrl.login);
/*router.put('/modifyUser', multer, utilisateurCtrl.modifyUser);*/
router.put('/deleteUser/:id', auth, utilisateurCtrl.deleteUser);
router.get('/infos/:id', auth, multer, utilisateurCtrl.infos);


module.exports = router;
