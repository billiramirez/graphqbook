import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import "../../assets/css/style.css";
const GET_POSTS = gql`
  {
    posts {
      id
      text
      user {
        avatar
        username
      }
    }
  }
`;

const ADD_POST = gql`
  mutation addPost($post: PostInput!, $user: UserInput!) {
    addPost(post: $post, user: $user) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`;
// eslint-disable-next-line react/prefer-stateless-function
class Feed extends Component {
  state = {
    postContent: ""
  };
  handlePostContentChange = event => {
    this.setState({ postContent: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: this.state.posts.length + 1,
      text: this.state.postContent,
      user: {
        avatar: "/uploads/avatar3.png",
        username: "Fake User"
      }
    };
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      postContent: ""
    }));
  };
  render() {
    const self = this;
    const { postContent } = this.state;

    return (
      <div className="container">
        <div className="postForm">
          <Mutation mutation={ADD_POST} refetchQueries={[{ query: GET_POSTS }]}>
            {addPost => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addPost({
                    variables: {
                      post: { text: postContent },
                      user: { username: "asfaf", avatar: "sff.jpg" }
                    }
                  }).then(() => {
                    self.setState(prevState => ({
                      postContent: ""
                    }));
                  });
                }}
              >
                <textarea
                  value={postContent}
                  onChange={self.handlePostContentChange}
                  placeholder="Write your custom post!"
                />
                <input type="submit" value="Submit" />
              </form>
            )}
          </Mutation>
        </div>
        <div className="feed">
          <Query query={GET_POSTS}>
            {({ loading, error, data }) => {
              if (loading) return "loading";
              if (error) return error.message;
              const { posts } = data;

              return posts.map((post, i) => (
                <div key={post.id} className="post">
                  <div className="header">
                    <img src={post.user.avatar} />
                    <h2>{post.user.username}</h2>
                  </div>
                  <p className="content">{post.text}</p>
                </div>
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default Feed;
