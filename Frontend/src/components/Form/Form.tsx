import "./Form.css";
import { SearchableSelect } from "../SearchableSelect/SearchableSelect";
import { Countries } from "../constants";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useEffect } from "react";

// 1. Interface for Type Safety
export interface IEmployeeForm {
  name: string;
  email: string;
  department: string;
  doj: string;
  location: string;
  employmentType: string;
}

interface FormProps {
  initialData?: IEmployeeForm & { id?: string | number } & Record<string, any>;
}

export default function Form({ initialData }: FormProps) {
  const { setEmpFormData, saveEmployee, updateEmployee } =
    useContext(EmployeeContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IEmployeeForm>({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      doj: new Date().toISOString().split("T")[0],
      location: "",
      employmentType: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      // If the date comes from your table as DD-MM-YYYY, convert it back to YYYY-MM-DD for the HTML input
      let formattedDoj = initialData.doj;
      if (
        initialData.doj.includes("-") &&
        initialData.doj.split("-")[0].length === 2
      ) {
        const [day, month, year] = initialData.doj.split("-");
        formattedDoj = `${year}-${month}-${day}`;
      }

      reset({
        ...initialData,
        doj: formattedDoj,
      });
    } else {
      reset({
        name: "",
        email: "",
        department: "",
        doj: new Date().toISOString().split("T")[0],
        location: "",
        employmentType: "",
      });
    }
  }, [initialData, reset]);

  const onSubmit: SubmitHandler<IEmployeeForm> = (data) => {
    const [year, month, day] = data.doj.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    const finalizedData = { ...data, doj: formattedDate };

    setEmpFormData(finalizedData);

    if (initialData) {
      updateEmployee(finalizedData);
    } else {
      saveEmployee(finalizedData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="employee-form"
      autoComplete="off"
    >
      <div className="row1">
        {/* NAME INPUT */}
        <div className="emp_name_cont">
          <label htmlFor="emp-name">Employee Name</label>

          <input
            id="emp-name" // ID matches htmlFor
            type="text"
            className={errors.name ? "input-error emp_name" : "emp_name"}
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            aria-invalid={errors.name ? "true" : "false"} // Screen reader helper
            autoComplete="off"
          />

          {errors.name && (
            <p className="error-text" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL INPUT */}
        <div className="emp_email_cont">
          <label htmlFor="emp-email">Email</label>
          <input
            id="emp-email" // ID matches htmlFor
            type="email"
            className={errors.email ? "input-error emp_email" : "emp_email"}
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: "Invalid email",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="error-text" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="row2">
        {/* DEPARTMENT SELECT */}
        <div className="emp_dept_cont">
          <label htmlFor="emp-dept">Department</label>
          <select
            id="emp-dept"
            className={errors.department ? "input-error emp_dept" : "emp_dept"}
            {...register("department", { required: "Department is Required" })}
          >
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="HR">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
          {errors.department && (
            <p className="error-text" role="alert">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* DATE INPUT */}
        <div className="emp_startdate_cont">
          <label htmlFor="emp-doj">Date of Joining</label>
          <input
            id="emp-doj"
            type="date"
            className={errors.doj ? "input-error emp_doj" : "emp_doj"}
            {...register("doj", { required: "Date is required" })}
          />
          {errors.doj && (
            <p className="error-text" role="alert">
              {errors.doj.message}
            </p>
          )}
        </div>
      </div>

      <div className="row3">
        {/* LOCATION CUSTOM SELECT */}
        <div className="emp_loc_cont">
          <label htmlFor="emp-location-input">Employee Location</label>
          <div className="emp_loc-wraper">
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <SearchableSelect
                  // Pass the ID to the custom component's internal input
                  id="emp-location-input"
                  inputClass={
                    errors.location ? "input-error emp_loc" : "emp_loc"
                  }
                  options={Countries}
                  onSelect={(option) => field.onChange(option.value)}
                  placeholder="Select"
                  value={field.value}
                />
              )}
            />
          </div>
          {errors.location && (
            <p className="error-text" role="alert">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* EMPLOYMENT TYPE SELECT */}
        <div className="emp_type_cont">
          <label htmlFor="emp-type">Employment Type</label>
          <select
            id="emp-type"
            className={
              errors.employmentType ? "input-error emp_type" : "emp_type"
            }
            {...register("employmentType", {
              required: "Employment type is required",
            })}
          >
            <option value="">Select Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contractor</option>
            <option value="intern">Intern</option>
          </select>
          {errors.employmentType && (
            <p className="error-text" role="alert">
              {errors.employmentType.message}
            </p>
          )}
        </div>
      </div>

      <div className="btn-row">
        <button type="submit" className="submit-btn">
          {initialData ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
