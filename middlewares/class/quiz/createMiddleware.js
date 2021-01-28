const Class = require('./../../../db/models/Class');
const User = require('./../../../db/models/User');

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

    const userQuiz = {
        quizId: quizid,
        quizName: quizname,
        openTime: opentime,
        endTime: endtime,
        progress: false
    }

    Class.updateOne({classId: classid}, {$push: {quizes: quiz}})
        .then((data) => {
            console.log("update class");
            console.log(data);
            //User model에 userQuizSchema update하기
            User.updateMany({lectureIn: classid}, {$push: {quizes: userQuiz}})
                .then((data) => {
                    console.log("update user");
                    console.log(data);
                    res.json({
                        msg: "create quiz success",
                        success: true
                    })
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
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