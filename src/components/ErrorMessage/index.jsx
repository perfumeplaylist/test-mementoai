import React from "react";
import { getStyle } from "../../util";

const style = () => ({
  position: "absolute",
  width: "300px",
  left: "200px",
  bottom: "-60px",
  backgroundColor: "#ff9999",
  color: "#ffffff",
  padding: "10px",
  borderRadius: "5px",
  border: `1px solid #cc0000`,
  pointerEvents: "none",
  zIndex: 1000,
});

const ErrorMessage = ({ children }) => {
  return <span style={getStyle(style())}>{children}</span>;
};

export default ErrorMessage;
