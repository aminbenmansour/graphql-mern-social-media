import { useState } from "react";

const Register = () => {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
};

export default Register;