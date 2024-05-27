"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { getUser } from "../api/api";

export function MemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState();

  // useEffect(() => {
  //   setMember({
  //     name: "Salsabeel",
  //     lastname: "Tantoush",
  //     email: "salsa@gmail.com",
  //     background: "Software Engineering",
  //     skills: ["Node.js", "GCP"],
  //   });
  // }, []);

  useEffect(() => {
    if (!!id) {
      getUser(id).then((response) => {
        console.log(response);
        setMember(!!response ? response.data : {});
      });
    }
  }, [id]);

  if (!!member) {
    return (
      <>
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <Avatar
              src={member.name}
              sx={{
                width: 200,
                height: 200,
              }}
            />
          </Col>
          <Col sm={4} />
        </Row>
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <div className="inputLabel">
              {member.name} {member.lastname}
            </div>
          </Col>
          <Col sm={4} />
        </Row>
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <div className="inputLabel">{member.background}</div>
          </Col>
          <Col sm={4} />
        </Row>
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            <div className="inputLabel">{member.email}</div>
          </Col>
          <Col sm={4} />
        </Row>
        <Row className="mt-2">
          <Col sm={1} />
          <Col sm={10} align="center">
            <hr
              style={{
                color: "white",
                backgroundColor: "white",
                height: 1,
              }}
            />
          </Col>
          <Col sm={1} />
        </Row>
        <Row className="mt-2">
          <Col sm={4} />
          <Col sm={4} align="center">
            {!!member.skills && (
              <div className="inputLabel">{member.skills.join(", ")}</div>
            )}
          </Col>
          <Col sm={4} />
        </Row>
      </>
    );
  }
}
