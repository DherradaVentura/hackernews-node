import pkg from 'bcryptjs';
import jwtPkg from 'jsonwebtoken';
import { getUserId } from '../utils.js';

const { hash, compare } = pkg;
const { sign } = jwtPkg;

async function signup(_, args, context, ____) {
  const password = await hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = await sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(_, args, context, ____) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error('No user found');
  }
  const isValid = await compare(args.password, user.password);
  if (!isValid) {
    throw new Error('Password is invalid');
  }
  const token = await sign({ userId: user.id }, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, args, context, info) {
  const userId = getUserId(context);

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish('NEW_LINK', newLink);
  return newLink;
}

async function update(parent, args, context, info) {
  const userId = getUserId(context);
  const link = await context.prisma.link.findOne({
    where: {
      id: Number(args.linkId),
    },
  });

  if (!link) {
    throw Error(`A linkId: ${args.linkId} doesn't exist.`);
  }

  if (link.postedById !== userId) {
    throw Error(`You cannot modify a link that you didn't post!`);
  }

  link.description = args.description;

  return link;
}

async function deletePost(parent, args, context, info) {
  const { userId } = context;
  const link = await context.prisma.link.findOne({
    where: {
      id: Number(args.linkId),
    },
  });
  if (!link) {
    throw Error(`Link ${args.linkId} doesn't exist.`);
  }

  if (link.postedById !== userId) {
    throw Error(`You cannot modify a link that you didn't post!`);
  }

  const isSuccessful = (await context.prisma.link.delete({
    where: {
      id: Number(args.linkId),
    },
  }))
    ? true
    : false;

  return { isSuccessful };
}

async function vote(parent, args, context, info) {
  const { userId } = context;

  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });
  context.pubsub.publish('NEW_VOTE', newVote);

  return newVote;
}

export { signup, login, post, update, deletePost, vote };
