const Class = require('../../../db/models/Class');
const Assignment = require('../../../db/models/Assignment');
const User = require('../../../db/models/User');

const createMiddleware = (req, res, next) => {
    const assignmentname = req.body.assignmentName;
    const opentime = new Date(req.body.openTime);
    const endtime = new Date(req.body.endTime);
    const classid = req.query.classId;
    const instruction = req.body.instruction;

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
    const assignmentid = today.getFullYear().toString() + today.getMonth().toString() + today.getTime().toString() + makeid(30);

    const submitpath = `${__dirname}/../../../public/classid/assignment/${assignmentid}`;

    const assignment = new Assignment({
        assignmentId: assignmentid,
        assignmentName: assignmentname,
        openTime: opentime,
        endTime: endtime,
        submitPath: submitpath,
        submitStatus: [],
        instruction: instruction
    })

    
    Class.updateOne({ classId: classid }, { $push: { assignments: assignmentid } })
        .then((data) => {
            console.log(data);
            assignment.save()
                .then((data) => {
                    User.updateMany({isStudent:true, lectureIn:{$all:classid}},{ $push: {assignments:{assignmentId:assignmentid, progress:"0", assignmentName:assignmentname, endTime:endtime} }},(err,data)=>{
                        // if(err) throw err;
                        //console.log("updated",data)
                    })
                    console.log("assignmentname",assignmentname)
                    res.json({
                        msg: "Add Assignment success",
                        success: true
                    })
                })
                .catch((err) => {
                    res.json({
                        msg: err.message,
                        success: false
                    })
                })
        })
        .catch((err) => {
            res.json({
                msg: err.message,
                success: false
            })
        })

}

module.exports = createMiddleware;