import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form, Row, Col, Button } from "react-bootstrap";
import LabeledInput from "../forms/LabeledInput";
import { sendLoginRequest } from "../api/api";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginButtonPressed = (e) => {
    if (validateInput()) {
      console.log(email);
      console.log(password);
      postLoginRequest(e);
    } else {
      console.log("Invalid input");
      alert("Invalid input");
    }
  };

  const postLoginRequest = useCallback(
    (e) => {
      e.preventDefault();
      const userJson = { email, password };
      console.log(userJson);

      sendLoginRequest(userJson).then(
        (response) => {
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("id", response.data.uid);
          window.dispatchEvent(new Event("userUpdated"));
          navigate("/teams");
        },
        (error) => {
          alert("Invalid login");
        }
      );
    },
    [email, password, navigate]
  );

  const validateInput = () => {
    let valid = email.length > 0 && password.length > 0;

    return valid;
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" className="h4">
          Sign in
        </Typography>
        <Typography className="body2">
          Don't have an account?{" "}
          <Link href="/register" underline="hover" className="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <Form>
        <LabeledInput
          value={email}
          label="Email"
          inputName="email"
          placeholder="Type your email"
          required
          onChangeFunc={setEmail}
        />
        <LabeledInput
          value={password}
          label="Password"
          inputName="password"
          placeholder="Type your password"
          required
          onChangeFunc={setPassword}
        />
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <Button className="formButton" onClick={loginButtonPressed}>
              Sign in
            </Button>
          </Col>
          <Col sm={4} />
        </Row>
      </Form>
    </Stack>
  );
}
