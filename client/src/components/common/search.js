import React from "react";
import Input2 from "./input2";

function Search(props) {
  const { id, type, name, placeholder, icon, value, handleChange } = props;

  return (
    <React.Fragment>
      <form>
        <Input2
          id={id}
          type={type}
          name={name}
          className="form-control shadow-none"
          placeholder={placeholder}
          icon={icon}
          value={value}
          handleChange={handleChange}
        />
      </form>
    </React.Fragment>
  );
}

export default Search;
