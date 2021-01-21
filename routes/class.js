var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.body.classId;
        fs.mkdirSync(`${__dirname}/../public/${classid}/`, { recursive: true });
        callback(null, `${__dirname}/../public/${classid}/`);
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
})

let upload = multer({
    storage: storage
})

const checkIsStudent = require('../middlewares/auth/checkIsStudent');
const checkIsProf = require('../middlewares/auth/checkIsProf');
const createMiddleware = require('../middlewares/class/createMiddleware');
const joinMiddleware = require('../middlewares/class/joinMiddleware');
const uploadMiddleware = require('../middlewares/class/uploadMiddleware');


router.post('/create', checkIsProf, createMiddleware);

router.post('/join', checkIsStudent, joinMiddleware);

router.post('/upload', checkIsProf, upload.fields([{ name: 'lecturenote' }, { name: 'lecturevideo' }, { name: 'classId' }]), uploadMiddleware);

module.exports = router;