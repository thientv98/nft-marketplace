const jwt = require('jsonwebtoken')
const { Admin } = require('../models')

const admin = async(req, res, next) => {
    let token = req.header('Authorization')
    if (token) {
        token = token.replace('Bearer ', '')
    } else {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const admin = await Admin.findOne({ _id: data._id })
        if (!admin) {
            throw new Error()
        }
        req.admin = admin
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = admin