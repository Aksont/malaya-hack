import React from "react";
import Tag from "./tag";

const TagList = ({ tags, onDelete }) => {
  return (
    <div>
      {tags.map((tag, index) => (
        <Tag key={index} label={tag} onDelete={() => onDelete(tag)} />
      ))}
    </div>
  );
};

export default TagList;
