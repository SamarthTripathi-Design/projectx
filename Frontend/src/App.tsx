import Header from "./components/Header/Header.tsx";
import "./App.css";
import useTheme from "./hooks/useTheme.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useContext } from "react";
import { EmployeeContext } from "./context/EmployeeContext.tsx";

const App = () => {
  const [theme, toggleTheme] = useTheme();
  const { modalDetails } = useContext(EmployeeContext);
  return (
    <div className={`app_container ${theme}`}>
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
    </div>
  );
};

export default App;
