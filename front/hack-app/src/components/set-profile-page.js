import * as React from "react";
import { useState, useCallback } from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Form, Row, Col, Button } from "react-bootstrap";
import { SmallLabeledInput } from "../forms/LabeledInput";
import TagList from "./tag/tag-list";
import "../assets/styles/form.css";
import { useNavigate } from "react-router-dom";
import { sendSetProfileRequest } from "../api/api";

export function SetProfilePage() {
  const [academicBackground, setAcademicBackground] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sustainabilityInterests, setSustainabilityInterests] = useState([]);
  const [selectedSustainabilityInterest, setSelectedSustainabilityInterest] =
    useState("");
  const navigate = useNavigate();

  const handleSelectAcademicBg = (e) => {
    setAcademicBackground(e.target.value);
  };

  const handleSelectInterest = (e) => {
    setSelectedSustainabilityInterest(e.target.value);
  };

  const submitButtonPressed = (e) => {
    if (validateInput()) {
      console.log(academicBackground);
      console.log(skills);
      console.log(sustainabilityInterests);
      postSetProfileRequest(e);
    } else {
      console.log("Invalid input");
      alert("Invalid input");
    }
  };

  const postSetProfileRequest = useCallback(
    (e) => {
      e.preventDefault();
      const userJson = {
        uid: sessionStorage.getItem("id"),
        academicBackground,
        skills,
        interests: sustainabilityInterests,
      };
      console.log(userJson);

      sendSetProfileRequest(userJson).then(
        (response) => {
          navigate("/teams");
        },
        (error) => {
          alert("Invalid");
        }
      );
    },
    [academicBackground, skills, sustainabilityInterests, navigate]
  );

  const validateInput = () => {
    // let valid = "name".length > 0 && "address".length > 0;
    let valid = true;

    return valid;
  };

  const handleDeleteSkill = (tagToDelete) => {
    setSkills(skills.filter((tag) => tag !== tagToDelete));
  };

  const handleAddSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
    setSelectedSkill("");
  };

  const handleDeleteInterest = (tagToDelete) => {
    setSustainabilityInterests(
      sustainabilityInterests.filter((tag) => tag !== tagToDelete)
    );
  };

  const handleAddInterest = () => {
    if (
      selectedSustainabilityInterest &&
      !sustainabilityInterests.includes(selectedSustainabilityInterest)
    ) {
      setSustainabilityInterests([
        ...sustainabilityInterests,
        selectedSustainabilityInterest,
      ]);
    }
    setSelectedSustainabilityInterest("");
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4" className="h4">
          Set up your profile
        </Typography>
        <Typography className="body2">
          Do you want to do this later?{" "}
          <Link href="/teams" underline="hover" className="subtitle2">
            Skip
          </Link>
        </Typography>
      </Stack>
      <Form>
        <Form.Label className="inputLabel">Academic background</Form.Label>
        <Form.Select
          className="custom-select"
          onChange={handleSelectAcademicBg}
        >
          <option value="Software Engineering">Software Engineering</option>
          <option value="Business and Management">
            Business and Management
          </option>
          <option value="Sustainable Development">
            Sustainable Development
          </option>
          <option value="Design and UX">Design and UX</option>
          <option value="Other">Other</option>
        </Form.Select>

        <Row className="mt-2">
          <Col sm={8}>
            <SmallLabeledInput
              value={selectedSkill}
              label="Skill"
              inputName="selectedSkill"
              placeholder="Type your skill"
              onChangeFunc={setSelectedSkill}
            />
          </Col>
          <Col sm={4} align="center">
            <Button className="formButton" onClick={handleAddSkill}>
              Add skill
            </Button>
          </Col>
        </Row>
        <TagList tags={skills} onDelete={handleDeleteSkill} />

        <Row className="mt-2">
          <Col sm={8}>
            <Form.Select
              className="custom-select"
              onChange={handleSelectInterest}
            >
              <option value="Food Waste">Food Waste</option>
              <option value="Culture Preservation">Culture Preservation</option>
              <option value="Global Warming">Global Warming</option>
              <option value="Plastic Pollution">Plastic Pollution</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Green Business">Green Business</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Col>
          <Col sm={4} align="center">
            <Button className="formButton" onClick={handleAddInterest}>
              Add interest
            </Button>
          </Col>
        </Row>
        <TagList
          tags={sustainabilityInterests}
          onDelete={handleDeleteInterest}
        />

        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <Button className="formButton" onClick={submitButtonPressed}>
              Save profile
            </Button>
          </Col>
          <Col sm={4} />
        </Row>
      </Form>
    </Stack>
  );
}
