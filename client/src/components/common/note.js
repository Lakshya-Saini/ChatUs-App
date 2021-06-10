import React from "react";

const Note = (props) => {
  const { text } = props;

  return (
    <React.Fragment>
      <div className="form-group mb-0 mt-4">
        <p className="note">
          <strong>Note: </strong>
          {text}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Note;
