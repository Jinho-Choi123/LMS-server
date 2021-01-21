const Class = require('../../db/models/Class');
const crypto = require('crypto');
const dotenv = require('dotenv');

const verify = (password, hash) => {
    const hash_ = crypto.pbkdf2Sync(password, (process.env.JOIN_PASSWORD_HASH_SALT).toString('base64'), parseInt(process.env.JOIN_PASSWORD_HASH_ITER), 64, 'sha512').toString('base64');
    return hash_ === hash;
}

const joinMiddleware = (req, res, next) => {
    const userid = req.body.userId;
    const joinpassword = req.body.joinPassword;
    const classname = req.body.className;

    const check = (data) => {
        if (data === null) {
            return res.json({ msg: "No such class or already registered", success: false });
        } else {
            if (verify(joinpassword.toString('base64'), data.joinPassword.toString('base64'))) {
                Class.updateOne({ className: classname, classId: data.classId }, { $push: { students: userid } }, (err, data) => {
                    if (err) throw err;
                    else res.json({
                        msg: "Joined class",
                        success: true
                    })
                })
            } else {
                res.json({
                    msg: "Failed to join group",
                    success: false
                })
            }
        }
    }

    Class.findOne({ className: classname, students: { $ne: userid } })
        .then(check)
        .catch((err) => { throw err });
}

module.exports = joinMiddleware;