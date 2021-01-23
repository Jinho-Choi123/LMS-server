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

        const submit = {
            userId: userid,
            fileName: filename,
            lastSubmitTime: today
        }

        // Class.updateOne({ classId: req.query.classId }, { $push: assignments.${ submitStatus: submit } })
        //     .then(

        //         callback(null, storename)

        //     )
        //     .catch(
        //         (err) => {
        //             throw err;
        //         }
        //     )

        Class.findOneAndUpdate({ classId: classid }, {
                $push: { submitStatus: submit }
            }, {
                new: true,
                select: assignments
            })
            .then(callback(null, storename))
            .catch((err) => { throw err; })
    }
})

let upload = multer({
    storage: storage
})

const submitMiddleware = upload.fields({ name: 'assignment' });

module.exports = submitMiddleware;