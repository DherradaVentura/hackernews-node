const { GraphQLServer } = require('graphql-yoga')

// typeDefinitions
/* The typeDefs constant defines your GraphQL schema. Here, it defines a simple Query type with one field called info.
This field has the type String!. The exclamation mark in the type definition means that this field is required and can
never be null.
 */

// const typeDefs = `
// type Query {
//     info: String!
//     feed: [Link!]!
// }
//
// type Mutation {
//     post(url:String!, description: String!): Link!
//     }
//
// type Link {
//     id: ID!
//     description: String!
//     url: String!
// }
// `

// hardcoded links for now
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

// Resolvers
/*
The resolvers object is the actual implementation of the GraphQL schema.
Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.
 */

// temporary unique Id generator
let idCount = links.length

const resolvers = {
    Query: {
        info: ()=> 'This is the HackerNewsCone API',
        feed: ()=> links
    },
    // The Link resolver below is not needed because graphql infers what they look like
    // Link: {
    //     // parent obj is the element inside the links list 'resolved' in the above query execution
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.url
    // },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        }
    }
}

// Server
/*
Finally, the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
This tells the server what API operations are accepted and how they should be resolved.
 */
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})
server.start(()=> console.log('Server is running on http://localhost:4000'))

