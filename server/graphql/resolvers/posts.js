const { subscribe } = require("graphql");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(err);
      }
    },
    getPost: async (postId) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);
      const toPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await toPost.save();
      return post;
    },
    deletePost: async (_, postId, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post.username === user.username) {
          await post.delete();
          return `Post ${postId} deleted successfully`;
        } else {
          throw new Error("Action denied");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    toggleLike: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },

  Subscription: {
    newPost: () => {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST")
    }
  }
};
