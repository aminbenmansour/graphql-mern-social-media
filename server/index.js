const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers')

require('dotenv').config()

const typeDefs = gql`
    type Post {
        id: ID!,
        body: String!,
        username: String!,
        createdAt: String!
    }
    type Query {
        getPosts: [Post]
    }
`
const resolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts
            } catch (error) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const MONGO_URL = process.env.MONGO_URL

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log(`Mongo Database connected !`)
        return server.listen({ port: 5000 })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
