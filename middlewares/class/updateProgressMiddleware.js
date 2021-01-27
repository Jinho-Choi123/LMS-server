//const Class = require('../../db/models/Class');
const crypto = require('crypto');
const dotenv = require('dotenv');
const User = require('../../db/models/User');

const updateProgressMiddleware = (req, res, next) => {
    
    const userId = req.body.userId;
    const assignmentId = req.body.assignmentId;
    const progress = req.body.progress;

    User.updateOne({userId:userId, "assignments.assignmentId":assignmentId},{$set:{"assignments.$.progress":progress}},(err,data)=>{
        if(err) throw err;
        else{
            //console.log("data",data)
            //console.log("assignmentId",assignmentId)
            //console.log("progress",progress)
            res.json({success:true})
        }
    })



}

module.exports = updateProgressMiddleware;