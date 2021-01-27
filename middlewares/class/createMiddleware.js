const Class = require('../../db/models/Class');
const crypto = require('crypto');
const dotenv = require('dotenv');

const createMiddleware = (req, res, next) => {
    console.log(req)
    const instructor = req.body.userId;
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let today = new Date();
    const classid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(40);
    const classname = req.body.className;
    const lecturedate = req.body.lectureDate;

    Class.findOne({ className: classname }, (err, data) => {
        if (err) throw err;
        if (data != null) { return res.json({ msg: "className already exists", success: false }); } else {
            console.log(req);
            crypto.pbkdf2(req.body.joinPassword, (process.env.JOIN_PASSWORD_HASH_SALT).toString('base64'), parseInt(process.env.JOIN_PASSWORD_HASH_ITER), 64, 'sha512', (err, key) => {
                const joinpassword = key.toString('base64');
                const class_ = new Class({
                    instructor: instructor,
                    classId: classid,
                    className: classname,
                    student: [],
                    joinPassword: joinpassword,
                    lectureDate: lecturedate,
                    notices: [],
                })
                class_.save()
                    .then(() => {
                        res.json({
                            msg: "creating class success",
                            success: true
                        })
                    })
                    .catch((err) => {
                        res.json({
                            msg: err.message,
                            success: false
                        })
                    })
                    
            })
        }
    })


}

module.exports = createMiddleware;