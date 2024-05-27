import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
  getUser,
  getTeamMembers,
  sendPostJoinTeam,
} from "../api/api";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState();
  const [isInTeam, setIsInTeam] = useState();

  useEffect(() => {
    getTeams().then((response) => {
      setTeams(!!response ? response.data : []);
    });
  }, []);

  useEffect(() => {
    for (const team of teams) {
      if (team.members.includes(sessionStorage.getItem("id"))) {
        setIsInTeam(true);
        break;
      }
    }
  }, [teams]);

  const handleAccordionClick = (e) => {
    const teamId = e.currentTarget.getAttribute("teamId");
    getTeamMembers(teamId).then((response) => {
      let members_;
      console.log(members);
      if (members === undefined) {
        members_ = {};
      } else {
        members_ = JSON.parse(JSON.stringify(members));
      }
      members_[teamId] = response.data.members;
      setMembers(members_);
    });
  };

  const handleJoinTeam = (e) => {
    const teamId = e.currentTarget.getAttribute("teamId");

    sendPostJoinTeam(teamId, sessionStorage.getItem("id")).then(
      (responseJoinTeam) => {
        console.log(responseJoinTeam);

        getUser(sessionStorage.getItem("id")).then((responseUser) => {
          console.log(responseUser);
          let members_ = JSON.parse(JSON.stringify(members));
          members_[teamId].push(responseUser);
          setMembers(members_);
          setIsInTeam(true);
        });
      }
    );
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
          {!!members && !!members[team.id] && (
            <AccordionDetails>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {members[team.id].map((user, idx) => (
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
          )}
        </Accordion>
      ))}
    </div>
  );
}
