const fs = require('fs');
const Assignment = require('../../../db/models/Assignment');

const deleteMiddleware = (req, res, next) => {
    const assignmentid = req.body.assignmentId;
    const userid = req.body.userId;
    const filename = req.body.fileName;
    console.log(assignmentid)
    console.log(userid)
    console.log(filename)

    Assignment.findOne({ assignmentId: assignmentid }).select({ submitStatus: { $elemMatch: { userId: userid, fileName: filename } } })
        .then((data) => {
            console.log(data.submitStatus[0]);
            const storePath = data.submitStatus[0].storePath;
            const storeName = data.submitStatus[0].storeName;
            Assignment.updateOne({ assignmentId: assignmentid }, { $pull: { submitStatus: { fileName: filename, userId: userid } } })
                .then((result) => {
                    console.log(result);
                    console.log(storePath + storeName);
                    fs.unlink(storePath + storeName, () => {
                        res.json({
                            success: true,
                            msg: "Delete assignment success"
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

}

module.exports = deleteMiddleware;