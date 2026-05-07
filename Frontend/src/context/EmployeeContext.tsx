import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { Employee, ModalState } from "../types";

// 1. Define what the Context "Store" looks like
interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  modalDetails: ModalState;
  setModalDetails: React.Dispatch<React.SetStateAction<ModalState>>;
}

// 2. Create the Context with an undefined default
export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined,
);

// 3. The Provider Component
export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalDetails, setModalDetails] = useState<ModalState>({
    isOpen: false,
    onClose: () => {},
    title: "",
    children: null,
  });

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");

      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        modalDetails,
        setModalDetails,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
