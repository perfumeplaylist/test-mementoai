import React from "react";

const NumberBox = ({ count }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "-10px",
        right: "-10px",
        backgroundColor: "#4d8ffb",
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
      }}
    >
      {count}
    </div>
  );
};

export default NumberBox;
