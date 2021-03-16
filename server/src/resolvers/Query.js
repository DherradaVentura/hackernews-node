function feed(_, args, context, ____) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const links = context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.order,
  });

  const count = context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    count,
  };
}

function info() {
  return 'This is a simple API for our hacker-news clone!';
}

export { feed, info };
