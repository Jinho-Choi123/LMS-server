const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')

const showMiddleware = (req, res, next) => {
    //console.log("req", req.body)
    const isStudent = req.body.isStudent;
    const userId = req.body.userId

    User.findOne({ userId: userId }, (err, data) => {
        console.log(data)
        if (err) {
            return res.json({
                msg: err.message,
                success: false
            })
        }
        if (isStudent) {
            const classes = data.lectureIn
            const classesInfo = []
            classes.forEach(element => {
                console.log(element)
                var profId;
                var className;
                Class.findOne({ classId: element }, function(err, data) {
                    if (err) throw err;
                    else {
                        profId = data.instructor
                        className = data.className
                        console.log(className)
                        classesInfo.push({ className: data.className, instructor: profId })
                        console.log(classesInfo)
                        res.json({ classes: classesInfo, msg: 'success', success: true })
                    }
                })
            })

        }
    })


}

module.exports = showMiddleware;