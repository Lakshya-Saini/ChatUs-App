import React from "react";

const Textarea = (props) => {
  const { id, name, icon, placeholder, handleChange, status, row } = props;

  return (
    <React.Fragment>
      <div className="form-group input-icons">
        <i className={`fas ${icon} icon`}></i>
        <textarea
          name={name}
          id={id}
          className="form-control shadow-none"
          placeholder={placeholder}
          rows={row}
          onChange={handleChange}
          value={status}
        ></textarea>
      </div>
    </React.Fragment>
  );
};

export default Textarea;
