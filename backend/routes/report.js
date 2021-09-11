const express  = require('express');
const router   = express.Router();
const reportCtrl = require('../controllers/report');
const auth     = require('../middleware/auth');

router.post('/posting/:postingId', auth, reportCtrl.reportPosting);
// router.post('/comment/:commentId', auth, reportCtrl.reportComment);
router.get('/', auth, reportCtrl.getAllReports);
router.delete('/posting/:postingId', auth, reportCtrl.deleteReport);
// router.delete('/comment/:commentId', auth, reportCtrl.reportComment);

module.exports = router;