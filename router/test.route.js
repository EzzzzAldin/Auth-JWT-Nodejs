const router = require('express').Router();
// Import Function Controller
const testContollet = require('../controller/test.contoller');
const verify = require('../controller/validation/verifyToken');

router.get('/', verify.authToken, testContollet.getPosts)




module.exports = router;