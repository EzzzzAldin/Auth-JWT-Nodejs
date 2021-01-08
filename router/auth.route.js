const router = require('express').Router();
// Import Function Controller
const authController = require('../controller/auth.controller');

router.post('/register', authController.postRegister);

router.post('/login', authController.postLogin);




module.exports = router;