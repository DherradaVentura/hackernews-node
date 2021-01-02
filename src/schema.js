const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        feed: [Link!]!
        link(id: ID!): Link
    }

    type Mutation {
        post(url:String!, description: String!): Link!
        update(id: ID!, url: String, description: String): Link
        delete(id: ID!): Successful
        signup(email: String!, password: String!, name: String!): AuthPayLoad
        login(email: String!, password: String!): AuthPayLoad
    }

    type AuthPayLoad {
        token: String!
        user: User
    }

    type User {
        id: ID!
        name: String!
        email: String!
        links: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
        postedBy: User
    }

    type Successful {
        isSuccessful: Boolean
    }
    `

module.exports = typeDefs