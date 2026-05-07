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

  const handleChnage = (
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
        onChange={handleChnage}
        name="search"
        autoComplete="off"
      />
      <div className="controlbarbtn">
        <button className="addemployee" onClick={handleAdd}>
          <IoPersonAddSharp />
          <span>Add</span>
        </button>
        <div className="dropdown_container">
          <select className="filter" name="filter">
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
            </optgroup>

            <optgroup label="Status">
              <option value="active" data-category="status">
                Active
              </option>
              <option value="probation" data-category="status">
                Probation
              </option>
            </optgroup>

            <optgroup label="Location">
              <option value="Remote" data-category="location">
                Remote
              </option>
              <option value="New York" data-category="location">
                New York
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
