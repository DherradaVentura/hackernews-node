function feed (parent, args, context, info) {
    return context.prisma.link.findMany().feed()
}

module.exports = { feed }