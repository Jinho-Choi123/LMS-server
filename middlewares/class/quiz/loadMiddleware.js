const Class = require('./../../../db/models/Class');

const loadMiddleware = (req, res, next) => {
    const classid = req.query.classId;
    
    Class.findOne({classId: classid}).select("quizes")
        .then((data) => {
            console.log(data.quizes);
            res.json({
                quizes: data.quizes
            })
        })
        .catch((err) => {
            res.send(err.message);
        })
}

module.exports = loadMiddleware;