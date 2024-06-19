import React from "react";
import { getStyle } from "../../util";
import { Color } from "../../constance";

const style = () => ({
  position: "absolute",
  width: "300px",
  left: "200px",
  bottom: "-60px",
  backgroundColor: Color.errorRed,
  color: Color.white,
  padding: "10px",
  borderRadius: "5px",
  pointerEvents: "none",
  border: "1px solid",
  zIndex: 1000,
});

const ErrorMessage = ({ children }) => {
  return <span style={getStyle(style())}>{children}</span>;
};

export default ErrorMessage;
