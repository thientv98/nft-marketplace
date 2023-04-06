const { Admin } = require("../../models")
const { ResponseSuccess } = require("../../services/response")

const createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findByCredentials(email, password)
        if (!admin) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const accessToken = await admin.generateAuthToken()
        // res.send({ admin, token })
        ResponseSuccess(res, { admin, accessToken })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const me = async (req, res) => {
    res.send(req.admin)
}

module.exports = {
    createAdmin,
    login,
    me
}