import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Input from "../common/input";
import Button from "../common/button";
import Links from "../common/link";
import ValidationText from "../common/validation-text";
import { registerUserForm, loading } from "../../actions/authActions";
import registerValidation from "../validation/registerValidation";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      validation: {
        showFullNameValidation: false,
        showPasswordValidation: false,
      },
    };
  }

  componentDidMount() {
    this.props.loading(false);

    if (sessionStorage.getItem("jwtToken")) {
      this.props.history.push("/chat");
    }
  }

  handleFocusIn = (e) => {
    let validation = { ...this.state.validation };

    if (e.target.id === "fullName") {
      var showFullNameValidation = { ...validation.showFullNameValidation };
      showFullNameValidation = true;
      validation.showFullNameValidation = showFullNameValidation;
    }

    if (e.target.id === "password") {
      var showPasswordValidation = { ...validation.showPasswordValidation };
      showPasswordValidation = true;
      validation.showPasswordValidation = showPasswordValidation;
    }

    this.setState({ validation });
  };

  handleFocusOut = (e) => {
    let validation = { ...this.state.validation };

    if (e.target.id !== "fullName" || e.target.id !== "password") {
      var showFullNameValidation = { ...validation.showFullNameValidation };
      var showPasswordValidation = { ...validation.showPasswordValidation };
      showFullNameValidation = false;
      showPasswordValidation = false;
      validation.showFullNameValidation = showFullNameValidation;
      validation.showPasswordValidation = showPasswordValidation;
    }

    this.setState({ validation });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, password, confirmPassword } = this.state;

    let message = registerValidation(
      fullName,
      phoneNumber,
      password,
      confirmPassword
    );
    if (message) return toast.error(message);

    const userData = {
      fullName,
      phoneNumber,
      password,
    };

    this.props.registerUserForm(userData, this.props.history);
  };

  render() {
    const {
      fullName,
      phoneNumber,
      password,
      confirmPassword,
      validation,
    } = this.state;

    return (
      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-md-7 side-form px-0">
            <div className="side-form-text">
              <h3>Welcome to ChatUs</h3>
              <p>Create your account and start chatting with your friends</p>
            </div>
          </div>
          <div className="col-md-5 form px-0">
            <div className="form-text">
              <h3 className="text-left">Register</h3>
              <form className="p-0" onSubmit={this.handleSubmit}>
                <Input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  icon="fa-user"
                  handleChange={this.handleChange}
                  value={fullName}
                  handleFocusIn={this.handleFocusIn}
                  handleFocusOut={this.handleFocusOut}
                />
                {validation.showFullNameValidation && (
                  <ValidationText text="Full Name must be atleast 2 characters" />
                )}

                <Input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  icon="fa-phone"
                  handleChange={this.handleChange}
                  value={phoneNumber}
                />

                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  icon="fa-key"
                  handleChange={this.handleChange}
                  value={password}
                  handleFocusIn={this.handleFocusIn}
                  handleFocusOut={this.handleFocusOut}
                />
                {validation.showPasswordValidation && (
                  <ValidationText text="Password must be atleast 6 characters & should contain atleast 1 uppercase, lowercase, numbers and special characters" />
                )}

                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  icon="fa-key"
                  handleChange={this.handleChange}
                  value={confirmPassword}
                />

                <Button
                  type="submit"
                  className="btn btn-lg shadow-none w-100 user-register"
                  value="Register"
                />

                <Links
                  className="btn register shadow-none"
                  path="/login"
                  value="Already have an account? Login"
                />
              </form>
            </div>
          </div>
        </div>
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </div>
    );
  }
}

Register.propTypes = {
  registerUserForm: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUserForm, loading })(
  withRouter(Register)
);
