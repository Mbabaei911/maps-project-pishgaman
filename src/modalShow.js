import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
/////////////
////making modal for showing the result
function ModalComponent(props) {
  return (
    <Modal
      {...props}
      size="lg"
      labelled="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter "
          className="text-success "
        >
          نتیجه ثبت درخواست
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-muted text-center">
          درخواست شما با موفقیت ثبت شد.
          <br />
          شماره در خواست شما: {props.requestNumber}
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>بستن</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalComponent;
