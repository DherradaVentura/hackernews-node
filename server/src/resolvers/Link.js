function postedBy(parent, __, context, ____) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

function votes(parent, __, context, ____) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}

export { postedBy, votes };
