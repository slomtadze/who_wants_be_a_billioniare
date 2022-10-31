import { Fragment } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">
        {" "}
        <div className="container">
          <h3>მზად ხართ თამაშის დასაწყებად ?</h3>
          <button onClick={props.onClose}>დიახ</button>
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
