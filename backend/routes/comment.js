const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');


router.post('/saveComment', auth, commentCtrl.saveComment);
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment);
router.get('/getListOfComments', auth, commentCtrl.getListOfComments);

module.exports = router;