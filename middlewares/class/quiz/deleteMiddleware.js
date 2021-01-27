const classInfoMiddleware = require('../classInfoMiddleware');
const Class = require('./../../../db/models/Class');

const deleteQuizMiddleware = (req, res, next) => {
    const classid = req.query.classId;
    const quizid = req.body.quizId;
    Class.updateOne({classId: classid}, {$pull: {quizes: {quizId: quizid}}})
        .then((data) => {
            console.log(data);
            res.json({
                success: true,
                msg: "delete quiz"
            })
        })
        .catch((err) => {
            res.json({
                success: true,
                msg: "delete quiz failed"
            })
        })
}

module.exports = deleteQuizMiddleware;