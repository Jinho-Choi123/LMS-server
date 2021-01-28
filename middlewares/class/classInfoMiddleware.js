const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')

const classInfoMiddleware = (req, res, next) => {
    const classId = req.query.classId
    console.log(classId);
    
    Class.findOne({classId:classId})
        .then((data) => {
            var classInfo = {
                dates:data.lectureDates,
                notices:data.notices,
                lectures:data.lectureContents,
                assignments:data.assignments
            }
            res.json({classInfo:classInfo})
        })
        .catch((err) => { throw err;})
}

module.exports = classInfoMiddleware;