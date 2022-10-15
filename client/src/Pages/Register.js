import { useState } from "react";

import { gql } from "@apollo/client";

import { Button, Form } from "semantic-ui-react";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = () => {};

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  };

  return (
    <div>
      <h1>Register Page</h1>

      <Form onSubmit={onSubmit} noValidate>
        <Form.Input
          label="Username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
          label="Email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
        />

        <Form.Input
          label="Confirm password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput : {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
