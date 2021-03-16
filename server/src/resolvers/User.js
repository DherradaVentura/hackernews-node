function links(parent, __, context, ____) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).links();
}

export default { links };
