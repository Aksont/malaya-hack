import React from "react";
import "../../assets/styles/nav.css";
import { Nav, Navbar } from "react-bootstrap";

export default function GuestNavbar() {
  return (
    <Navbar
      bg="darkBlue"
      variant="dark"
      sticky="top"
      expand="md"
      collapseOnSelect
    >
      <Navbar.Brand>ImpactXchange2024</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="ps-2">
        <Nav className="ms-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
