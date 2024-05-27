import React from "react";
import { Badge } from "react-bootstrap";

const Tag = ({ label, onDelete }) => {
  return (
    <Badge pill variant="primary" className="m-1">
      {label}{" "}
      <span style={{ cursor: "pointer" }} onClick={onDelete}>
        &times;
      </span>
    </Badge>
  );
};

export default Tag;
