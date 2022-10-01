const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log(`Mongo Database connected !`)
        return server.listen({ port: 5000 })
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
