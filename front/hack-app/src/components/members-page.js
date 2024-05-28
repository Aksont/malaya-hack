"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import { getParticipants } from "../api/api";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';


export function MembersPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getParticipants().then((response) => {
      console.log(response.data)
      setRows(!!response ? response.data : []);
    });
  }, []);

  const navigate = useNavigate();

  const handleRowClick = (params) => {
    const id = params.row['id'];
    navigate(`/members/${id}`);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'skills', headerName: 'Skills', flex: 1 },
    { field: 'interests', headerName: 'Interests', flex: 1 },
    { field: 'academicBackground', headerName: 'Academic background', flex: 1 },
  ];

  return (
    <Box sx={{ height: '100%', margin: '1em 10%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
      />
    </Box>
  );
}