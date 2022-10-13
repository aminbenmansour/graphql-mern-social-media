import { gql, useQuery } from "@apollo/react-hooks";

import { Grid, Image } from "semantic-ui-react";
const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);

  const posts = data.getPosts;
  return (
    <div>
      <h1>Home Page</h1>

      <Grid columns={3} divided>
        <Grid.Row>
          <h1>Recent posts</h1>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h1> Loading posts</h1>
          ) : (
            posts &&
            posts.map((el) => {
              <Grid.Column></Grid.Column>;
            })
          )}
        </Grid.Row>
      </Grid>
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
