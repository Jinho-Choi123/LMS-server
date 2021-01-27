const User = require('../../db/models/User');

const checkInClassMiddleware = (req, res, next) => {
    const userid = req.query.userId;
    const classid = req.query.classId;

    User.findOne({userId: userid})
        .then((data) => {
            const lecturein = data.lectureIn;

            if(lecturein.includes(classid)) {
                next();
            }
            else {
                res.status(403).json({
                    success: false,
                    msg: "not in the class"
                })
            }
        })

}

module.exports = checkInClassMiddleware;