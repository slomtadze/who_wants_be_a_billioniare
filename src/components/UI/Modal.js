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
          <h3>{props.text}</h3>
          <button onClick={props.onClose}>{props.button}</button>
          {props.buttonEnd && (
            <button onClick={props.onClose}>{props.buttonEnd}</button>
          )}
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
        <ModalOverlay
          onClose={props.onClose}
          text={props.text}
          button={props.button}
          buttonEnd={props.buttonEnd}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
