import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Employee, ModalState, EmpFormstate } from "../types";
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
    toast.dismiss();
    toast.loading("Loading...");
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (err) {
      toast.dismiss();
      const errorMsg = err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  const saveEmployee = async (employeeData: EmpFormstate) => {
    setLoading(true);
    toast.dismiss();
    toast.loading("Saving Employee...");
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

    // if (response.ok) {

    // }

    if (!response.ok) {
      // This allows your UI to catch specific error messages
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save employee");
    }

    return response.json();
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
