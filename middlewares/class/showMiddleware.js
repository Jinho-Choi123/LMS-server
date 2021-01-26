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
                console.log(element)
                var profId;
                var className;
                Class.findOne({classId:element},function(err,data){
                    if(err) throw err;
                    else{
                        profId = data.instructor
                        className = data.className
                        console.log(className)
                        classesInfo.push({className:data.className, instructor:profId})
                        console.log("1",classesInfo)
                    }
                })
            })
            setTimeout(()=>{resolve(classesInfo)},1000)
            console.log("2",classesInfo)
        })
    }

    const findUser = (userId) =>{
        return new Promise((resolve, reject) =>{
            User.findOne({ userId: userId }, (err, data) => {
                if (err) throw err;
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


// const showMiddleware = (req, res, next) => {
//     //console.log("req", req.body)
//     const isStudent = req.body.isStudent;
//     const userId = req.body.userId

//     var i = 0;
//     //const delay = ms =>new Promise(resolve=>setTimeout(resolve, ms))

//     async function findClassforStudent(classes){
//         return new Promise((resolve, reject) =>{
//             const classesInfo = []
//             function classesforEach(classes, classesInfo){
//                 classes.forEach(element =>{
//                     i++;
//                     console.log(element)
//                     Class.findOne({classId:element},function(err,data){
//                         if(err) throw err;
//                         else{
//                             var profId = data.instructor
//                             var className = data.className
//                             console.log("1 classname",className)
//                             classesInfo.push({className:data.className, instructor:profId, classId:element})
//                             console.log("2 classinfo",classesInfo)     
//                             //resolve(classesInfo)                   
//                         }
//                     })
//                     if(i==classes.length) {
//                         console.log("3 i",i)
//                         console.log("4 classesInfo at last",classesInfo)
//                         //resolve(classesInfo)
//                     }
//                 })
//             }
//             classesforEach(classes,classesInfo)
//             //await delay(1000)
//             resolve(classesInfo)
//             //setTimeout(()=>{resolve(classesInfo)} , 1000)
            
//             //await resolve(classesInfo)
//             //console.log("classInfo outside",classesInfo)
//             //resolve(classesInfo)
//         })
//     }
//     function findUser(userId){
//         return new Promise((resolve, reject)=>{
//             User.findOne({userId:userId},(err,data)=>{
//                 if(err) throw err;
//                 //const classes = data.lectureIn;
//                 //console.log("lectureIn",data.lectureIn)
//                 resolve(data.lectureIn);
//             })
//         })
//     }
//     findUser(userId)
//     .then(classes => findClassforStudent(classes))
//     .then(classesInfo => res.json({ classes: classesInfo, msg: 'success', success: true }))
//     .catch((err) => {
//         res.json({
//             msg: err.message,
//             success: false
//         })
//     })
   
    
// }

module.exports = showMiddleware;