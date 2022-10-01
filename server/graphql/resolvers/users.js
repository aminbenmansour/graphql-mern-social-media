const User = require('../../models/User')

module.exports = {
    Mutation: {
        register(parent, args, context, info) {
            // TODO validate user data
            // TODO make sure user does not exist
            // TODO hash password and create an auth token
        }
    }
}