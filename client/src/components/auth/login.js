import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Input from "../common/input";
import Button from "../common/button";
import Links from "../common/link";
import { loginUserForm, loading } from "../../actions/authActions";
import loginValidation from "../validation/loginValidation";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      password: "",
    };
  }

  componentDidMount() {
    this.props.loading(false);

    if (sessionStorage.getItem("jwtToken")) {
      this.props.history.push("/chat");
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { phoneNumber, password } = this.state;

    let message = loginValidation(phoneNumber, password);
    if (message) return toast.error(message);

    const userData = {
      phoneNumber,
      password,
    };

    this.props.loginUserForm(userData, this.props.history);
  };

  render() {
    const { phoneNumber, password } = this.state;

    return (
      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-md-7 side-form px-0">
            <div className="side-form-text">
              <h3>Welcome to ChatUs</h3>
              <p>Log in now and start chatting with your friends</p>
            </div>
          </div>
          <div className="col-md-5 form px-0">
            <div className="form-text">
              <h3 className="text-left">Login</h3>
              <form className="p-0" onSubmit={this.handleSubmit}>
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
                />

                <Button
                  type="submit"
                  className="btn btn-lg shadow-none w-100 user-login"
                  value="Login"
                />

                <Links
                  className="btn register shadow-none"
                  path="/register"
                  value="Don't have an account? Register"
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

Login.propTypes = {
  loginUserForm: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUserForm, loading })(
  withRouter(Login)
);
