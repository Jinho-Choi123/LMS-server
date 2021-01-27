var express = require('express');
var router = express.Router();

const loginMiddleware = require('../middlewares/auth/loginMiddleware');
const registerMiddleware = require('../middlewares/auth/registerMiddleware');

router.post('/login', loginMiddleware);

router.post('/register', registerMiddleware);

module.exports = router;