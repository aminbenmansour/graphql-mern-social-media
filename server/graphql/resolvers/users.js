const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const User = require('../../models/User')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

module.exports = {
    Mutation: {
        async register(
            parent,
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context,
            info) {
            // TODO validate user data
            // make sure user does not exist
            const oldUser = await User.findOne({ username })
            if (oldUser) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12)

            const user = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            // save to db
            const res = await user.save()

            // create token
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username,
                createdAt: res.createdAt
                },
                SECRET_KEY,
                {expiresIn: '1h'}
            )

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}