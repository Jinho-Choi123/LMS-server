const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const checkUserIdMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    const userid = req.query.userId;

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

        User.findOne(token.payload)
            .then((data) => {
                if (data === null) return res.status(403).json({
                    success: false,
                    msg: 'no such user'
                })
                else {
                    if(data.userId === userid) next();
                    else return res.status(403).json({
                        success: false,
                        msg: 'no such user'
                    })

                }
            })
            .catch((err) => {
                throw err;
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

module.exports = checkUserIdMiddleware;