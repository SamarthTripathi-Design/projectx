import React, { useState } from "react";
import styles from "../styles/login.module.scss";
import axios from "axios";
import HandleToken from "../utils/HandleToken";

const Login = () => {
  const [num, setNum] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  const getToken = async () => {
    const res = await axios.post("", {
      number: num,
      otp: otp,
    });
    HandleToken(res.data);
  };

  const handleMobileNum = (e) => {
    const number = e.target.mobileNum.value;
    e.preventDefault();
    setNum(number);
    setShowOtp(true);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp({
      ...otp,
      [e.target.name]: value,
    });
  };

  const handleLogin = () => {
    if (Object.keys(otp).every((k) => otp[k])) {
      getToken();
    }
  };

  return (
    <div className={styles.login__container}>
      {!showOtp ? (
        <form
          onSubmit={handleMobileNum}
          className="login__form"
          autoComplete="off"
        >
          <div className="mobileNumContainer">
            <label htmlFor="mobileNum" className="login__form-tag"></label>
            <input
              type="text"
              className="login__form-input"
              name="mobileNum"
              placeholder="Enter Mobile Number"
              value={num}
            />
          </div>
          <button type="submit" className="button__submit ">
            Proceed
          </button>
        </form>
      ) : (
        <div className="OtpContainer">
          <input
            type="text"
            className="otp__form-input"
            name="otp1"
            onChange={handleOtpChange}
            value={otp.otp1}
            maxlength="1"
          />
          <input
            type="text"
            className="otp__form-input"
            name="otp2"
            onChange={handleOtpChange}
            value={otp.otp2}
            maxlength="1"
          />
          <input
            type="text"
            className="otp__form-input"
            name="otp3"
            onChange={handleOtpChange}
            value={otp.otp3}
            maxlength="1"
          />
          <input
            type="text"
            className="otp__form-input"
            name="otp4"
            onChange={handleOtpChange}
            value={otp.otp4}
            maxlength="1"
          />
          <button
            type="submit"
            className="button__submit "
            onClick={handleLogin}
          >
            verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
