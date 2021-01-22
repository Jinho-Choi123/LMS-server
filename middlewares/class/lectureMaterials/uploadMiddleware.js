const multer = require('multer');

const uploadMiddleware = (req, res, next) => {
    //upload and store the path in the DB

    return res.status(200).json({ msg: "upload success", success: true });
}

module.exports = uploadMiddleware;