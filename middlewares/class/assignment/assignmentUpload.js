const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('./../../../db/models/Assignment');


let assignmentStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        const assignmentid = req.body.assignmentId;
        fs.mkdirSync(`${__dirname}/../../../public/${classid}/submit/${assignmentid}/`, { recursive: true });
        callback(null, `${__dirname}/../../../public/${classid}/submit/${assignmentid}/`);
    },
    filename: (req, file, callback) => {
        const classid = req.query.classId;
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        const assignmentid = req.body.assignmentId;
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;
        const storepath = `${__dirname}/../../../public/${classid}/submit/${assignmentid}/`;

        //store data in DB
        const userid = req.body.userId;

        let today = new Date();

        const submit = {
            userId: userid,
            fileName: filename,
            lastSubmitTime: today,
            storePath: storepath,
            storeName: storename
        }

        console.log(submit);
        Assignment.updateOne({ assignmentId: assignmentid }, { $push: { submitStatus: submit } })
            .then((data) => {
                console.log(data);
                callback(null, storename);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }
})

let assignmentUpload = multer({
    storage: assignmentStorage
})

module.exports = assignmentUpload;