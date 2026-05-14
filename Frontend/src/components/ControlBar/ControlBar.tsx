import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import "./ControlBar.css";
import type { FilterState, ModalState } from "../../types";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useContext } from "react";
import Form from "../Form/Form";

// In ControlBar.tsx
type ControlBarProps = {
  onFilterChange: React.Dispatch<React.SetStateAction<FilterState>>;
};

function ControlBar(props: ControlBarProps) {
  const { modalDetails, setModalDetails } = useContext(EmployeeContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    props.onFilterChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setModalDetails({
      isOpen: true,
      title: "Add New Employee",
      children: <Form />,
      onClose: () =>
        setModalDetails((prev: ModalState) => ({ ...prev, isOpen: false })),
    });
  };

  return (
    <div className="controlbar">
      <input
        type="text"
        className="search"
        placeholder="Search for the Employee"
        onChange={handleChange}
        name="search"
        autoComplete="off"
      />
      <div className="controlbarbtn">
        <button className="addemployee" onClick={handleAdd}>
          <IoPersonAddSharp />
          <span>Add</span>
        </button>
        <div className="dropdown_container">
          <select className="filter" name="filter" onChange={handleChange}>
            <option value="all" data-category="">
              All Employees
            </option>

            <optgroup label="Department">
              <option value="Engineering" data-category="department">
                Engineering
              </option>
              <option value="Sales" data-category="department">
                Sales
              </option>

              <option value="Marketing" data-category="department">
                Marketing
              </option>
              <option value="Product" data-category="department">
                Product
              </option>
              <option value="HR" data-category="department">
                Human Resources
              </option>
              <option value="Finance" data-category="department">
                Finance
              </option>
            </optgroup>

            <optgroup label="Status">
              <option value="active" data-category="status">
                Active
              </option>
              <option value="probation" data-category="status">
                Probation
              </option>
            </optgroup>
          </select>
          <IoIosArrowDropdown className="dropdownicon" />
        </div>
      </div>
    </div>
  );
}

export default ControlBar;
