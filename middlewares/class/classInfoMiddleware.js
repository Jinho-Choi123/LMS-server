const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')

const classInfoMiddleware = (req, res, next) => {
    const classId = req.query.classId
    
    Class.findOne({classId:classId},function(err, data){
        if(err) throw err;
        else{
            console.log(classId)
            console.log("data",data)
            var classInfo = {
                dates:data.lectureDates,
                notices:data.notices,
                lectures:data.lectureContents,
                assignments:data.assignments
            }
            console.log(classInfo)
            res.json({classInfo:classInfo})
        }
    })
}

module.exports = classInfoMiddleware;