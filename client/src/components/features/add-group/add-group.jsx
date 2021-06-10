import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dots } from "react-preloaders";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import isEmpty from "is-empty";
import Groups from "./groups";
import JoinGroup from "./join-group";
import CreateGroup from "./create-group";
import {
  loading,
  fetchMyGroups,
  fetchAllGroups,
  setAllGroups,
  verifyGroupJoinKey,
  getJoinedGroups,
} from "../../../actions/authActions";
import VerifyKeyModal from "./verify-key-modal";

class AddGroup extends Component {
  constructor() {
    super();
    this.state = {
      searchGroupsText: "",
      showModal: false,
      groupName: "",
      groupKey: "",
      group_id: "",
    };
  }

  componentDidMount() {
    this.props.loading(false);
    this.props.fetchMyGroups(this.props.auth.user);
    this.props.fetchAllGroups(this.props.auth.user);
    this.props.getJoinedGroups(this.props.auth.user);
  }

  handleChange = (e) => {
    this.setState({
      searchGroupsText: e.target.value,
    });

    const searchedGroups = [];

    if (e.target.value) {
      this.props.auth.allGroups.forEach((group) => {
        if (
          group.groupName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          searchedGroups.push(group);
          this.props.setAllGroups(searchedGroups);
        } else {
          this.props.setAllGroups(searchedGroups);
        }
      });
    } else {
      this.props.fetchAllGroups(this.props.auth.user);
    }
  };

  handleClick = (e) => {
    const group_id = e.target.parentElement.parentElement.parentElement.getAttribute(
      "id"
    );

    const groupName = Array.from(
      Array.from(e.target.parentElement.parentElement.children)[1].children
    )[0].textContent;

    this.setState({ showModal: true, groupName, group_id });
  };

  hideModal = (e) => {
    this.setState({ showModal: false, groupName: "", group_id: "" });
  };

  handleKeyInputChange = (e) => {
    this.setState({ groupKey: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { group_id, groupKey } = this.state;

    if (isEmpty(groupKey)) {
      return toast.error("Please Enter Group Join Key");
    }

    const groupData = {
      group_id,
      groupKey,
    };

    this.props.verifyGroupJoinKey(groupData, this.props.auth.user);
    this.setState({
      showModal: false,
      group_id: "",
      groupKey: "",
      groupName: "",
    });
  };

  render() {
    return (
      <div className="container-fluid px-0">
        <div className="row mx-0">
          <div className="col-md-4 px-0">
            <div className="groups">
              <Groups
                groups={this.props.auth.myCreatedGroups}
                joinedGroups={this.props.auth.userJoinedGroups}
              />
            </div>
          </div>
          <div className="col-md-4 px-0">
            <div className="create-group">
              <CreateGroup />
            </div>
          </div>
          <div className="col-md-4 px-0">
            <div className="join-group">
              <JoinGroup
                allGroups={this.props.auth.allGroups}
                value={this.state.searchGroupsText}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
              />
            </div>
          </div>
        </div>
        <VerifyKeyModal
          show={this.state.showModal}
          onHide={this.hideModal}
          groupName={this.state.groupName}
          handleKeyInputChange={this.handleKeyInputChange}
          groupKey={this.state.groupKey}
          handleSubmit={this.handleSubmit}
        />
        <Dots color={"#0046d5"} customLoading={this.props.auth.isLoading} />
      </div>
    );
  }
}

AddGroup.propTypes = {
  loading: PropTypes.func.isRequired,
  fetchMyGroups: PropTypes.func.isRequired,
  fetchAllGroups: PropTypes.func.isRequired,
  setAllGroups: PropTypes.func.isRequired,
  verifyGroupJoinKey: PropTypes.func.isRequired,
  getJoinedGroups: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loading,
  fetchMyGroups,
  fetchAllGroups,
  setAllGroups,
  verifyGroupJoinKey,
  getJoinedGroups,
})(withRouter(AddGroup));
