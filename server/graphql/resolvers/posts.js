const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts
            } catch (error) {
                throw new Error(err);
            }
        },
        getPost: async (postId) => {
            try {
                const post = await Post.findById(postId)
                if(post) {
                    return post
                } else {
                    throw new Error("Post not found")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },

    Mutation: {
        createPost: async (
            _,
            { body },
            context
            ) => {
            const user = checkAuth(context)
            const toPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            })

            const post = await toPost.save()
            return post
        },
        deletePost: async (postId) => {
            
        }
    }
}