import React, { Component } from "react";
import { Dots } from "react-preloaders";
import { withRouter } from "react-router-dom";
import Navbar from "../common/navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import isEmpty from "is-empty";
import {
  userOTP,
  loading,
  checkPhoneNoVerified,
} from "../../actions/authActions";
import Input from "../common/input";
import Button from "../common/button";
import "../../App.css";

class Verify extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
    };
  }

  componentDidMount() {
    this.props.loading(false);

    if (this.props.auth.userRegistered) {
      toast.success("Your account created successfully");
    }
  }

  handleChange = (e) => {
    const otp = e.target.value;
    this.setState({ otp });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { otp } = this.state;

    if (isEmpty(this.state.otp)) return toast.error("Please enter your OTP");

    this.props.userOTP(otp, this.props.auth.user, this.props.history);
  };

  render() {
    return (
      <div className="container-fluid px-0">
        <Navbar />
        <div className="row mx-0">
          <div className="col-md-9 px-0 mx-auto">
            <div className="row mx-0">
              <ul className="progressbar">
                <li>Create Account</li>
                <li className="active">Verify Number</li>
              </ul>
            </div>
            <div className="row mx-0">
              <div className="verify-form-text text-center mx-auto mt-4">
                <h3>Verify your number</h3>
                <p>Enter code that has been sent on your registered number</p>
              </div>
            </div>
            <div className="row col-md-8 px-0 mx-auto mx-0">
              <div className="verify-form">
                <form onSubmit={this.handleSubmit}>
                  <Input
                    id="code"
                    type="number"
                    name="code"
                    placeholder="Enter Code"
                    icon="fa-code"
                    value={this.state.otp}
                    handleChange={this.handleChange}
                    handleFocusIn={() => {}}
                    handleFocusOut={() => {}}
                  />
                  <Button
                    type="submit"
                    value="Verify"
                    className="btn btn-block verify-btn shadow-none"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </div>
    );
  }
}

Verify.propTypes = {
  userOTP: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  checkPhoneNoVerified: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  userOTP,
  loading,
  checkPhoneNoVerified,
})(withRouter(Verify));
