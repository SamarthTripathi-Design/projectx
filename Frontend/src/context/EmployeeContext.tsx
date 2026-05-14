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

      if (response.ok) {
        const data = await response.json(); // Parse BEFORE dismissing
        CustomToast(
          "Saving Completed",
          "success",
          "OK",
          Infinity,
          toastId,
          () => {
            fetchEmployees(); // Added parentheses to actually RUN the function
          },
        );

        return data; // Return here
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
