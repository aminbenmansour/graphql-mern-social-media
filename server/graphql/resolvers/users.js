const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

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
            // TODO make sure user does not exist
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12)
        }
    }
}