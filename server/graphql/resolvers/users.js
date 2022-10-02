const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const { validateRegisterInput } = require('../../utils/validators')
const User = require('../../models/User')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt
        },
        SECRET_KEY,
        {expiresIn: '1h'}
    )
}

module.exports = {
    Mutation: {
        async login(
            _,
            { username, password }
        ) {
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const user = User.findOne({ username })

            if(!user) {
                errors.general = "User not found"
                throw new UserInputError("User not found", { errors })
            }
            const match = bcrypt.compare(user.password, password)
            if(!match) {
                errors.general = "Wrong credentials"
                throw new UserInputError("Wrong credentials", { errors })
            }

            const token = generateToken(user)
        },
        async register(
            parent,
            {
                registerInput: { username, email, password, confirmPassword }
            },
            context,
            info) {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }
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
            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}