const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')
const Assignment = require('../../db/models/Assignment')

const classInfoMiddleware = (req, res, next) => {
    const classId = req.body.classId
    
    Class.findOne({classId:classId},function(err, data){
        if(err) throw err;
        else{
            console.log(classId)
            console.log("data",data)
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
    })
}

module.exports = classInfoMiddleware;