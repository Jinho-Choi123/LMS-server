const multer = require('multer');
const Class = require('../../../db/models/Class');
const fs = require('fs');
const path = require('path');

let lectureMaterialStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        fs.mkdirSync(`${__dirname}/../../../public/${classid}/lecturematerial/`, { recursive: true });
        callback(null, `${__dirname}/../../../public/${classid}/lecturematerial/`);
    },
    filename: (req, file, callback) => {
        const classid = req.query.classId;
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        // store data in DB
        const lecturedate = req.query.lectureDate;
        //const lecturedate = new Date();
        const storepath = `${__dirname}/../../../public/${classid}/lecturematerial/`;
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;
        const lecturecontent = {
            lectureDate: lecturedate,
            storePath: storepath + storename,
            fileName: filename
        }
        console.log("updating db");
        Class.updateOne({ classId: classid}, { $push: { lectureContents: lecturecontent } }, (err, data) => {
            if (err) throw err;
            callback(null, storename);
        })
    }
})

let lectureMaterialUpload = multer({
    storage: lectureMaterialStorage
})

module.exports = lectureMaterialUpload;