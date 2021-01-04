const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server');
const { PubSub } = require('apollo-server')
const schema = require('./schema/schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote')
const Subscription = require('./resolvers/Subscription');
const { getUserId } = require('./utils');
require('dotenv').config();

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
    Query,
    Link,
    Mutation,
    User,
    Vote,
    Subscription
}

// Server
/*
Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
This tells the server what API operations are accepted and how they should be resolved.
 */
const server = new ApolloServer({
    typeDefs:  schema,
    resolvers,
    context: ({req}) => {
        return {
            ...req,
            prisma,
            pubsub,
            userId: req && req.headers.authorization ? getUserId(req) : null
        }
    }
})
server.listen().then(( { url } ) => console.log(`Server is running on ${url}`));

