import React from "react";
import "../../assets/styles/nav.css";
import { Nav, Navbar } from "react-bootstrap";

export default function UserNavbar() {
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
          <Nav.Link href="/teams">Teams</Nav.Link>
          <Nav.Link href="/members">Members</Nav.Link>
          <Nav.Link href={"/members/" + sessionStorage.getItem("id")}>
            My profile
          </Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
