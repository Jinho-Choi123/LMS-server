const Class = require('../../../db/models/Class');

const loadNoticeMiddleware = (req, res, next) => {
    const userid = req.query.userId;
    const classid = req.query.classId;

    Class.findOne({classId: classid}).select("notices")
        .then((data) => {
            const noticeList = data.notices;
            res.json({
                notices: noticeList,
                success: true
            })
        })
        .catch((err) => {
            res.json({
                notices: [],
                success: false,
                msg: err.message
            })
        })
}

module.exports = loadNoticeMiddleware;