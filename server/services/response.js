const ResponseSuccess = (res, data = {}, status = 200, code = 200, message = '') => {
    res.status(status).send({
        code,
        data,
        errors: {},
        message: message
    })
}

module.exports = {
    ResponseSuccess
}