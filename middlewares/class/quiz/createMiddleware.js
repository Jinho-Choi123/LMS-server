const Class = require('./../../../db/models/Class');

const createQuizMiddelware = (req, res, next) => {
    const classid = req.query.classId;

    const quizname = req.body.quizName;
    const opentime = req.body.openTime;
    const endtime = req.body.endTime;
    const quizurl = req.body.quizUrl;
    const quizcontent = req.body.quizContent;

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let today = new Date();
    const quizid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(20);

    const quiz = {
        quizId: quizid,
        quizName: quizname,
        quizUrl: quizurl,
        openTime: opentime,
        endTime: endtime,
        quizContent: quizcontent
    }

    Class.updateOne({classId: classid}, {$push: {quizes: quiz}})
        .then((data) => {
            res.json({
                msg: "create quiz success",
                success: true
            })
        })
        .catch((err) => {
            res.status(403).json({
                msg: err.message,
                success: false
            })
        })

}

module.exports = createQuizMiddelware;