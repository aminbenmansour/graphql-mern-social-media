import { Form, Button } from "semantic-ui-react";
import { gql } from "@apollo/client";

import { useForm } from "../Utils/hooks";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
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

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!) {
  createPost(body: $body) {
    id username body createdAt
    likes {
      id username createdAt
    }
    comments {
      id username body createdAt
    }
    commentCount
  }
}
`;
export default PostForm;
