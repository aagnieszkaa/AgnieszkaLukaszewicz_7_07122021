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

module.exports = router;