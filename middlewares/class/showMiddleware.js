const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');

const showMiddleware = (req, res, next) => {
    console.log("req", req.body)
    const isStudent = req.body.isStudent;
    const userId = req.body.userId

    User.findOne({ userId: userId }, (err, data) => {
            if (err) throw err;
            if (isStudent) {
                res.json({ classes: data.lectureIn, msg: 'success', success: true })
            } else {
                res.json({
                    msg: err.message,
                    success: false
                })
            }

        })
        .catch((err) => {
            res.json({
                msg: err.message,
                success: false
            })
        })


}

module.exports = showMiddleware;