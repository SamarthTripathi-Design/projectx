import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Employee, ModalState, EmpFormstate } from "../types";
import { CustomToast } from "../components/CustomToast/CustomToast";
import toast from "react-hot-toast";

// 1. Define what the Context "Store" looks like
interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  fetchEmployees: () => Promise<void>;
  modalDetails: ModalState;
  setModalDetails: React.Dispatch<React.SetStateAction<ModalState>>;
  empFormData: EmpFormstate;
  setEmpFormData: React.Dispatch<React.SetStateAction<EmpFormstate>>;
  saveEmployee: (data: EmpFormstate) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  updateEmployee: (data: Employee) => Promise<void>;
}

// 2. Create the Context with an undefined default
export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined,
);

// 3. The Provider Component
export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<ModalState>({
    isOpen: false,
    onClose: () => {},
    title: "",
    children: null,
  });
  const [empFormData, setEmpFormData] = useState<EmpFormstate>({
    name: "",
    email: "",
    department: "",
    location: "",
    employmentType: "",
    doj: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    const toastId = CustomToast("Loading...", "loading");

    try {
      const response = await fetch("http://localhost:5000/api/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        toast.dismiss(toastId);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      CustomToast(errorMsg, "error", "OK", Infinity, toastId, () =>
        setLoading(false),
      );
    }
  };

  const saveEmployee = async (employeeData: EmpFormstate) => {
    setLoading(true);
    const toastId = CustomToast("Saving...", "loading");
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...employeeData,
          status: "active",
          salary: "900000",
        }),
      });
      setModalDetails({
        isOpen: false,
        onClose: () => {},
        title: "",
      });

      if (response.ok) {
        const data = await response.json();
        CustomToast(
          "Saving Completed",
          "success",
          "OK",
          Infinity,
          toastId,
          () => {
            fetchEmployees();
          },
        );

        return data;
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.error || "Failed to save employee";
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      CustomToast(errorMsg, "error", "OK", Infinity, toastId, () =>
        setLoading(false),
      );
    }
  };

  const deleteEmployee = async (id: string) => {
    setLoading(true);
    const toastId = CustomToast("Deleting...", "loading");
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "Delete",
        },
      );
      setModalDetails({
        isOpen: false,
        onClose: () => {},
        title: "",
      });

      if (response.ok) {
        const data = await response.json();
        CustomToast(
          "Employee Deleted Sucessfully",
          "success",
          "OK",
          Infinity,
          toastId,
          () => {
            fetchEmployees();
          },
        );
        return data;
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.error || "Failed to delete employee";
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      CustomToast(errorMsg, "error", "OK", Infinity, toastId, () =>
        setLoading(false),
      );
    }
  };

  const updateEmployee = async (employeeData: Employee) => {
    setLoading(true);
    const toastId = CustomToast("Updating...", "loading");
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeData.id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employeeData,
          }),
        },
      );
      setModalDetails({
        isOpen: false,
        onClose: () => {},
        title: "",
      });
      if (response.ok) {
        const data = await response.json();
        CustomToast(
          "Update Completed",
          "success",
          "OK",
          Infinity,
          toastId,
          () => {
            fetchEmployees();
          },
        );

        return data;
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.error || "Failed to update employee";
        throw new Error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      CustomToast(errorMsg, "error", "OK", Infinity, toastId, () =>
        setLoading(false),
      );
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        fetchEmployees,
        modalDetails,
        setModalDetails,
        empFormData,
        setEmpFormData,
        saveEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
