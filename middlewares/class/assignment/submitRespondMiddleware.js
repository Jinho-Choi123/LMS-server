const submitRespondMiddleware = (req, res, next) => {
    res.json({
        msg: "submit success",
        success: true
    })
}

module.exports = submitRespondMiddleware;