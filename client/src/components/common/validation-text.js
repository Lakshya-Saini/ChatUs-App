import React from "react";

const ValidationText = (props) => {
  const { text } = props;

  return (
    <React.Fragment>
      <div className="validation-text">{text}</div>
    </React.Fragment>
  );
};

export default ValidationText;
