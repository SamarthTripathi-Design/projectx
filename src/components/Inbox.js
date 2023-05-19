import React from "react";
import { useParams } from "react-router-dom";

const Inbox = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Inbox;
