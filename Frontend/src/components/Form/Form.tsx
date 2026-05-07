import "./Form.css";
import { SearchableSelect } from "../SearchableSelect.tsx/SearchableSelect";
import { indianStates } from "../constants";

function Form() {
  return (
    <form action="">
      <div className="row1">
        <div className="emp_name_cont">
          <label htmlFor="EmpName">Employee Name</label>
          <input
            type="text"
            className="emp_name"
            name="EmpName"
            placeholder="Enter  name"
          />
        </div>
        <div className="emp_email_cont">
          <label htmlFor="EmpEmail">Email</label>
          <input
            type="text"
            className="emp_email"
            name="EmpEmail"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div className="row2">
        <div className="emp_dept_cont">
          <label htmlFor="EmpDept">Department</label>
          <select name="EmpDept" className="emp_dept">
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="emp_startdate_cont">
          <label htmlFor="EmpDOJ">Date of Joining</label>
          <input type="date" className="emp_doj" name="EmpDOJ" />
        </div>
      </div>
      <div className="row3">
        <div className="emp_loc_cont">
          <label htmlFor="EmpLoc">Employee Location</label>
          <div className="emp_loc-wraper">
            <SearchableSelect inputClass="emp_loc" options={indianStates} />
          </div>
        </div>
        <div className="emp_type_cont">
          <label htmlFor="EmpType">Employment Type</label>
          <select name="EmpType" className="emp_employmenttype">
            <option value="">Select Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contractor</option>
            <option value="intern">Intern</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default Form;
