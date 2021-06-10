import React from "react";

const Input3 = (props) => {
  const {
    handleChange,
    icon,
    id,
    placeholder,
    name,
    keyPress,
    type,
    value,
  } = props;

  return (
    <React.Fragment>
      <div className="form-group input-icons">
        <i className={`fas ${icon} icon`}></i>
        <input
          autoComplete="off"
          className="form-control input-field shadow-none"
          id={id}
          name={name}
          onChange={handleChange}
          onKeyPress={keyPress}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </React.Fragment>
  );
};

export default Input3;
