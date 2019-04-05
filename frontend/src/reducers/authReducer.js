import isEmpty from "../utils/isEmpty";
import { SET_CURRENT_USER, SET_CURRENT_PROFILE } from "../actions/types";

const initalState = {
  isAuthenticated: false,
  user: {},
  profile: {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
