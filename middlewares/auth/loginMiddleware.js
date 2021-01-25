const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const verify = (password, hash) => {
    const hash_ = crypto.pbkdf2Sync(password, (process.env.PASSWORD_HASH_SALT).toString('base64'), parseInt(process.env.PASSWORD_HASH_ITER), 64, 'sha512').toString('base64');
    return hash_ === hash;
}

const loginMiddleware = (req, res, next) => {
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;
    // User.findOne({userId:userid}).exec()
    // .then(data =>{
    //     console.log(data.isStudent)
    //     var isstudent = data.isStudent;
    //     //console.log(isstudent);
    //     if (verify(userpassword.toString('base64')), data.userPassword.toString('base64')) {
    //         return new Promise((resolve, reject) => {
    //             jwt.sign({
    //                     userId: userid,
    //                     isStudent: isstudent
    //                 },
    //                 process.env.JWT_SECRET, {
    //                     expiresIn: '24h',
    //                     issuer: "zinos.xyz",
    //                     subject: 'userInfo'
    //                 }, (err, token) => {
    //                     if (err) reject(err)
    //                     else {
    //                         resolve(token, isstudent)
    //                     }
    //                 })
    //         })
    //     } 
    //     else {
    //         return res.json({
    //             msg: "Login failed",
    //             success: false
    //         })
    //     }

    // })
    // .then((token, isstudent) =>{
    //     console.log("check",isstudent)
    // })
    // .catch(err =>{throw err;})

    const check = (data) => {
        if (data === null) {
            return res.json({ msg: 'No such Id or password', success: false });
        } else {
            var isstudent = data.isStudent
            //console.log(isstudent, userid,userpassword)
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
                            else {
                                console.log(token)
                                console.log("check0",isstudent)
                                resolve({isstudent, token})
                            }
                        })
                })
            } else {
                return res.json({
                    msg: "Login failed",
                    success: false
                })
            }
        }
    }

    const respond = ({isstudent, token}) => {
        console.log("check1",isstudent)
        console.log("check2",token)
        return res.json({
            msg: "login success",
            success: true,
            jwt: token,
            isStudent: isstudent
        })
    }

    const onError = (err) => {
        throw err;
    }


    User.findOne({ userId: req.body.userId })
        .then(check)
        .then(respond)
        .catch(onError)

    // User.findOne({ userId: req.body.userId }).exec()
    // .then(data =>{check(data)})
    // .then((token, isstudent) =>{respond(token, isstudent)})
    // .catch(onError)
}

module.exports = loginMiddleware;