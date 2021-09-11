const express  = require('express');
const router   = express.Router();
const likeCtrl = require('../controllers/like');
const auth     = require('../middleware/auth');

router.post('/posting/:postingId', auth, likeCtrl.likePosting);
router.post('/comment/:commentId', auth, likeCtrl.likeComment);

module.exports = router;