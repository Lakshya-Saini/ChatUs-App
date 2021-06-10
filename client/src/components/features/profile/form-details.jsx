import React from "react";
import Input2 from "../../common/input2";
import Textarea from "../../common/textarea";
import Button from "../../common/button";

const FormDetails = (props) => {
  const { handleChange, fullName, phoneNumber, status } = props;

  return (
    <React.Fragment>
      <h5>Edit Profile</h5>
      <Input2
        id="fullName"
        name="fullName"
        icon="fa-user"
        type="text"
        placeholder="Full Name"
        handleChange={handleChange}
        value={fullName}
      />
      <Input2
        id="phoneNumber"
        name="phoneNumber"
        icon="fa-phone-alt"
        type="number"
        placeholder="Phone Number"
        handleChange={handleChange}
        value={phoneNumber}
      />
      <Textarea
        id="status"
        name="status"
        icon="fa-sticky-note"
        placeholder="Status"
        handleChange={handleChange}
        status={status}
        row="5"
      />
      <Button
        type="submit"
        className="btn btn-block profile-submit-btn shadow-none"
        value="Update Profile"
      />
    </React.Fragment>
  );
};

export default FormDetails;
