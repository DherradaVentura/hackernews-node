// Import the PrismaClient constructor from the @prisma/client node module.
import { PrismaClient } from '@prisma/client'

// Instantiate PrismaClient
const prisma = new PrismaClient()

// define async func main to send queries to db
async function main() {
    const newLink = await prisma.link.create({
        data: {
            description: 'Fullstack tutorial for graphQL',
            url: 'www.howtographql.com'
        }
    })
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

// disconnect when done.
main().catch(e => {
    throw e
    }).finally(async ()=> { await prisma.$disconnect() })

// Workflow
// Manually adjust your Prisma data model.
// Migrate your database using the prisma migrate CLI commands we covered.
// (first migration: npx prisma migrate save --experimental, execute migration: npx prisma migrate up --experimental, generate client: npx prisma generate)
// (Re-)generate Prisma Client
// Use Prisma Client in your application code to access your database.