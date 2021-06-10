import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "is-empty";
import { toast } from "react-toastify";
import { submitProfile, loading } from "../../../actions/authActions";
import getCurrentUserFromSS from "../../../utils/getCurrentUserFromSS";
import setUserProfileImage from "../../../utils/setUserProfileImage";
import profileValidation from "../../validation/profileValidation";
import Form from "./form";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      imagePreviewUrl: "",
      image: "",
      fullName: "",
      phoneNumber: "",
      status: "",
      date: "",
    };
  }

  componentDidMount() {
    this.props.loading(false);

    let { image, name, phoneNumber, status, date } = getCurrentUserFromSS();

    this.setState({
      image,
      fullName: name,
      phoneNumber,
      status,
      date,
    });
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, status, imagePreviewUrl } = this.state;
    let profileData = {};

    let message = profileValidation(fullName, phoneNumber);
    if (message) return toast.error(message);

    if (!isEmpty(imagePreviewUrl)) {
      profileData = {
        fullName,
        status,
        image: imagePreviewUrl,
      };
    } else {
      profileData = {
        fullName,
        status,
      };
    }

    this.props.submitProfile(profileData, this.props.auth.user);
  };

  render() {
    let {
      imagePreviewUrl,
      image,
      fullName,
      phoneNumber,
      status,
      date,
    } = this.state;

    let imagePreview = setUserProfileImage(imagePreviewUrl, image);

    return (
      <div className="container-fluid px-0">
        <div className="col-md-12 px-0">
          <div className="profile">
            <Form
              imagePreview={imagePreview}
              fullName={fullName}
              phoneNumber={phoneNumber}
              status={status}
              date={date}
              handleSubmit={this.handleSubmit}
              handleImageChange={this.handleImageChange}
              handleChange={this.handleChange}
            />
          </div>
        </div>
        {this.props.auth.isLoading ? (
          <Dots color={"#0046d5"} customLoading={true} />
        ) : (
          <Dots color={"#0046d5"} customLoading={false} />
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  submitProfile: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  submitProfile,
  loading,
})(withRouter(Profile));
