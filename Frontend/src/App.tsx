import Header from "./components/Header/Header.tsx";
import "./App.css";
import useTheme from "./hooks/useTheme.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useContext } from "react";
import { EmployeeContext } from "./context/EmployeeContext.tsx";
import { Toaster } from "react-hot-toast";
import Overlay from "./components/overlay/Overlay.tsx";

const App = () => {
  const [theme, toggleTheme] = useTheme();
  const { modalDetails } = useContext(EmployeeContext);
  return (
    <div className={`app_container ${theme}`}>
      <Overlay />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className="app">
        <AdminDashboard />
      </div>
      <Modal
        isOpen={modalDetails.isOpen}
        title={modalDetails.title}
        onClose={modalDetails.onClose}
        children={modalDetails.children}
        primaryLabel={modalDetails.primaryLabel}
        onPrimaryClick={modalDetails.onPrimaryClick}
        secondaryLabel={modalDetails.secondaryLabel}
        onSecondaryClick={modalDetails.onSecondaryClick}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-elements)",
            color: "var(--color-text)",
            // padding: "16px 24px",
          },
        }}
      />
    </div>
  );
};

export default App;
