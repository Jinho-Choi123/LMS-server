var express = require('express');
var router = express.Router();

//authentication checking middleware
const checkUser = require('../middlewares/auth/checkUserIdMiddleware');
const checkInClass = require('../middlewares/auth/checkInClassMiddleware');
const checkIsStudent = require('../middlewares/auth/checkIsStudent');
const checkIsProf = require('../middlewares/auth/checkIsProf');


const createMiddleware = require('../middlewares/class/createMiddleware');
const joinMiddleware = require('../middlewares/class/joinMiddleware');
const lectureMaterialUpload = require('../middlewares/class/lectureMaterials/lectureMaterialUpload');
const uploadMiddleware = require('../middlewares/class/lectureMaterials/uploadMiddleware');
const downloadMiddleware = require('../middlewares/class/lectureMaterials/downloadMiddleware');
const deleteContentMiddleware = require('../middlewares/class/lectureMaterials/deleteMiddleware');
const createAssignmentMiddleware = require('../middlewares/class/assignment/createMiddleware');
const submitAssignmentRespondMiddleware = require('../middlewares/class/assignment/submitRespondMiddleware');
const assignmentUpload = require('../middlewares/class/assignment/assignmentUpload');
const deleteAssignmentMiddleware = require('../middlewares/class/assignment/deleteMiddleware');
const showClassesMiddleware = require('../middlewares/class/showMiddleware');
const loadAssignmentMiddleware = require('../middlewares/class/assignment/loadMiddleware');
const loadallAssignmentMiddleware = require('../middlewares/class/assignment/loadallMiddleware');
const downloadAssignmentMiddleware = require('../middlewares/class/assignment/downloadMiddleware');
const createNoticeMiddleware = require('../middlewares/class/notice/createMiddleware');
const deleteNoticeMiddleware = require('../middlewares/class/notice/deleteMiddleware');
const modifyNoticeMiddleware = require('../middlewares/class/notice/modifyMiddleware');
const loadNoticeMiddleware = require('../middlewares/class/notice/loadMiddleware');
const classInfoMiddleware = require('../middlewares/class/classInfoMiddleware');
const createQuizMiddleware = require('../middlewares/class/quiz/createMiddleware');
const deleteQuizMiddleware = require('../middlewares/class/quiz/deleteMiddleware');
const loadQuizMiddleware = require('../middlewares/class/quiz/loadMiddleware');

router.post('/create', checkUser, checkIsProf, createMiddleware);

router.post('/join', checkUser, checkIsStudent, joinMiddleware);

router.post('/upload', checkUser, checkInClass, checkIsProf, lectureMaterialUpload.fields([{ name: 'lecturenote' }, { name: 'lecturevideo' }, { name: 'classId' }]), uploadMiddleware);

router.get('/download', checkUser, checkInClass, checkIsStudent, downloadMiddleware);

router.post('/deletecontent', checkUser, checkInClass, checkIsProf, deleteContentMiddleware);

router.post('/assignment/create', checkUser, checkInClass, checkIsProf, createAssignmentMiddleware);

router.post('/assignment/submit', checkUser, checkInClass, checkIsStudent, assignmentUpload.fields([{ name: 'assignment' }, {name: 'assignmentId'}, {name: 'userId'}]), submitAssignmentRespondMiddleware);

router.post('/assignment/delete', checkUser, checkInClass,checkIsStudent, deleteAssignmentMiddleware);

router.get('/assignment/load', checkUser, checkInClass, loadAssignmentMiddleware);

router.get('/assignment/download', checkUser, checkInClass, downloadAssignmentMiddleware);

router.get('/get', checkUser, showClassesMiddleware);

router.post('/notice/create', checkUser, checkInClass, checkIsProf, createNoticeMiddleware);

router.get('/assignment/loadall', loadallAssignmentMiddleware);

router.get('/assignment/download', downloadAssignmentMiddleware);

router.post('/notice/delete', checkUser, checkInClass, checkIsProf, deleteNoticeMiddleware);

router.post('/notice/modify', checkUser, checkInClass, checkIsProf, modifyNoticeMiddleware);

router.get('/notice/load', checkUser, checkInClass, loadNoticeMiddleware);

router.get('/info',checkUser, checkInClass,classInfoMiddleware);

router.post('/quiz/create', checkUser, checkInClass, checkIsProf, createQuizMiddleware);

router.post('/quiz/delete', checkUser, checkInClass, checkIsProf, deleteQuizMiddleware);

router.get('/quiz/load', loadQuizMiddleware);

module.exports = router;