const multer = require('multer');
const Class = require('../../../db/models/Class');

const downloadMiddleware = (req, res, next) => {
    const filename = req.query.fileName;
    const classid = req.query.classId;
    const lecturedate = new Date(req.query.lectureDate);

    Class.findOne({ classId: classid }).select({ lectureContents: { $elemMatch: { fileName: filename, lectureDate: lecturedate } } })
        .then((data) => {
            if (data === null) {
                return res.json({
                    msg: "No such content",
                    success: false
                })
            }
            const downloadpath = data.lectureContents[0].storePath;
            console.log(downloadpath)
            return res.download(downloadpath);
        })
        .catch((err) => {
            res.json({
                msg: "Failed to download",
                success: false
            })
        })

}

module.exports = downloadMiddleware;