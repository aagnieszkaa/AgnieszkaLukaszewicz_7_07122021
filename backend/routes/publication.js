const express = require('express');
const router = express.Router();

const publicationCtrl = require('../controllers/publication');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');



router.post('/savePublication', auth, multer.single("post_image"), publicationCtrl.savePublication);
router.put('/modifyPublication/:id', auth, multer.single("post_image"), publicationCtrl.modifyPublication);
router.delete('/deletePublication/:id', auth, publicationCtrl.deletePublication);
router.get('/getListOfMemes', auth, publicationCtrl.getListOfMemes);
router.get('/getOneMeme/:id', auth, publicationCtrl.getOneMeme);
/*
router.post('/login', maxLoggin.limiter, utilisateurCtrl.login);
router.put('/deleteUser/:id', auth, utilisateurCtrl.deleteUser);
router.put('/modifyUser/:id', auth, multer.single("profil_image"), utilisateurCtrl.modifyUser);
router.get('/infos/:id', auth, utilisateurCtrl.infos);
*/
module.exports = router;