import { Children, useContext, useEffect, useState } from "react";
import ControlBar from "../../components/ControlBar/ControlBar";
import Table from "../../components/Table/Table";
import { EmployeeContext } from "../../context/EmployeeContext";
import type { FilterState, ModalState } from "../../types";
import { useMemo } from "react";
import type { Employee } from "../../types";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import "./AdminDashboard.css";
import Form from "../../components/Form/Form";

function AdminDashboard() {
  const context = useContext(EmployeeContext);
  const { employees, fetchEmployees, setModalDetails, deleteEmployee } =
    context;
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    filter: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  //Safety check for TypeScript (since default is undefined)
  if (!context) {
    throw new Error("AdminDashboard must be used within an EmployeeProvider");
  }

  const filteredData = useMemo(() => {
    // 1. Prepare Search Terms
    const searchTerms = filter.search
      .toLowerCase()
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const filterTerm = filter.filter.toLowerCase();

    // 2. Initial Search Filter (Partial Match)
    // If no search terms, start with all employees
    let result =
      searchTerms.length === 0
        ? employees
        : employees.filter((emp: Employee) =>
            searchTerms.some((term) =>
              Object.values(emp).some((val) =>
                String(val).toLowerCase().includes(term),
              ),
            ),
          );

    // 3. Category Filter (Exact Match)
    // ONLY run this if filterTerm is actually set to something other than "all"
    if (filterTerm !== "" && filterTerm !== "all") {
      result = result.filter((emp: Employee) =>
        Object.values(emp).some(
          (val) => String(val).toLowerCase() === filterTerm,
        ),
      );
    }

    return result;
  }, [filter.search, filter.filter, employees]);

  const handleEdit = (employee: Employee) => {
    console.log(employee);
    setModalDetails({
      isOpen: true,
      title: "Edit Employee",
      children: <Form initialData={employee} />,
      onClose: () =>
        setModalDetails((prev: ModalState) => ({ ...prev, isOpen: false })),
    });
  };

  const handleDelete = (id: string) => {
    setModalDetails({
      isOpen: true,
      title: "Alert",
      children: "Do you want to delete the Employee?",
      onClose: () =>
        setModalDetails((prev: ModalState) => ({ ...prev, isOpen: false })),
      secondaryLabel: "Delete",
      primaryLabel: "Cancel",
      onSecondaryClick: () => {
        deleteEmployee(id);
      },
      onPrimaryClick: () =>
        setModalDetails((prev: ModalState) => ({ ...prev, isOpen: false })),
    });
  };

  return (
    <div className="admindashboard_cont">
      <ControlBar onFilterChange={setFilter} />
      <Table
        data={filteredData}
        excludeKeys={["id"]}
        renderActions={(employee: Employee) => (
          <div className="admin_action-buttons">
            <button
              onClick={() => handleEdit(employee)}
              className="admin_edit"
              title="Edit"
            >
              <MdOutlineEdit />
            </button>
            <button
              onClick={() => handleDelete(employee.id)}
              className="admin_delete"
              title="Delete"
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}
      />
    </div>
  );
}

export default AdminDashboard;
