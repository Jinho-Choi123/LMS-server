const Class = require('../../../db/models/Class');

const createNoticeMiddleware = (req, res, next) => {
    const userid = req.query.userId;
    const date = new Date();
    const title = req.body.title;
    const content = req.body.content;
    const classid = req.query.classId;
    console.log(title);
    console.log(content);
    console.log(classid);

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const noticeid = makeid(20) + date.getTime().toString();

    const notice = {
        date: date,
        title: title,
        content: content,
        noticeId: noticeid
    }

    Class.updateOne({classId: classid}, {$push: {notices: notice}}) 
        .then((data) => {
            console.log(data);
            res.json({
                success: true,
                msg: "creating notice success"
            })
        })
        .catch((err) => {
            re.json({
                success: false,
                msg: err.message
            })
        })
}

module.exports = createNoticeMiddleware;