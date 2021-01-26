const Assignment = require('../../../db/models/Assignment');

const downloadMiddleware = (req, res, next) => {
    const userid = req.query.userId;
    const assignmentid = req.query.assignmentId;
    const filename = `${req.query.fileName}`;
    console.log(filename);
    const lastsubmittime = new Date(req.query.lastSubmitTime);

    Assignment.findOne({assignmentId: assignmentid}).select("submitStatus")
        .then((data) => {
            if(data == null) {
                return res.json({
                    msg: "No such assignment",
                    success: false
                })
            }
            const submitStatus = data.submitStatus;
            const assignment = submitStatus.filter(submit => {
                console.log((submit.lastSubmitTime.getTime() === lastsubmittime.getTime()))
                return (submit.fileName === filename) && (submit.lastSubmitTime.getTime() === lastsubmittime.getTime()) && (submit.userId === userid);
            })

            const storepath = assignment[0].storePath;
            const storename = assignment[0].storeName;
            const downloadpath = storepath + storename;
            console.log(downloadpath);
            res.download(downloadpath);
        })
        .catch((err) => {
            return res.json({
                msg: err.message,
                success: false
            })
        })

}

module.exports = downloadMiddleware;