import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/api";
import { Typography } from "@mui/material";
import { Col } from "react-bootstrap";

export function MemberPage() {
  const { id } = useParams();
  const [member, setMember] = useState();

  useEffect(() => {
    if (id) {
      getUser(id).then((response) => {
        setMember(response?.data || {});
      });
    }
  }, [id]);

  return member ? (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '1em' }}>
      <Avatar src={member.name} sx={{ width: 200, height: 200 }} />
      <div style={{height: '1em'}}/>
      <Typography variant="h5">{member.name}</Typography>
      <div className="inputLabel">{member.background}</div>
      <div className="inputLabel">{member.email}</div>
      <hr style={{ color: "white", backgroundColor: "white", height: 1, width: "30%" }} />
      <_Info label='Name' data={member.name}/>
      {!!member.academicBackground && <_Info label='Academic background' data={member.academicBackground}/>}
      {!!member.email && <_Info label='Email' data={member.email}/>}
      {!!member.skills && <_Info label='Skills' data={member.skills.join(", ")}/>}
      {!!member.interests && <_Info label='Interests' data={member.interests.join(", ")}/>}
    </div>
  ) : null;
}

export function _Info({label, data}){
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",}}>
      <Typography style={{fontWeight: 'bold'}}>{label}</Typography>
      <Typography>{data}</Typography>
    </div>
  );
}
