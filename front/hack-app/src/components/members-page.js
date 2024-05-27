"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "@mui/material/Link";
import { getParticipants } from "../api/api";

export function MembersPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getParticipants().then((response) => {
      setRows(!!response ? response.data : []);
    });
  }, []);

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Background</TableCell>
              <TableCell>Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell href={"/members/" + row.email}>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Avatar src={row.name} alt={row.name} />
                      <Link
                        href={"/members/" + row.id}
                        underline="hover"
                        className="subtitle2"
                      >
                        <Typography className="subtitle2">
                          {row.name}
                        </Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{!!row.background && row.background}</TableCell>
                  <TableCell>{!!row.skills && row.skills.join(", ")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
