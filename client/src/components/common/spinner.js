import React from "react";
import loader from "./loader-2.gif";

export default () => {
  return (
    <div>
      <img
        src={loader}
        alt="Loading..."
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};
