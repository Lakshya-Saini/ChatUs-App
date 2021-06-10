import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import isEmpty from "is-empty";
import { toast } from "react-toastify";
import Input2 from "../../common/input2";
import Button from "../../common/button";
import Note from "../../common/note";
import { addGroup } from "../../../actions/authActions";

class CreateGroup extends Component {
  constructor() {
    super();
    this.state = {
      groupName: "",
      key: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { groupName, key } = this.state;

    if (isEmpty(groupName)) {
      return toast.error("Please enter group name");
    }

    if (isEmpty(key)) {
      return toast.error("Please enter your group join key");
    }

    this.props.addGroup(groupName, key, this.props.auth.user);
    this.setState({ groupName: "", key: "" });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row mx-0">
          <div className="col-md-12 px-0">
            <h5>
              Create Group <i className="fas fa-caret-right"></i>
            </h5>
            <form action="#" onSubmit={this.handleSubmit}>
              <Input2
                id="groupName"
                type="text"
                name="groupName"
                placeholder="Group Name"
                icon="fa-users"
                handleChange={this.handleChange}
                value={this.state.groupName}
              />
              <Input2
                id="key"
                type="password"
                name="key"
                placeholder="Group Join Key"
                icon="fa-key"
                handleChange={this.handleChange}
                value={this.state.key}
              />
              <div className="form-group">
                <Button
                  type="submit"
                  value="Create"
                  className="btn btn-block shadow-none create-group-btn"
                />
              </div>
              <Note text="Key that you'll create is used to join group by your friends." />
              <Note
                text="After you create a group, your friends can visit this page and
                in `Recently Added Groups` section they can search for the
                group."
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CreateGroup.propTypes = {
  addGroup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addGroup })(withRouter(CreateGroup));
