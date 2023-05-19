import { SET_ACCESS_TOKEN } from "../constants";

export const setAccessToken = (data) => ({
  type: SET_ACCESS_TOKEN,
  data,
});
