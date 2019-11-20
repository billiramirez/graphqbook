const typeDefinitions = `
  input PostInput {
    text: String!
  }

  input UserInput {
    username: String!
    avatar: String!
  }


  type User {
    avatar: String,
    username: String
  }

  type Post {
    id: Int
    text: String
    user: User
  }

  type RootMutation {
    addPost(
      post: PostInput!
      user: UserInput!
    ): Post
  }

  type RootQuery {
    posts: [Post]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
