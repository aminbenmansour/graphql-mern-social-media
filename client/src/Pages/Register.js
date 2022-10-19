import { useContext, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

import { AuthContext } from "../Context/auth";
import { useForm } from "../Hooks/hooks";

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: {register: userData} }) {
      context.login(userData)
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
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
