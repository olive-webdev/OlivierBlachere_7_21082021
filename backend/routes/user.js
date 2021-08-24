const express       = require('express');
const router        = express.Router();
const userCtrl      = require('../controllers/user');
const passwordValid = require('../middleware/passwordValid');
const emailValid    = require('../middleware/emailValid');
const auth          = require('../middleware/auth');

router.post('/signup', emailValid, passwordValid, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;