import React from "react";
import FormImage from "./form-image";
import FormDetails from "./form-details";

const Form = (props) => {
  const {
    imagePreview,
    fullName,
    phoneNumber,
    status,
    date,
    handleSubmit,
    handleImageChange,
    handleChange,
  } = props;

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row mx-0">
        <div className="col-md-3">
          <FormImage
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            date={date}
          />
        </div>
        <div className="col-md-9">
          <FormDetails
            handleChange={handleChange}
            fullName={fullName}
            phoneNumber={phoneNumber}
            status={status}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
