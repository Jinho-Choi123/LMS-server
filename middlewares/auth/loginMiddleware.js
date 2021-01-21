const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const verify = (password, hash) => {
    const hash_ = crypto.pbkdf2Sync(password, (process.env.PASSWORD_HASH_SALT).toString('base64'), 90194, 64, 'sha512').toString('base64');
    return hash_ === hash;
}

const loginMiddleware = (req, res, next) => {
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;
    const isstudent = req.body.isStudent;

    const check = (data) => {
        if (data == null) {
            res.json({ msg: "No such Id or password", success: false });
        } else {
            if (verify(userpassword.toString('base64')), data.userPassword.toString('base64')) {
                return new Promise((resolve, reject) => {
                    jwt.sign({
                            userId: userid,
                            isStudent: isstudent
                        },
                        process.env.JWT_SECRET, {
                            expiresIn: '24h',
                            issuer: "zinos.xyz",
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            else resolve(token)
                        })
                })
            } else {
                res.json({
                    msg: "Login failed",
                    success: false
                })
            }
        }
    }

    const respond = (token) => {
        return res.json({
            msg: "login success",
            success: true,
            jwt: token
        })
    }

    const onError = (err) => {
        return res.json({
            msg: err.message,
            success: false
        })
    }


    User.findOne({ userId: userid, isStudent: isstudent })
        .then(check)
        .then(respond)
        .catch(onError)
}

module.exports = loginMiddleware;