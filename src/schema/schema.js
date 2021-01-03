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
        vote(linkId: ID!): Vote 
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
        votes: [Vote!]!
    }

    type Successful {
        isSuccessful: Boolean
    }
    
    type Vote {
        id: ID!
        link: Link!
        user: User!
    }
    
    type Subscription {
        newLink: Link
        newVote: Vote
    }
    `

module.exports = typeDefs