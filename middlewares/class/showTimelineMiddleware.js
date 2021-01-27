const User = require('../../db/models/User');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Class = require('../../db/models/Class');
//const User = require('../../db/models/User');
const Assignment = require('../../db/models/Assignment');

const showTimelineMiddleware = (req, res, next) => {

    const userId = req.body.userId;

    function partition(arr, left, right) {
        let pivot = arr[Math.floor((right + left) / 2)].endTime;
        let i = left;
        let j = right;

        while (i <= j) {
            while (arr[i].endTime < pivot) {
                i++;
            }
            while (arr[j].endTime > pivot) {
                j--;
            }
            if (i <= j) {
                let temp = arr[i].endTime;
                arr[i].endTime = arr[j].endTime;
                arr[j].endTime = temp;
                i++;
                j--;
            }
        }
        return i;
    }

    function quickSort(arr, left, right) {
        let index;
        if (arr.length > 1) {
            index = partition(arr, left, right);
            if (left < index - 1) {
                quickSort(arr, left, index - 1);
            }
            if (index < right) {
                quickSort(arr, index, right);
            }
        }
        return arr;
    }

    const findUser = (userId) => {
        return new Promise((resolve, reject) => {
            User.findOne({ userId: userId }, (err, data) => {
                if (err) throw err;
                else {
                    //console.log("0",data.lectureIn)
                    resolve(data.lectureIn);
                }
            })
        })
    }

    const findTimeline = (classes) => {
        return new Promise(async (resolve, reject) => {
            var assignment = []
            await classes.forEach(element => {
                Class.findOne({ classId: element }, (err, data) => {
                    if (err) throw err;
                    else {
                        //console.log("data assignments",data.assignments)
                        assignment = assignment.concat(data.assignments)
                        //console.log("assignment!!",assignment)
                    }
                })
            })
            // console.log("1assignment",assignment);
            // resolve(assignment)

            setTimeout(() => { console.log("111111111assignment", assignment); resolve(assignment) }, 1000)
        })
    }

    const sortTimeLine = (tasks) => {
        return new Promise((resolve, reject) => {
            //var assignmentInfo = []
            //console.log("tasks",tasks)
            Assignment.find({ assignmentId: { $in: tasks } }, (err, data) => {
                resolve(quickSort(data, 0, data.length - 1));
            })
        })
    }

    User.findOne({ userId: userId }, (err, data) => {
        if (err) throw err;
        else {
            console.log("aaaaaaaaaaaaaaaaaaaaaaa")
            //console.log(data)
            const timeline = data.assignments;
            console.log("timeline", timeline)
            res.json({
                timeline: quickSort(timeline, 0, timeline.length - 1)
            })
        }
    })

    // findUser(userId)
    // .then(classes => findTimeline(classes))
    // .then(tasks => sortTimeLine(tasks))
    // .then(sortedTasks =>{
    //     console.log("sortedTasks",sortedTasks)
    //     res.json({timeline:sortedTasks, success:true})
    // })
    // .catch(err =>console.log("err",err))

}

module.exports = showTimelineMiddleware;