import { SET_ACCESS_TOKEN } from "../constants";

const initialState = {
  loggedIn: false,
  accessToken: {},
};

const searchCriteriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.data.accessToken,
        loggedIn: true,
      };
    default:
      return state;
  }
};
