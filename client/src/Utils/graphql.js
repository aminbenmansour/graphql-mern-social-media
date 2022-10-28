import { gql } from "@apollo/react-hooks";

export const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;
