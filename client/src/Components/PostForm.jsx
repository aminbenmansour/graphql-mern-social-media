import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../Utils/hooks";

import { FETCH_POSTS_QUERY } from "../Utils/graphql";
import { CREATE_POST_MUTATION } from "../Utils/graphql";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
        variables: {
          id: result.data.createPost.id,
        },
      });

      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          name="body"
          placeholder="Hi World!"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
