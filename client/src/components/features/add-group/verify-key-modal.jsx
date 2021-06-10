import React from "react";
import { Modal } from "react-bootstrap";
import Input2 from "../../common/input2";
import Button from "../../common/button";

const VerifyKeyModal = (props) => {
  const {
    show,
    onHide,
    groupName,
    handleKeyInputChange,
    groupKey,
    handleSubmit,
  } = props;

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {groupName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Input2
              id="key"
              type="password"
              name="key"
              placeholder="Enter Group Join Key"
              icon="fa-key"
              handleChange={handleKeyInputChange}
              value={groupKey}
            />
            <Button
              type="submit"
              className="btn btn-block join-group-btn-modal shadow-none"
              value="Join Group"
            />
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default VerifyKeyModal;
