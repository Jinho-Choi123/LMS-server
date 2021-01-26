const Class = require('../../../db/models/Class');
const axios = require('axios');

const modifyMiddleware = (req, res, next) => {
    console.log("inside modify middlewar4e");
    const classid = req.query.classId;
    const noticeid = req.body.noticeId;
    const noticeTitle = req.body.title;
    const noticeContent = req.body.content;
    const userid = req.query.userId;

    Class.updateOne({classId: classid}, {$pull: {notices: {noticeId: noticeid}}})
        .then((data) => {
            console.log(data);
            axios.post("http://192.249.18.169:8080/class/notice/create", {content: noticeContent, title: noticeTitle}, {params: {userId: userid, classId: classid}})
                .then((response) => {
                    res.json({
                        success: true,
                        msg: "modify success"
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            res.status(403).json({
                success: false,
                msg: err.message
            })
        })
}

module.exports = modifyMiddleware;
