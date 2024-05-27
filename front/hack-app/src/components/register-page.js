import * as React from "react";
import { useState, useCallback } from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form, Row, Col, Button } from "react-bootstrap";
import LabeledInput from "../forms/LabeledInput";
import { sendRegisterRequest } from "../api/api";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postRegisterRequest = useCallback(
    (e) => {
      e.preventDefault();
      const userJson = { name: firstName + " " + lastName, email, password };
      console.log(userJson);

      sendRegisterRequest(userJson).then(
        (response) => {
          console.log(response);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("id", response.data.uid);
          window.dispatchEvent(new Event("userUpdated"));
          navigate("/profile");
        },
        (error) => {
          alert("Invalid login");
        }
      );
    },
    [firstName, lastName, email, password, navigate]
  );

  const submitButtonPressed = (e) => {
    if (validateInput()) {
      postRegisterRequest(e);
    } else {
      console.log("Invalid input");
      alert("Invalid input");
    }
  };

  const validateInput = () => {
    // let valid = "name".length > 0 && "address".length > 0;
    let valid = true;

    return valid;
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" className="h4">
          Sign up
        </Typography>
        <Typography className="body2">
          Already have an account?{" "}
          <Link href="/login" underline="hover" className="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <Form>
        <LabeledInput
          value={firstName}
          label="First Name"
          inputName="firstName"
          placeholder="Type your first name"
          required
          onChangeFunc={setFirstName}
        />
        <LabeledInput
          value={lastName}
          label="Last Name"
          inputName="lastName"
          placeholder="Type your last name"
          required
          onChangeFunc={setLastName}
        />
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
            <Button className="formButton" onClick={submitButtonPressed}>
              Sign up
            </Button>
          </Col>
          <Col sm={4} />
        </Row>
      </Form>
    </Stack>
  );
}
