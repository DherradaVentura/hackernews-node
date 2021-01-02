const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server');
const { PubSub } = require('apollo-server')
const schema = require('./schema/schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const {getUserId} = require('./utils')
require('dotenv').config();

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
    Query,
    Mutation,
    Link,
    User
}

// Server
/*
Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
This tells the server what API operations are accepted and how they should be resolved.
 */
const server = new ApolloServer({
    typeDefs:  schema,
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
            pubsub,
            userId: request && request.headers.authorization ? getUserId(request) : null
        }
    }
})
server.listen().then(( { url } ) => console.log('Server is running on http://localhost:4000'));

