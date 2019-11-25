import logger from '../../helpers/logger';

// eslint-disable-next-line prefer-const

export default function resolver() {
  const { db } = this;
  const { Post, User } = db.models;
  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        logger.log({
          level: 'info',
          message: 'Post was created',
        });

        return User.findAll().then((users) => {
          const usersRow = users[0];

          return Post.create({
            ...post,
          }).then((newPost) => Promise.all([newPost.setUser(usersRow.id)]).then(() => newPost),);
        });
      },
    },
  };
  return resolvers;
}
