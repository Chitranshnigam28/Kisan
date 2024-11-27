import React from "react";
import "../css/modal.css";

const Modal = ({ message, type, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">{message}</div>
        <div className="modal-footer">
          <button
            onClick={onClose}
            className={type === "error" ? "error" : ""}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
