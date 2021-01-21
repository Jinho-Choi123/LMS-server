const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const checkMiddleware = (req, res, next) => {
    console.log("check Middleware");
    res.send("check middleware");
}

module.exports = checkMiddleware;