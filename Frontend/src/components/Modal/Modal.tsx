import "./Modal.css";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
}: ModalProps) {
  // If the modal isn't open, render nothing
  if (!isOpen) return null;

  return createPortal(
    <div className="modal_container">
      {/* stopPropagation prevents the modal from closing when clicking inside the box */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h3>{title}</h3>
          <button className="close_btn" onClick={onClose}>
            <IoClose className="close_icon" />
          </button>
        </div>

        <div className="modal_info">{children} </div>

        <div className="modal_footer">
          {secondaryLabel && (
            <button
              className="secondarybtn"
              onClick={onSecondaryClick || onClose}
            >
              {secondaryLabel}
            </button>
          )}
          {primaryLabel && (
            <button className="primarybtn" onClick={onPrimaryClick}>
              {primaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
