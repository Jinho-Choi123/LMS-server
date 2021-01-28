const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')
const Assignment = require('../../db/models/Assignment')

const classInfoMiddleware = (req, res, next) => {
    const classId = req.query.classId
    console.log(classId);
    
    Class.findOne({classId:classId})
        .then((data) => {
            var classInfo = {
                dates:data.lectureDates,
                notices:data.notices,
                lectures:data.lectureContents,
                assignments:data.assignments,
                students: data.students,
                className: data.className
            }
            
            // var assignments = data.assignments.map((element) => {
            //     return {assignmentId: element}
            // })

            // Assignment.find({"$or": assignments}, function(err, data){
            //     console.log("hello", data)
            //     console.log(classInfo)
            //     res.json({classInfo:classInfo, assignments: data})
            // })
            Assignment.find({"assignmentId": {$in:data.assignments}}, function(err, data){
                console.log(classInfo)
                res.json({classInfo:classInfo, assignments: data})
            })
            
            
        }
    )
}

module.exports = classInfoMiddleware;