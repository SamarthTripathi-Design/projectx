import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  containerClass?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, containerClass, id, className, ...props }, ref) => {
    return (
      <div className={`${containerClass || ""}`}>
        <label htmlFor={id}>{label}</label>

        <div>
          <input
            {...props}
            id={id}
            ref={ref} // Critical for RHF register
            className={`${className} ${error ? "input-error" : ""}`}
            aria-invalid={error ? "true" : "false"}
          />

          {error && (
            <p className="error-text" role="alert">
              {error.message}
            </p>
          )}
        </div>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
