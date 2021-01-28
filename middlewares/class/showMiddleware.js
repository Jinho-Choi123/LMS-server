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
            classes.forEach(element =>{
                //console.log(element)
                var profId;
                var className;
                Class.findOne({classId:element},function(err,data){
                    if(err) throw err;
                    else{
                        profId = data.instructor
                        className = data.className
                        //console.log(className)
                        classesInfo.push({className:data.className, instructor:profId, classId: data.classId})
                        //console.log("1",classesInfo)
                    }
                })
            })
            setTimeout(()=>{resolve(classesInfo)},1000)
            //.log("2",classesInfo)
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