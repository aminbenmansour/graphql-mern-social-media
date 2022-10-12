import { gql, useQuery } from "@apollo/react-hooks";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);
  console.log(data);
  console.log(loading);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

const FETCH_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default Home;
