const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class')

const showMiddleware = (req, res, next) => {
    //console.log("req", req.body)
    const isStudent = req.body.isStudent;
    const userId = req.body.userId

    const resolve = (classesInfo) =>{
        return new Promise((resolve,reject) =>{
            resolve(classesInfo);
        })
    }

    const findClass = (classes) =>{
        return new Promise((resolve, reject) =>{
            var classesInfo = [];
            Class.find({classId:{$in:classes}},(err,data)=>{
                if(err) throw err;
                else{
                    resolve(data)
                }
            })
           
        })
    }

    const findUser = (userId) =>{
        return new Promise((resolve, reject) =>{
            User.findOne({ userId: userId }, (err, data) => {
                if (err) throw err;
                //console.log("data",data)
                const classes = data.lectureIn
                resolve(classes)
            })
        })
    }

    findUser(userId)
    .then(classes => findClass(classes))
    .then(classesInfo=>res.json({ classes: classesInfo, msg: 'success', success: true }))
    .catch(err => console.log("err",err))

}

module.exports = showMiddleware;