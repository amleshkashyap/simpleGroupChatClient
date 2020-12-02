import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import validator from "validator";

const Login = props => {
  const [token, setToken] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setToken({ ...token, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = token;

    if (!email.length) {
      setError("Email is required");
    }

    if (!password.length) {
	setError("Password is required");
    }

    if (!validator.isEmail(email)) {
      setError("Valid email is required");
    }

    if (email.length && validator.isEmail(email)) {
      setError("");
      props.userLogin(email, password);
    }

  };

  const { email, password } = token;

  return (
    <Paper elevation={3} className="paper">
      User Details
      <TextField
        required
        id="outlined-name"
        label="Email"
        name="email"
        value={email}
        onChange={handleChange}
        variant="outlined"
        style={{ margin: 10 }}
      />
      <TextField
        required
        id="outlined-email-input"
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={handleChange}
        variant="outlined"
        className="text-area"
        style={{ margin: 10 }}
      />
      <Button variant="contained" onClick={validate} style={{ margin: 15 }}>
        Login
      </Button>
      <div>{error}</div>
    </Paper>
  );
};

export default Login;
