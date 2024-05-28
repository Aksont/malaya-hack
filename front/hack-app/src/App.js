import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import GuestNavbar from "./components/navbars/GuestNavbar";
import UserNavbar from "./components/navbars/UserNavbar";

import UnavailablePage from "./components/unavailable-page";
import { RegisterPage } from "./components/register-page";
import { LoginPage } from "./components/login-page";
import { MemberPage } from "./components/member-page";
import { SetProfilePage } from "./components/set-profile-page";
import { MembersPage } from "./components/members-page";
import TeamsPage from "./components/teams-page";
import LogoutPage from "./components/navbars/LogoutPage";

import { ThemeProvider } from "@mui/material";
import theme from './theme';

function App() {
  const registerPage = (
    <Container>
      <RegisterPage />
    </Container>
  );

  const loginPage = (
    <Container>
      <LoginPage />
    </Container>
  );

  const setProfilePage = (
    <Container>
      <SetProfilePage />
    </Container>
  );

  const membersPage = (
    // <Container >
      <MembersPage />
    // {/* </Container> */}
  );

  const memberPage = (
    <Container>
      <MemberPage />
    </Container>
  );

  const teamsPage = (
    <Container>
      <TeamsPage />
    </Container>
  );

  const unavailablePage = (
    <Container>
      <UnavailablePage />
    </Container>
  );

  const logoutPage = (
    <Container>
      <LogoutPage />
    </Container>
  );

  const [navBar, setNavBar] = useState(getNavbarByUserType());

  window.addEventListener("userUpdated", () => {
    setNavBar(getNavbarByUserType());
  });

  function getNavbarByUserType() {
    let email = sessionStorage.getItem("email");
    // console.log(!!email);

    if (!!email) {
      return <UserNavbar />;
    } else {
      return <GuestNavbar />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {navBar}
        <Routes>
          <Route path="">
            <Route path="/register" element={registerPage} />
            <Route path="/login" element={loginPage} />
            <Route path="/profile" element={setProfilePage} />
            <Route path="/members" element={membersPage} />
            <Route path="/members/:id" element={memberPage} />
            <Route path="/teams" element={teamsPage} />
            <Route path="/logout" element={logoutPage} />
            <Route path="/*" element={unavailablePage} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
