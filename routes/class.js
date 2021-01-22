var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Class = require('../db/models/Class');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        fs.mkdirSync(`${__dirname}/../public/${classid}/`, { recursive: true });
        callback(null, `${__dirname}/../public/${classid}/`);
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        // store data in DB
        const lecturedate = req.query.lectureDate;
        //const lecturedate = new Date();
        const storepath = `${__dirname}/../public/${req.query.classId}/`;
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;
        const lecturecontent = {
            lectureDate: lecturedate,
            storePath: storepath + storename,
            fileName: filename
        }
        console.log("updating db")
        Class.updateOne({ classId: req.query.classId }, { $push: { lectureContents: lecturecontent } }, (err, data) => {
            if (err) throw err;
            callback(null, storename);
        })
    }
})

let upload = multer({
    storage: storage
})

const checkIsStudent = require('../middlewares/auth/checkIsStudent');
const checkIsProf = require('../middlewares/auth/checkIsProf');
const createMiddleware = require('../middlewares/class/createMiddleware');
const joinMiddleware = require('../middlewares/class/joinMiddleware');
const uploadMiddleware = require('../middlewares/class/lectureMaterials/uploadMiddleware');
const downloadMiddleware = require('../middlewares/class/lectureMaterials/downloadMiddleware');
const deleteContentMiddleware = require('../middlewares/class/lectureMaterials/deleteMiddleware');


router.post('/create', checkIsProf, createMiddleware);

router.post('/join', checkIsStudent, joinMiddleware);

router.post('/upload', checkIsProf, upload.fields([{ name: 'lecturenote' }, { name: 'lecturevideo' }, { name: 'classId' }]), uploadMiddleware);

router.get('/download', checkIsStudent, downloadMiddleware);

router.post('/deletecontent', checkIsProf, deleteContentMiddleware);

module.exports = router;