import React from "react";
import { getStyle } from "../../util";
import { Color } from "../../constance";
const style = (isError) => ({
  position: "absolute",
  top: "-10px",
  right: "-10px",
  backgroundColor: isError ? Color.errorRed : Color.numberBlue,
  color: Color.white,
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
  return <div style={getStyle(style(isError))}>{count}</div>;
};

export default NumberBox;
