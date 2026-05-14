import { useContext, useEffect, useState } from "react";
import ControlBar from "../../components/ControlBar/ControlBar";
import Table from "../../components/Table/Table";
import { EmployeeContext } from "../../context/EmployeeContext";
import type { FilterState } from "../../types";
import { useMemo } from "react";
import type { Employee } from "../../types";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import "./AdminDashboard.css";

function AdminDashboard() {
  const context = useContext(EmployeeContext);
  const { employees, fetchEmployees } = context;
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

  const tableData = filteredData.map(({ id, ...visibleData }) => visibleData);

  const handleEdit = (employee: Employee) => {};
  const handleDelete = (id: string) => {};

  return (
    <div className="admindashboard_cont">
      <ControlBar onFilterChange={setFilter} />
      <Table
        data={tableData}
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
