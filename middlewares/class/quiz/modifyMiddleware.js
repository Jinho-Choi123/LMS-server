const Class = require('./../../../db/models/Class');

const modifyQuizMiddleware = (req, res, next) => {
    const classid = req.query.classId;
    const quizid = req.body.quizId;
    const quizname = req.body.quizName;
    const quizurl = req.body.quizUrl;
    const quizcontent = req.body.quizContent;
    const opentime = req.body.openTime;
    const endtime = req.body.endTime;

    Class.updateOne({classId: classid}, {$pull: {quizes: {quizId: quizid}}})
        .then((data) => {
            axios.post("http://192.249.18.169:8080/class/quiz/create", {})
        })
}