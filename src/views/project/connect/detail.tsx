import React from "react";
import { useLocation } from "react-router-dom";

const ConnectDetail: React.FC = () => {
  const { state } = useLocation();
  console.log(state, "state");

  return <div>detail</div>;
};

export default ConnectDetail;
