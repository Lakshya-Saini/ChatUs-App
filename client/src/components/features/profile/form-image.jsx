import React from "react";

const FormImage = (props) => {
  const { imagePreview, handleImageChange, date } = props;

  return (
    <React.Fragment>
      <div className="img-preview text-center mx-auto">
        <img
          src={imagePreview.props.src}
          id="profile-img-preview"
          alt="profile-img"
        />

        <div className="text-center mx-auto">
          <label htmlFor="upload-button">Upload Image</label>
        </div>
        <input
          id="upload-button"
          name="file"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <h6>Account Created On</h6>
        <h5>{date.substring(0, 10)}</h5>
      </div>
    </React.Fragment>
  );
};

export default FormImage;
