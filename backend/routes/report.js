const express  = require('express');
const router   = express.Router();
const reportCtrl = require('../controllers/report');
const auth     = require('../middleware/auth');

router.post('/posting/:postingId', auth, reportCtrl.reportPosting);
router.get('/', auth, reportCtrl.getAllReports)
router.delete('/posting/:postingId', auth, reportCtrl.deleteReport)
module.exports = router;