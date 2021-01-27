const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const checkIsProf = (req, res, next) => {
    const userid = req.query.userId

    User.findOne({ userId: userid, isStudent: false }, (err, data) => {
        if (err) throw err;
        else {
            if(data === null) {
                res.status(403).json({
                    success: false,
                    msg: "not a professor"
                })
            } else {
                next();
            }
        }
    })


}

module.exports = checkIsProf;