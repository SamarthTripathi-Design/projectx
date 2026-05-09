import "./Overlay.css";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";

function Overlay() {
  const { loading } = useContext(EmployeeContext);

  if (!loading) return null;

  return createPortal(
    <div className={`overlay ${loading ? "active" : ""}`}></div>,
    document.body,
  );
}

export default Overlay;
