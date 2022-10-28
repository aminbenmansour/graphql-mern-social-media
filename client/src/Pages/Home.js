import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../Context/auth";

import PostCard from "../Components/PostCard";
import PostForm from "../Components/PostForm";

import { FETCH_POSTS_QUERY } from "../Utils/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div>
      <h1>Home Page</h1>

      <Grid columns={3} fluid>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1> Loading posts</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => {
              return (
                <Grid.Column key={post.id} style={{ marginBotton: 20 }}>
                  <PostCard post={post} style={{ marginButton: 20 }} />
                </Grid.Column>
              );
            })
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
