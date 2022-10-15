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

  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
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
      registerInput: {
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
