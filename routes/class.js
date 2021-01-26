var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Class = require('../db/models/Class');

let lectureMaterialStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        fs.mkdirSync(`${__dirname}/../public/${classid}/lecturematerial/`, { recursive: true });
        callback(null, `${__dirname}/../public/${classid}/lecturematerial/`);
    },
    filename: (req, file, callback) => {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        // store data in DB
        const lecturedate = req.query.lectureDate;
        //const lecturedate = new Date();
        const storepath = `${__dirname}/../public/${req.query.classId}/lecturematerial/`;
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;
        const lecturecontent = {
            lectureDate: lecturedate,
            storePath: storepath + storename,
            fileName: filename
        }
        console.log("updating db");
        Class.updateOne({ classId: req.query.classId }, { $push: { lectureContents: lecturecontent } }, (err, data) => {
            if (err) throw err;
            callback(null, storename);
        })
    }
})

let lectureMaterialUpload = multer({
    storage: lectureMaterialStorage
})

const Assignment = require('../db/models/Assignment');

let assignmentStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const classid = req.query.classId;
        const assignmentid = req.body.assignmentId;
        fs.mkdirSync(`${__dirname}/../public/${classid}/submit/${assignmentid}/`, { recursive: true });
        callback(null, `${__dirname}/../public/${classid}/submit/${assignmentid}/`);
    },
    filename: (req, file, callback) => {
        const classid = req.query.classId;
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        const assignmentid = req.body.assignmentId;
        const filename = basename + extension;
        const storename = basename + "-" + Date.now() + extension;
        const storepath = `${__dirname}/../public/${classid}/submit/${assignmentid}/`;

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
        // Assignment.findOne({assignmentId: assignmentid})
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
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

const checkIsStudent = require('../middlewares/auth/checkIsStudent');
const checkIsProf = require('../middlewares/auth/checkIsProf');
const createMiddleware = require('../middlewares/class/createMiddleware');
const joinMiddleware = require('../middlewares/class/joinMiddleware');
const uploadMiddleware = require('../middlewares/class/lectureMaterials/uploadMiddleware');
const downloadMiddleware = require('../middlewares/class/lectureMaterials/downloadMiddleware');
const deleteContentMiddleware = require('../middlewares/class/lectureMaterials/deleteMiddleware');
const createAssignmentMiddleware = require('../middlewares/class/assignment/createMiddleware');
const submitAssignmentRespondMiddleware = require('../middlewares/class/assignment/submitRespondMiddleware');
const deleteAssignmentMiddleware = require('../middlewares/class/assignment/deleteMiddleware');
const showClassesMiddleware = require('../middlewares/class/showMiddleware');
const loadAssignmentMiddleware = require('../middlewares/class/assignment/loadMiddleware');
const downloadAssignmentMiddleware = require('../middlewares/class/assignment/downloadMiddleware');

router.post('/create', checkIsProf, createMiddleware);

router.post('/join', checkIsStudent, joinMiddleware);

router.post('/upload', checkIsProf, lectureMaterialUpload.fields([{ name: 'lecturenote' }, { name: 'lecturevideo' }, { name: 'classId' }]), uploadMiddleware);

router.get('/download', checkIsStudent, downloadMiddleware);

router.post('/deletecontent', checkIsProf, deleteContentMiddleware);

router.post('/assignment/create', checkIsProf, createAssignmentMiddleware);

router.post('/assignment/submit', assignmentUpload.fields([{ name: 'assignment' }, {name: 'assignmentId'}, {name: 'userId'}]), submitAssignmentRespondMiddleware);

router.post('/assignment/delete', checkIsStudent, deleteAssignmentMiddleware);

router.get('/assignment/load', loadAssignmentMiddleware);

router.get('/assignment/download', downloadAssignmentMiddleware);

router.post('/get', showClassesMiddleware);
module.exports = router;