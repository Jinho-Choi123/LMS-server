const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');

const registerMiddleware = (req, res, next) => {
    const userid = req.body.userId;
    const userpassword = req.body.userPassword;
    const isstudent = req.body.isStudent;

    User.findOne({ userId: userid }).exec()
        .then((data) => {
            if (data != null) {
                return res.json({ msg: "user Id already exists", success: false });
            } else {
                crypto.pbkdf2(userpassword, (process.env.PASSWORD_HASH_SALT).toString('base64'), parseInt(process.env.PASSWORD_HASH_ITER), 64, 'sha512', (err, key) => {
                    const user = new User({
                        userId: userid,
                        userPassword: key.toString('base64'),
                        isStudent: isstudent,
                        lectureIn: []
                    })
                    user.save((err, product) => {
                        res.json({
                            msg: "Register success",
                            success: true
                        })
                    });
                })

            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                msg: "Register failed",
                success: false
            })
            throw err;
        })



}

module.exports = registerMiddleware;