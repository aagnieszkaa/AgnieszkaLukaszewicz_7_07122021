const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');


router.post('/saveComment', auth, commentCtrl.saveComment);
router.put('/modifyComment/:id', auth, commentCtrl.modifyComment);
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment);
router.get('/getOneComment/:id', auth, commentCtrl.getOneComment);

module.exports = router;