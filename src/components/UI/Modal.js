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
          <h3>{props.title}</h3>
          {props.buttonText && (
            <button onClick={props.onGameStart}>{props.buttonText}</button>
          )}
          {props.buttonEndText && (
            <button onClick={props.onButtonEnd}>{props.buttonEndText}</button>
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
          onGameStart={props.onGameStart}
          title={props.title}
          buttonText={props.buttonText}
          buttonEndText={props.buttonEndText}
          onButtonEnd={props.onButtonEnd}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
