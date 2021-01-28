const User = require('../../db/models/User');
const Class = require('../../db/models/Class')

const showMiddleware = (req, res, next) => {
    const userId = req.query.userId

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
                    }
                })
            })
            setTimeout(()=>{resolve(classesInfo)},1000)
        })
    }

    const findUser = (userId) =>{
        return new Promise((resolve, reject) =>{
            User.findOne({ userId: userId }, (err, data) => {
                if (err) throw err;
                const classes = data.lectureIn;
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