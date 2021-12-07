const express = require('express');
const router = express.Router();

const utilisateurCtrl = require('../controllers/utilisateur');

router.post('/signup', utilisateurCtrl.signup);

module.exports = router;
