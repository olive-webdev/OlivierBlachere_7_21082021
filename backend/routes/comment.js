const express     = require('express');
const router      = express.Router();
const commentCtrl = require('../controllers/comment');
const auth        = require('../middleware/auth');


// router.get('/',                     auth, commentCtrl.getAllcomments);
// router.get('/by/:id',               auth, commentCtrl.getAllcommentsBy);
// router.get('/:id',                  auth, commentCtrl.getOnecomment);
// router.get('/by/:id/:idcomment',    auth, commentCtrl.getOnecommentBy);
router.post('/',                    auth, commentCtrl.createComment);
// router.put('/by/:id/:idcomment',    auth, multer, commentCtrl.modifycomment);
router.delete('/by/:id/:idcomment', auth, commentCtrl.deleteComment);

module.exports = router;