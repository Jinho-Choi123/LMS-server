const User = require('../../db/models/User');
const Class = require('../../db/models/Class');

const checkInClassMiddleware = (req, res, next) => {
    const userid = req.query.userId;
    const classid = req.query.classId;

    Class.findOne({classId: classid})
        .then((data) => {
            const students = data.students;
            if(students.includes(userid)) {
                next();
            }
            else {
                res.status(403).json({
                    success: false,
                    msg: "not in the class"
                })
            }
        })
        .catch((err) => {
            throw err;
        })


}