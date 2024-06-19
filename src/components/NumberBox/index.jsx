import React from "react";
import { getStyleType } from "../../util";

const style = (isError) => ({
  position: "absolute",
  top: "-10px",
  right: "-10px",
  backgroundColor: isError ? "#ff9999" : "#4d8ffb",
  color: "#ffffff",
  padding: "5px",
  width: "24px",
  height: "24px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  borderRadius: "50%",
  zIndex: "1000",
  border: "1px solid white",
});

const NumberBox = ({ count, isError }) => {
  return <div style={getStyleType(style(isError))}>{count}</div>;
};

export default NumberBox;
