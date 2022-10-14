import { gql, useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import PostCard from "../Components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);

  return (
    <div>
      <h1>Home Page</h1>

      <Grid columns={3} fluid>
        <Grid.Row>
          {loading ? (
            <h1> Loading posts</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{marginBotton: 20}}>
                  <PostCard post={post} style={{marginButton: 20}} />
                </Grid.Column>
              );
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
