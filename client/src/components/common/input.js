import React from "react";

const Input = (props) => {
  const {
    icon,
    id,
    type,
    name,
    placeholder,
    handleChange,
    handleFocusIn,
    handleFocusOut,
    value,
  } = props;

  return (
    <React.Fragment>
      <div className="form-group input-icons">
        <i className={`fas ${icon} icon`}></i>
        <input
          id={id}
          type={type}
          className="form-control input-field shadow-none"
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          value={value}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
