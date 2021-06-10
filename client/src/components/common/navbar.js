import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Links from "./link";
import Button2 from "./button2";
import "../../App.css";

class Navbar extends Component {
  handleLink = (e) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar sticky-top">
          <Links className="navbar-brand" path="/" value="ChatUs" />
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Button2
                  type="button"
                  className="btn shadow-none nav-link text-white"
                  handleLink={this.handleLink}
                  value="Logout"
                />
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
