import type { Dispatch } from "redux";

export function getEmployeeDetails() {
  return async (dispatch: Dispatch) => {
    // 1. SIGNAL: "We are starting!"
    dispatch({ type: "GET_EMPLOYEES_REQUEST" });
    try {
      const res = await fetch("http://localhost:5000/api/employees");
      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await res.json();

      // 2. SIGNAL: "We have the data!"
      dispatch({
        type: "GET_EMPLOYEES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      // 3. Signal :"ERROR"
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({
        type: "GET_EMPLOYEES_FAILURE",
        payload: errorMessage,
      });
    }
  };
}
