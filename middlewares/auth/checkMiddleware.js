const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const checkMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "not logged in"
        })
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })

    const respond = (token) => {
        User.findOne(token.payload, (err, data) => {
            if (err) throw err;
            else {
                if (data === null) return res.status(403).json({
                    success: false,
                    msg: 'no such user'
                })
                else {
                    next();
                    // res.json({
                    //     success: true,
                    //     msg: "success"
                    // })
                }
            }
        })
    }

    const onError = (err) => {
        res.status(403).json({
            success: false,
            msg: err.message
        })
    }

    p
        .then(respond)
        .catch(onError)

}

module.exports = checkMiddleware;