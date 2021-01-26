const Class = require('../../../db/models/Class');

const deleteNoticeMiddleware = (req, res, next) => {
    const classid = req.query.classId;
    const noticeid = req.body.noticeId;

    Class.updateOne({classId: classid}, {$pull: {notices:  {noticeId: noticeid}}})
        .then((data) => {
            console.log(data);
            res.json({
                success: true,
                msg: "delete notice success"
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: err.message
            })
        })
}

module.exports = deleteNoticeMiddleware;