const Post = require("../../models/Post")

module.exports = {
    Mutation: {
        createComment: async (
            _,
            { postId, body },
            context
        ) => {
            
        },
        deleteComment: async (
            _,
            { postId, commentId },
            context
        ) => {

        },
        toggleLike: async (
            _,
            { postId },
            context
        ) => {
            
        },
    }
}