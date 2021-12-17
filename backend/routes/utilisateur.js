const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateur');

const multer = require('../middleware/multer-config');

router.post('/signup', multer, utilisateurCtrl.signup);



module.exports = router;
