const fs = require('fs');
const Class = require('../../../db/models/Class');

const deleteMiddleware = (req, res, next) => {
    const classid = req.body.classId;
    const lecturedate = new Date(req.body.lectureDate);
    const filename = req.body.fileName;

    Class.findOne({ classId: classid }).select({ lectureContents: { $elemMatch: { fileName: filename, lectureDate: lecturedate } } })
        .then((data) => {
            console.log(data.lectureContents[0])
            const storePath = data.lectureContents[0].storePath;
            Class.updateOne({ classId: classid }, { lectureContents: { $pop: { lectureDate: lecturedate, fileName: filename } } })
                .then((result) => {
                    fs.unlink(storePath, () => {
                        res.json({
                            success: true,
                            msg: "Delete success"
                        })
                    })
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        msg: err.message
                    })
                })

        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                msg: "Delete failed"
            })
        })

}

module.exports = deleteMiddleware;