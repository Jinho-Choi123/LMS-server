const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Class = require('../../../db/models/Class');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        const assignmentid = req.body.assignmentId;
        fs.mkdirSync(`${__dirname}/../../../public/${classid}/submit/${assignmentid}`);
        callback(null, `${__dirname}/../../../public/${classid}/submit/${assignmentid}`);
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;

        //store data in DB
        const userid = req.body.userId;

        let today = new Date();
        const lastsubmittime = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString();

        const submit = {
            userId: userid,
            fileName: filename,
            lastSubmitTime: lastsubmittime
        }

        Class.updateOne({ classId: req.query.classId }, { $push: { submitStatus: submit } })
            .then(

                callback(null, storename)

            )
            .catch(
                res.json({
                    success: false,
                    msg: "Submit failed. Plz try again"
                })
            )

    }
})

let upload = multer({
    storage: storage
})

const submitMiddleware = upload.fields({ name: 'assignment' });
const submit2Middleware = (req, res, next) => {
    res.json({
        msg: "Submit success"
    })
}

module.exports = submitMiddleware;