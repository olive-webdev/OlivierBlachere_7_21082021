const express     = require('express');
const router      = express.Router();
const commentCtrl = require('../controllers/comment');
const auth        = require('../middleware/auth');

router.post('/',                    auth, commentCtrl.createComment);
router.delete('/by/:id/:idcomment', auth, commentCtrl.deleteComment);

module.exports = router;