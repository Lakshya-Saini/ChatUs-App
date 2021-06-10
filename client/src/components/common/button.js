import React from "react";

const Button = (props) => {
  const { type, className, value } = props;
  return (
    <React.Fragment>
      <div className="form-group">
        <button type={type} className={className}>
          {value}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Button;
