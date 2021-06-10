import React from "react";

const Button2 = (props) => {
  const { type, className, handleLink, value } = props;

  return (
    <React.Fragment>
      <button type={type} className={className} onClick={handleLink}>
        {value}
      </button>
    </React.Fragment>
  );
};

export default Button2;
