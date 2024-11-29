import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container, Row, Col } from "react-bootstrap";

function Login({ baseURL }) {
  const [pass, setPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUerror] = useState("");
  const [passError, setPerror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/api/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.success) {
      dispatch(
        setUser({
          username,
          email: data.data.email,
          institute: data.data.institute,
          name: data.data.name,
          logged: true,
          baseURL: baseURL,
        })
      );
      navigate("/Profile");
    } else {
      if (data.message === "Invalid-U") {
        setUerror("* User does not exist");
      }
      if (data.message === "Invalid-P") {
        setPerror("* Wrong password, try again");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <Container className="login-container mt-5">
      <Row className="align-items-center">
        {/* Image Section */}
        <Col md={6} className="d-none d-md-block">
          <img
            src="https://source.unsplash.com/600x600/?study,notes"
            alt="Study and notes"
            className="img-fluid rounded"
          />
        </Col>

        {/* Login Form Section */}
        <Col md={6}>
          <div className="login-box p-4 shadow rounded">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <TextField
                  id="outlined-username-input"
                  label="Username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  required
                />
                <div className="error-pop text-danger small">{userError}</div>
              </div>
              <div className="form-group mb-3">
                <TextField
                  type={pass ? "text" : "password"}
                  id="outlined-password-input"
                  label="Password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  value={password}
                />
                <div className="error-pop text-danger small">{passError}</div>
              </div>
              <div className="form-group mb-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pass}
                      onChange={() => setPass(!pass)}
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </div>
              <div className="form-buttons d-flex justify-content-between">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="login-button"
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
