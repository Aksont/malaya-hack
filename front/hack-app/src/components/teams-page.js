import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Link from "@mui/material/Link";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import {
  getTeams,
  getIsUserPartOfTeam,
  getUser,
  getTeamMembers,
} from "../api/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isInTeam, setIsInTeam] = useState(true);

  useEffect(() => {
    getTeams().then((response) => {
      console.log("teams");
      console.log(response);
      setTeams(!!response ? response.data : []);
    });

    // getIsUserPartOfTeam().then((response) => {
    //   setIsInTeam(!!response ? response.data : false);
    // });
  }, []);

  const handleAccordionClick = (e) => {
    const teamId = e.currentTarget.getAttribute("teamId");
    let team = teams.find((team) => team.id === teamId);
    getTeamMembers(teamId).then((response) => {
      console.log("members");
      console.log(response);
      team.members = response.data.members;
      const indexOfTeam = teams.indexOf(teamId);
      if (indexOfTeam !== -1) {
        teams[indexOfTeam] = team;
      }

      setTeams(teams);
      console.log("teams updated");
      console.log(teams);
    });
  };

  const handleJoinTeam = (e) => {
    const teamId = e.currentTarget.getAttribute("teamId");
    console.log("teamId");
    console.log(teamId);
    // let team = teams.find((team) => team.id === teamId);

    // getTeamMembers(teamId).then((response) => {
    //   console.log("members");
    //   console.log(response);
    //   team.members = response.data.members;
    //   const indexOfTeam = teams.indexOf(teamId);
    //   if (indexOfTeam !== -1) {
    //     teams[indexOfTeam] = team;
    //   }
    //   setTeams(teams);
    //   console.log(teams);
    // });
  };

  return (
    <div>
      {teams.map((team, index) => (
        <Accordion key={team.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            teamId={team.id}
            onClick={handleAccordionClick}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{team.name}</Typography>
              {!isInTeam && (
                <Button
                  className="formButton"
                  teamId={team.id}
                  onClick={handleJoinTeam}
                >
                  Join
                </Button>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {team.members.map((user, idx) => (
                <div key={idx}>
                  <ListItem alignItems="flex-start">
                    <Link
                      href={"/members/" + user.id}
                      underline="hover"
                      className="subtitle2"
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={user.name}
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                    </Link>
                    <ListItemText
                      primary={`${user.name}`}
                      secondary={
                        <React.Fragment>
                          {!!user.background && (
                            <Typography
                              sx={{ display: "block" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {user.background}
                            </Typography>
                          )}
                          {!!user.skills && (
                            <Typography
                              sx={{ display: "block" }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              Skills: {user.skills.join(", ")}
                            </Typography>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
