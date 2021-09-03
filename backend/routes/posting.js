const express     = require('express');
const router      = express.Router();
const postingCtrl = require('../controllers/posting');
const auth        = require('../middleware/auth');
const multer        = require('../middleware/multer')


router.get('/',                     auth, postingCtrl.getAllPostings);
router.get('/by/:id',               auth, postingCtrl.getAllPostingsBy);
router.get('/:id',                  auth, postingCtrl.getOnePosting);
router.get('/by/:id/:idPosting',    auth, postingCtrl.getOnePostingBy);
router.post('/',                    auth, multer, postingCtrl.createPosting);
router.put('/by/:id/:idPosting',    auth, postingCtrl.modifyPosting);
router.delete('/by/:id/:idPosting', auth, postingCtrl.deletePosting);

module.exports = router;