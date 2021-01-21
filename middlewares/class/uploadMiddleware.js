const multer = require('multer');

const uploadMiddleware = (req, res, next) => {
    return res.status(200).json({ msg: "upload success", success: true });
}

module.exports = uploadMiddleware;