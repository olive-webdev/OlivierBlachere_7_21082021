const express  = require('express');
const router   = express.Router();
const likeCtrl = require('../controllers/report');
const auth     = require('../middleware/auth');

router.post('/posting/:postingId', auth, likeCtrl.reportPosting);

// router.get('/comment/:commentId', auth, likeCtrl.likeComment);

module.exports = router;