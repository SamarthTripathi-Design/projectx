import React from "react";
import { setAccessToken } from "../actions";
import { useDispatch } from "react-redux";

const HandleToken = (token) => {
  const dispatch = useDispatch();
  localStorage.setItem("refreshToken", JSON.stringify(token.refreshToken));
  dispatch(setAccessToken(token.accessToken));
};

export default HandleToken;
