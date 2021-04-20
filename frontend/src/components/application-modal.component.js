import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import PermissionForm from "./permission-form.component";
import { render } from 'react-dom';
import { Dropdown } from "react-bootstrap"

function ShowPermissionModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>
        Apply for a RiderPass
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DH World RiderPass Application</Modal.Title>
        </Modal.Header>
        <Modal.Body><PermissionForm /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowPermissionModal;