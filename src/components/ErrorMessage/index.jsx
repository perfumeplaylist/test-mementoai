import React from "react";

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
  return <span style={getStyleType(style)}>{children}</span>;
};

export default ErrorMessage;
