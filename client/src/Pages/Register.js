import { useState } from "react";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";

import { Button, Form } from "semantic-ui-react";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const[addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    variables: values
  })

  const onSubmit = (event) => {
    event.preventDefault();
    addUser()
  };

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  };

  return (
    <div className="form-container">
      <h1>Register Page</h1>

      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Form.Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
        />

        <Form.Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
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
