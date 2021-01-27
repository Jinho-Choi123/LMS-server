const Assignment = require('../../../db/models/Assignment');

const loadallMiddleware = (req, res, next) => {
    const assignmentid = req.query.assignmentId;
    //const userId = req.query.userId;

    Assignment.findOne({assignmentId: assignmentid}).select('submitStatus')
        .then((data) => {
            const submitStatus = data.submitStatus;

            res.json({
                history: submitStatus,
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

module.exports = loadallMiddleware;