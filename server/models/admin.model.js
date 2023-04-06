const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const defaultPicture = 'default.jpg'

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: value => {
        if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
        }
    }
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true})

adminSchema.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

adminSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the admin
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
    await admin.save()
    return token
}

adminSchema.statics.findByCredentials = async (email, password) => {
    // Search for a admin by email and password.
    const admin = await Admin.findOne({ email})
    if (!admin) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return admin
}

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin
