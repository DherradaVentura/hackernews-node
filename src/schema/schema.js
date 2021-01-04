const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        info: String!
        feed(filter: String, skip: Int, take: Int, orderBy: LinkOrderByInput): Feed
    }

    type Mutation {
        post(url:String!, description: String!): Link!
        update(linkId: ID!, url: String, description: String): Link
        deletePost(linkId: ID!): Successful
        signup(email: String!, password: String!, name: String!): AuthPayLoad
        login(email: String!, password: String!): AuthPayLoad
        vote(linkId: ID!): Vote 
    }

    type AuthPayLoad {
        token: String!
        user: User
    }
    
    type Feed {
        links: [Link!]!
        count: Int!
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
        createdAt: Date!
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
    
    input LinkOrderByInput {
        description: Sort
        url: Sort
        createdAt: Sort
    }
    
    enum Sort {
        asc
        desc
    }
    
    scalar Date
    `

module.exports = typeDefs