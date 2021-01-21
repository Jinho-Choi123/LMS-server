var express = require('express');
var router = express.Router();

const loginMiddleware = require('../middlewares/auth/loginMiddleware');
const registerMiddleware = require('../middlewares/auth/registerMiddleware');
const checkMiddleware = require('../middlewares/auth/checkMiddleware');

router.post('/login', loginMiddleware);

router.post('/register', registerMiddleware);

router.post('/check', checkMiddleware);

module.exports = router;