function link(parent, __, context, ____) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

function user(parent, __, context, ____) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

export default { link, user };
