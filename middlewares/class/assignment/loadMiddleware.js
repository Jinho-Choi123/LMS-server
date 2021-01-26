const Assignment = require('../../../db/models/Assignment');

const loadMiddleware = (req, res, next) => {
    const assignmentid = req.query.assignmentId;
    const userId = req.query.userId;

    Assignment.findOne({assignmentId: assignmentid}).select('submitStatus')
        .then((data) => {
            const submitStatus = data.submitStatus;
            const userAssignmentHistory = submitStatus.filter(submit => {
                return submit.userId === userId;
            });

            res.json({
                history: userAssignmentHistory,
                success: true,
                msg: "load history success"
            })
        })
        .catch((err) => {
            res.json({
                history: [],
                success: false,
                msg: err.message
            })
        })
}

module.exports = loadMiddleware;